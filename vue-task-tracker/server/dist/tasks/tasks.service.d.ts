import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';
export declare class TasksService {
    private readonly taskModel;
    constructor(taskModel: Model<Task>);
    getTasks(): Promise<(import("mongoose").Document<unknown, {}, Task> & Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    healthCheck(): Promise<{
        status: string;
        error?: undefined;
    } | {
        status: string;
        error: any;
    }>;
}
