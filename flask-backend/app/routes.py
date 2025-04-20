from flask import Blueprint, request, jsonify, session, redirect, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from app.utils import create_mongo_client
from app import ml_model
import numpy as np
from datetime import datetime

# Define the blueprint first
api = Blueprint('api', __name__)

# Load model ONCE
model = ml_model.load_model()
print(f"Model type: {type(model)}")
print(f"Has predict method? {hasattr(model, 'predict')}")

def get_recommendation(severity):
    """Generate a recommendation based on severity."""
    if severity == 0:
        return {
            "text": "Your asthma condition is currently under control. Continue to monitor your symptoms regularly.",
            "resources": []
        }
    elif severity == 1 or severity == 2:
        return {
            "text": """You are experiencing mild to moderate asthma symptoms. Try some home remedies such as:
            - Steam Inhalation: Inhale steam from hot water to open up the airways.
            - Staying Hydrated: Drink plenty of water to keep the airways moist.
            - Using a Humidifier: Add moisture to the air with a humidifier to prevent dryness in the airways.
            - Breathing Exercises: Practice deep breathing exercises and pursed-lip breathing to improve lung function.
            - Avoiding Triggers: Identify and avoid triggers such as smoke, dust, pollen, and pet dander.
            - Maintaining a Clean Environment: Keep the home clean and free of dust, mold, and allergens.""",
            "resources": []
        }
    elif severity == 3:
        return {
            "text": "You are experiencing severe asthma symptoms. Please seek immediate medical attention. In the meantime, you may find the following resources helpful:",
            "resources": [
                {"title": "How to ease asthma symptoms - 3 effective breathing exercises by Airofit", "url": "https://www.youtube.com/watch?v=FyjZLPmZ534"},
                {"title": "Exercise-Induced Asthma by CNN", "url": "https://www.youtube.com/watch?v=B8pNeYFZNew"},
                {"title": "ASTHMA / how to cure exercise induced wheezing naturally by Andrew Folts", "url": "https://www.youtube.com/watch?v=jv-revgQdPE"},
                {"title": "Easy tips to treat Asthma & Bronchitis | Dr. Hansaji Yogendra by The Yoga Institute", "url": "https://www.youtube.com/watch?v=JwRG8AsStLQ"},
                {"title": "Breathing Exercises for COPD, Asthma, Bronchitis & Emphysema - Ask Doctor Jo by AskDoctorJo", "url": "https://www.youtube.com/watch?v=dpTNUGwXbTU"}
            ]
        }
    else:
        return {"text": "No recommendation available.", "resources": []}


@api.before_app_request
def before_request():
    global db, users_collection, predictions_collection
    client = create_mongo_client()
    db = client['asthma_care']
    users_collection = db['users']
    predictions_collection = db['predictions']

