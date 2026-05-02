# backend/app/schemas/todo.py
from pydantic import BaseModel
from typing import Optional

class TodoLineItem(BaseModel):
    id: str
    text: str
    done: bool = False

class TodoCreate(BaseModel):
    title: str
    lines: list[TodoLineItem]
    tags: list[str] = []
    deadline: str
    pinned: bool = False

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    lines: Optional[list[TodoLineItem]] = None
    tags: Optional[list[str]] = None
    deadline: Optional[str] = None
    pinned: Optional[bool] = None

class TodoResponse(BaseModel):
    id: str
    title: str
    lines: list[TodoLineItem]
    tags: list[str]
    deadline: str
    pinned: bool
    createdAt: str
    editedAt: str