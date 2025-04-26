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
             "https://asthama-care.vercel.app",
             # Add any additional domains
         ],
         methods=["GET", "POST", "OPTIONS"],
         allow_headers=["Content-Type", "Authorization", "X-Requested-With"],
         expose_headers=["Set-Cookie", "Access-Control-Allow-Origin", 
                        "Access-Control-Allow-Credentials"])
    
    app.register_blueprint(api)
    
    # Detect environment
    is_development = app.config.get('ENV', 'development') == 'development'
    
    app.config.update(
        SESSION_COOKIE_SECURE=True,
        SESSION_COOKIE_SAMESITE="None",  # IMPORTANT: Use None for cross-site cookies
        SESSION_COOKIE_HTTPONLY=True,
        PERMANENT_SESSION_LIFETIME=timedelta(days=7)
    )
    
    return app