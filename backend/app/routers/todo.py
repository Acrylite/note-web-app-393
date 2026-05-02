from fastapi import APIRouter, Depends
from backend.app.schemas.todo import TodoCreate, TodoUpdate, TodoResponse
from backend.app.dependencies.auth import get_current_user
from backend.app.services import todo_service

router = APIRouter(prefix="/todos", tags=["todos"])


@router.get("/", response_model=list[TodoResponse])
async def get_todos(user=Depends(get_current_user)):
    return await todo_service.get_all(user["uid"])


@router.post("/", response_model=TodoResponse)
async def create_todo(payload: TodoCreate, user=Depends(get_current_user)):
    return await todo_service.create(user["uid"], payload)


@router.put("/{todo_id}", response_model=TodoResponse)
async def update_todo(todo_id: str, payload: TodoUpdate, user=Depends(get_current_user)):
    return await todo_service.update(user["uid"], todo_id, payload)


@router.delete("/{todo_id}")
async def delete_todo(todo_id: str, user=Depends(get_current_user)):
    await todo_service.delete(user["uid"], todo_id)
    return {"message": "todo deleted"}


@router.patch("/{todo_id}/pin", response_model=TodoResponse)
async def pin_todo(todo_id: str, user=Depends(get_current_user)):
    return await todo_service.toggle_pin(user["uid"], todo_id)