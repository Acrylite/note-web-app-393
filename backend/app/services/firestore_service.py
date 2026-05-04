from firebase_admin import firestore
from datetime import datetime, timezone

def get_db():
    return firestore.client()

def now_iso():
    return datetime.now(timezone.utc).isoformat()

def get_collection(uid: str, collection: str):
    return get_db().collection("users").document(uid).collection(collection)

def get_all_docs(uid: str, collection: str):
    docs = get_collection(uid, collection).stream()
    results = []
    for doc in docs:
        data = doc.to_dict()
        data["id"] = doc.id
        results.append(data)
    return results

def get_doc(uid: str, collection: str, doc_id: str):
    doc = get_collection(uid, collection).document(doc_id).get()
    if not doc.exists:
        return None
    data = doc.to_dict()
    data["id"] = doc.id
    return data

def create_doc(uid: str, collection: str, data: dict):
    data["createdAt"] = now_iso()
    data["editedAt"]  = now_iso()
    ref = get_collection(uid, collection).document()
    ref.set(data)
    data["id"] = ref.id
    return data

def update_doc(uid: str, collection: str, doc_id: str, data: dict):
    data["editedAt"] = now_iso()
    ref = get_collection(uid, collection).document(doc_id)
    ref.update(data)
    return get_doc(uid, collection, doc_id)

def delete_doc(uid: str, collection: str, doc_id: str):
    get_collection(uid, collection).document(doc_id).delete()

def toggle_pin_doc(uid: str, collection: str, doc_id: str):
    doc = get_doc(uid, collection, doc_id)
    if not doc:
        return None
    new_pinned = not doc.get("pinned", False)
    return update_doc(uid, collection, doc_id, {"pinned": new_pinned})