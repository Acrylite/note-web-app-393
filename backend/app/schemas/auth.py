# copied 0.99:1 from https://github.com/Khoan-IT/chatbot-page/blob/main/backend/app/schemas/auth.py
from pydantic import BaseModel, EmailStr

class SignupRequest(BaseModel):
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class GoogleLoginRequest(BaseModel):
    idToken: str

class AuthResponse(BaseModel):
    email: str
    uid: str
    idToken: str | None = None
    refreshToken: str | None = None