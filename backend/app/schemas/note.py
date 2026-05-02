from pydantic import BaseModel
from typing import Optional

class LineItem(BaseModel):
    id: str
    type: str
    text: str
    done: bool = False

class NoteCreate(BaseModel):
    title: str
    lines: list[LineItem]
    tags: list[str] = []
    pinned: bool = False

class NoteUpdate(BaseModel):
    title: Optional[str] = None
    lines: Optional[list[LineItem]] = None
    tags: Optional[list[str]] = None
    pinned: Optional[bool] = None

class NoteResponse(BaseModel):
    id: str
    title: str
    lines: list[LineItem]
    tags: list[str]
    pinned: bool
    createdAt: str
    editedAt: str