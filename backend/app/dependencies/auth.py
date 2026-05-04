from fastapi import HTTPException, Request
from firebase_admin import auth

async def get_current_user(request: Request):
    authorization = request.headers.get("Authorization")
    
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid auth header")
    
    token = authorization.split("Bearer ")[1]
    
    try:
        decoded = auth.verify_id_token(token, clock_skew_seconds=10)
        return {"uid": decoded["uid"], "email": decoded.get("email")}
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Token error: {str(e)}")