import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>
  ) {}

  async getTasks() {
    return this.taskModel.find().exec();
  }

  async healthCheck() {
    try {
      await this.taskModel.db.db.admin().ping();
      return { status: 'healthy' };
    } catch (err) {
      return { status: 'unhealthy', error: err.message };
    }
  }
}