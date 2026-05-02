from fastapi import APIRouter, Depends
from backend.app.schemas.note import NoteCreate, NoteUpdate, NoteResponse
from backend.app.dependencies.auth import get_current_user
from backend.app.services import note_service

router = APIRouter(prefix="/notes", tags=["notes"])


@router.get("/", response_model=list[NoteResponse])
async def get_notes(user=Depends(get_current_user)):
    return await note_service.get_all(user["uid"])


@router.post("/", response_model=NoteResponse)
async def create_note(payload: NoteCreate, user=Depends(get_current_user)):
    return await note_service.create(user["uid"], payload)


@router.put("/{note_id}", response_model=NoteResponse)
async def update_note(note_id: str, payload: NoteUpdate, user=Depends(get_current_user)):
    return await note_service.update(user["uid"], note_id, payload)


@router.delete("/{note_id}")
async def delete_note(note_id: str, user=Depends(get_current_user)):
    await note_service.delete(user["uid"], note_id)
    return {"message": "note deleted"}


@router.patch("/{note_id}/pin", response_model=NoteResponse)
async def pin_note(note_id: str, user=Depends(get_current_user)):
    return await note_service.toggle_pin(user["uid"], note_id)