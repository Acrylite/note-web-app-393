# slightly reworked from https://github.com/Khoan-IT/chatbot-page/blob/main/backend/app/core/firebase_config.py
# to work with React instead of Streamlit
from dotenv import load_dotenv
from pathlib import Path
import os
import firebase_admin
from firebase_admin import credentials, firestore

# parse .env file and load all environmental variables
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

# initialize the firebase app using environmental variables
def init_firebase_admin():
    # only initialize once
    if not firebase_admin._apps:
        # fallback in case private key is empty for some reasons
        private_key = os.getenv("FIREBASE_PRIVATE_KEY")
        if not private_key:
            raise ValueError("FIREBASE_PRIVATE_KEY is not set in environment variables")
        
        # getting credentials
        cred = credentials.Certificate({
            "type": "service_account",
            "project_id": os.getenv("FIREBASE_PROJECT_ID"),
            "private_key": private_key.replace("\\n", "\n"),
            "client_email": os.getenv("FIREBASE_CLIENT_EMAIL"),
            "token_uri": "https://oauth2.googleapis.com/token",
        })
        
        # initialize the app with the credentials
        firebase_admin.initialize_app(cred)

def get_firestore():
    init_firebase_admin()
    
    # return firestore client to read/write data
    return firestore.client()