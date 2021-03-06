import { ICourier, IResponse } from "services/api";

export interface ICreateTemplateResponse extends IResponse {
    templateId: number;
}

export async function createTemplate(courier: ICourier, template: object) {
    return courier.post<ICreateTemplateResponse>("templates", { template });
}
