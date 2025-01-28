from fastapi import FastAPI
from models.Task import Task, TaskUpdate
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_db_client():
    mongo_url = os.getenv("MONGODB_URL", "mongodb://root:example@mongodb:27017/taskdb?authSource=admin")
    client = AsyncIOMotorClient(mongo_url)
    
    # Explicitly get the database reference
    database = client["taskdb"]
    await init_beanie(database=database, document_models=[Task])

@app.get("/tasks")
async def get_tasks():
    tasks = await Task.find_all().to_list()
    return tasks

@app.post("/tasks")
async def create_task(task: Task):
    await task.create()
    return task

@app.put("/tasks/{task_id}")
async def update_task(task_id: str, task_data: TaskUpdate):
    task = await Task.get(task_id)
    if not task:
        return {"error": "Task not found"}
    
    update_data = task_data.dict(exclude_unset=True)
    await task.set(update_data)
    return task

@app.delete("/tasks/{task_id}")
async def delete_task(task_id: str):
    task = await Task.get(task_id)
    if not task:
        return {"error": "Task not found"}
    
    await task.delete()
    return {"message": "Task deleted successfully"} 