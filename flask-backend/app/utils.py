from pymongo import MongoClient
from urllib.parse import quote_plus
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def create_mongo_client():
    """Create MongoDB client using credentials from environment variables"""
    try:
        username = os.getenv('MONGODB_USERNAME')
        password = os.getenv('MONGODB_PASSWORD')
        cluster = os.getenv('MONGODB_CLUSTER', 'asmthamacluster0.d6anv.mongodb.net')
        database = os.getenv('MONGODB_DATABASE', 'asthma_care')
        
        # Ensure credentials were loaded
        if not username or not password:
            raise ValueError("MongoDB credentials not found in environment variables")
            
        connection_string = f'mongodb+srv://{username}:{quote_plus(password)}@{cluster}/{database}?retryWrites=true&w=majority'
        return MongoClient(connection_string)
    except Exception as e:
        print(f"Error creating MongoDB client: {e}")
        return None

def some_utility_function():
    # This is a placeholder for a utility function.
    pass

def another_utility_function(param):
    # This is a placeholder for another utility function that takes a parameter.
    return param * 2

# Add more utility functions as needed.