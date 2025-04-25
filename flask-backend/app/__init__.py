from flask import Flask
from flask_cors import CORS
from app.routes import api
from datetime import timedelta

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    
    # Configure CORS to allow requests from your frontend
    CORS(app, 
         supports_credentials=True,
         origins=[
             "http://localhost:8080",  
             "https://asthamacare-frontend.onrender.com",
             "https://asthama-care.vercel.app"  # Add your new Vercel deployment URL
         ],
         allow_headers=["Content-Type", "Authorization"],
         expose_headers=["Set-Cookie"])
    
    app.register_blueprint(api)
    
    # Detect environment
    is_development = app.config.get('ENV', 'development') == 'development'
    
    app.config.update(
        SESSION_COOKIE_SECURE=not is_development,  # Only require HTTPS in production
        SESSION_COOKIE_SAMESITE="Lax" if is_development else "None",  # More permissive for development
        SESSION_COOKIE_HTTPONLY=True,  # Prevents JavaScript access
        PERMANENT_SESSION_LIFETIME=timedelta(days=7)  # Session duration
    )
    
    return app