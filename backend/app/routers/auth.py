# heavily reworked from https://github.com/Khoan-IT/chatbot-page/blob/main/backend/app/routers/auth.py
# to work with React instead of Streamlit
import os

from fastapi import APIRouter, HTTPException, Depends
from firebase_admin import auth as admin_auth

from dotenv import load_dotenv

from backend.app.schemas.auth import GoogleLoginRequest
from backend.app.core.firebase_config import init_firebase_admin
from backend.app.dependencies.auth import get_current_user

# shortcut
router = APIRouter(prefix="/auth", tags=["auth"])

# initialize the firebase app
init_firebase_admin()

# replacing Streamlit secrets with .env file
load_dotenv()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI")
FIREBASE_WEB_API_KEY = os.getenv("FIREBASE_WEB_API_KEY")
FRONTEND_URL = os.getenv("FRONTEND_URL")

# google login route
@router.post("/google")
def google_login(payload: GoogleLoginRequest):
    try:
        decoded = admin_auth.verify_id_token(payload.idToken)
        return {
            "email": decoded.get("email"),
            "uid": decoded.get("uid"),
            "idToken": payload.idToken
        }
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Google token invalid: {e}")

# get user info route
@router.get("/me")
def me(user=Depends(get_current_user)):
    return {
        "email": user["email"],
        "uid": user["uid"]
    }