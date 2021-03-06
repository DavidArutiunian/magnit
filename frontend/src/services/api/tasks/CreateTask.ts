import { IBaseTask } from "@magnit/entities";
import { ICourier, IResponse } from "services/api";

export interface ICreateTaskResponse extends IResponse {
    taskId: string;
}

export async function createTask(courier: ICourier, task: IBaseTask) {
    return courier.post<ICreateTaskResponse>("tasks", { task });
}
