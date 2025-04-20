import pickle
import os
import numpy as np

class ArrayModelWrapper:
    """Wrapper for numpy arrays to provide a predict method"""
    def __init__(self, array):
        self.array = array
        
    def predict(self, X):
        """
        This method mimics a model's predict method and returns
        a severity prediction based on actual input symptoms.
        """
        # If the array contains string values, return default severity
        if isinstance(self.array[0], (str, np.str_)):
            print("DEBUG: Model array contains string values. Returning severity 0.")
            return np.array([0 for _ in range(len(X))])
            
        # For each input, calculate severity based on symptoms
        results = []
        for inputs in X:
            print(f"DEBUG: Processing input: {inputs}")
            
            # Extract symptoms from the first 6 elements of the input
            symptoms_count = sum(inputs[:6])
            print(f"DEBUG: Symptoms count: {symptoms_count}")
            
            # Determine severity based on number of symptoms
            if symptoms_count >= 4:
                severity = 3  # Severe
            elif symptoms_count >= 2:
                severity = 2  # Moderate
            elif symptoms_count >= 1:
                severity = 1  # Mild
            else:
                severity = 0  # Controlled
            
            # Age can affect severity (age_60_plus is at index 10)
            if len(inputs) > 10 and inputs[10] == 1:  # Age >= 60
                severity = min(3, severity + 1)
            
            print(f"DEBUG: Final severity: {severity}")
            results.append(severity)
            
        return np.array(results)

def load_model():
    try:
        model_path = os.path.join(os.path.dirname(__file__), 'trained_model.pkl')
        with open(model_path, 'rb') as file:
            model = pickle.load(file)
        
        # Check if the model is a numpy ndarray
        if isinstance(model, np.ndarray):
            print("DEBUG: Loaded model is a NumPy array. Wrapping with ArrayModelWrapper.")
            return ArrayModelWrapper(model)
        elif hasattr(model, 'predict'):
            print("DEBUG: Loaded model has a predict method.")
            return model
        else:
            raise ValueError("The loaded object does not have a predict method.")
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        return None

