from beanie import Document
from pydantic import BaseModel
from typing import Optional

class Task(Document):
    title: str
    description: str
    completed: bool = False

    class Settings:
        name = "tasks"

    class Config:
        schema_extra = {
            "example": {
                "title": "Learn FastAPI",
                "description": "Study FastAPI documentation",
                "completed": False
            }
        }

class TaskUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    completed: Optional[bool] 