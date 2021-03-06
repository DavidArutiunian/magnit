import { IBaseTask } from "@magnit/entities";
import { ICourier, IResponse } from "services/api";

export interface IUpdateTaskResponse extends IResponse {}

export async function updateTask(courier: ICourier, id: number, task: Partial<IBaseTask>) {
    return courier.put<IUpdateTaskResponse>(`tasks/${id}`, { task });
}
