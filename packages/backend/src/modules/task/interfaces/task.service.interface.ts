import { Task, TTaskStatus } from "../entities/task.entity";

export interface ITaskService {
    findAll(
        offset?: number,
        limit?: number,
        sort?: "ASC" | "DESC",
        status?: TTaskStatus,
        statuses?: TTaskStatus[],
        name?: string,
    ): Promise<Task[]>;

    save(task: Task, insert?: boolean): Promise<Task>;

    findById(id: string): Promise<Task>;

    deleteById(id: string): Promise<void>;
}