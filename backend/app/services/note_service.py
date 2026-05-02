from backend.app.schemas.note import NoteCreate, NoteUpdate
from backend.app.services import firestore_service as db

COLLECTION = "notes"

async def get_all(uid: str):
    return db.get_all_docs(uid, COLLECTION)

async def create(uid: str, payload: NoteCreate):
    data = payload.model_dump()
    data["lines"] = [line.model_dump() for line in payload.lines]
    return db.create_doc(uid, COLLECTION, data)

async def update(uid: str, note_id: str, payload: NoteUpdate):
    data = payload.model_dump(exclude_none=True)
    if "lines" in data and payload.lines is not None:
        data["lines"] = [line.model_dump() for line in payload.lines]
    return db.update_doc(uid, COLLECTION, note_id, data)

async def delete(uid: str, note_id: str):
    db.delete_doc(uid, COLLECTION, note_id)

async def toggle_pin(uid: str, note_id: str):
    return db.toggle_pin_doc(uid, COLLECTION, note_id)