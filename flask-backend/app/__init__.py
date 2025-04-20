from flask import Flask
from flask_cors import CORS
from app.routes import api

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    
    # Configure CORS to allow requests from your frontend
    CORS(app, supports_credentials=True, origins=["http://localhost:8080"])
    
    app.register_blueprint(api)
    return app