@api.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        username = session.get('username')
        print("Received data:", data)
        
        # Convert boolean values to integers for the model
        symptoms = [
            1 if data.get('tiredness', False) else 0,
            1 if data.get('dry_cough', False) else 0,
            1 if data.get('difficulty_breathing', False) else 0,
            1 if data.get('sore_throat', False) else 0,
            1 if data.get('nasal_congestion', False) else 0,
            1 if data.get('runny_nose', False) else 0
        ]
        print("Converted symptoms array:", symptoms)
        print("Sum of symptoms:", sum(symptoms))
        
        # Ensure age is an integer
        try:
            age = int(data.get('age', 0))
        except (ValueError, TypeError):
            age = 0
            
        gender = data.get('gender', '')

        # Check if all symptoms are "no"
        if sum(symptoms) == 0:
            severity_prediction = 0
        else:
            # Check threshold logic
            if all(symptoms) and age >= 60:
                severity_prediction = 3
            elif all(symptoms) and age < 11:
                severity_prediction = 3
            elif all(symptoms):
                severity_prediction = 3
            elif not any(symptoms) and gender == 'male' and age >= 25:
                severity_prediction = 0
            elif age >= 50 and symptoms[2] == 1:  # Check if age >= 50 and difficulty_breathing is present
                severity_prediction = 3
            else:
                # Prepare input for model
                model_input = symptoms + [
                    1 if age <= 9 else 0,
                    1 if age >= 10 and age <= 19 else 0,
                    1 if age >= 20 and age <= 24 else 0,
                    1 if age >= 25 and age <= 59 else 0,
                    1 if age >= 60 else 0,
                    1 if gender == 'female' else 0,
                    1 if gender == 'male' else 0,
                    0,  # Severity_Mild placeholder
                    0   # Severity_Moderate placeholder
                ]
                print("Complete model input:", model_input)

                # If model is None, return a default prediction
                if model is None:
                    return jsonify({
                        'severity': 0, 
                        'recommendation': "Could not load prediction model. Please contact support."
                    })

                # Predict severity using the model
                if isinstance(model, np.ndarray):
                    # Wrap it on the fly if needed
                    wrapped_model = ml_model.ArrayModelWrapper(model)
                    severity_prediction = int(wrapped_model.predict([model_input])[0])
                else:
                    severity_prediction = int(model.predict([model_input])[0])
            
        # Get recommendation based on severity
        recommendation = get_recommendation(severity_prediction)

        # Store in MongoDB with username
        result = {
            'username': username,
            'symptoms': symptoms,
            'age': age,
            'gender': gender,
            'severity': severity_prediction,
            'recommendation_text': recommendation['text'],
            'recommendation_resources': recommendation['resources'],
            'timestamp': datetime.now().isoformat()
        }
        predictions_collection.insert_one(result)

        return jsonify({
            'severity': severity_prediction, 
            'recommendation': recommendation['text'],
            'resources': recommendation['resources']
        })
    except Exception as e:
        print(f"Prediction error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@api.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    username = data['username']
    password = data['password']
    confirm_password = data['confirm_password']

    if password != confirm_password:
        return jsonify({'error': 'Passwords do not match!'}), 400

    if users_collection.find_one({'username': username}):
        return jsonify({'error': 'Username already exists!'}), 400

    hashed_password = generate_password_hash(password)
    users_collection.insert_one({'username': username, 'password': hashed_password})
    return jsonify({'message': 'Signup successful!'})

@api.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']

    user = users_collection.find_one({'username': username})
    if not user or not check_password_hash(user['password'], password):
        return jsonify({'error': 'Invalid credentials!'}), 401

    session['username'] = username
    return jsonify({'message': 'Login successful!'})

@api.route('/api/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    return jsonify({'message': 'Logged out successfully!'})

@api.route('/api/results', methods=['GET'])
def get_results():
    try:
        # Get the logged-in username from the session
        username = session.get('username')
        if not username:
            return jsonify({'error': 'User not authenticated'}), 401
        
        # Only retrieve valid results for the logged-in user
        results = list(predictions_collection.find({
            'username': username,
            'severity': {'$exists': True},
            'symptoms': {'$exists': True},
            'timestamp': {'$exists': True}
        }, {'_id': 0}))
        
        return jsonify(results)
    except Exception as e:
        print(f"Error fetching results: {str(e)}")
        return jsonify({'error': str(e)}), 500

@api.route('/api/check-session', methods=['GET'])
def check_session():
    username = session.get('username')
    if username:
        return jsonify({
            'isAuthenticated': True,
            'username': username
        })
    else:
        return jsonify({
            'isAuthenticated': False
        })

@api.route('/api/admin/cleanup-database', methods=['POST'])
def cleanup_database():
    # Check if the user is an admin
    username = session.get('username')
    if username != 'admin':  # Replace with your admin check
        return jsonify({'error': 'Unauthorized'}), 403
        
    try:
        # Find invalid records
        invalid_records = list(predictions_collection.find({
            '$or': [
                {'severity': {'$exists': False}},
                {'symptoms': {'$exists': False}},
                {'timestamp': {'$exists': False}},
                {'username': {'$exists': False}}
            ]
        }))
        
        # Delete them
        if invalid_records:
            result = predictions_collection.delete_many({
                '$or': [
                    {'severity': {'$exists': False}},
                    {'symptoms': {'$exists': False}},
                    {'timestamp': {'$exists': False}},
                    {'username': {'$exists': False}}
                ]
            })
            return jsonify({
                'message': f'Cleaned up {result.deleted_count} invalid records',
                'records_removed': len(invalid_records)
            })
        else:
            return jsonify({'message': 'No invalid records found'})
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500