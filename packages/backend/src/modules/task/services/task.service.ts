import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, In, Repository } from "typeorm";
import { ETaskStatus, Task } from "../entities/task.entity";
import { ITaskService } from "../interfaces/task.service.interface";

@Injectable()
export class TaskService implements ITaskService {
    // TODO: need to use @TransactionalRepository on a method
    constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>) {}

    async findAll(
        offset?: number,
        limit?: number,
        sort?: "ASC" | "DESC",
        status?: ETaskStatus,
        statuses?: ETaskStatus[],
        title?: string,
    ) {
        // TODO: probably need to introduce FindOptionsBuilder
        const options: FindManyOptions<Task> = {};
        if (typeof offset !== "undefined") {
            options.skip = offset;
        }
        if (typeof limit !== "undefined") {
            options.take = limit;
        }
        if (sort) {
            options.order = { title: sort };
        }
        if (status) {
            if (!options.where) {
                options.where = {};
            }
            Object.assign(options.where, { status });
        }
        if (statuses) {
            if (!options.where) {
                options.where = {};
            }
            Object.assign(options.where, { status: In(statuses) });
        }
        if (title) {
            if (!options.where) {
                options.where = {};
            }
            Object.assign(options.where, { title });
        }
        return this.taskRepository.find(options);
    }

    async insert(task: Task) {
        // in case if insert() is called with existing task
        // semantics of this methods is about creating new onde
        delete task.id;
        return this.taskRepository.save(task);
    }

    async findById(id: string, relations: string[] = []) {
        return this.taskRepository.findOne({ where: { id }, relations });
    }

    async deleteById(id: string) {
        await this.taskRepository.delete(id);
    }

    async update(id: string, task: Task): Promise<Task> {
        return this.taskRepository.save({ ...task, id: Number(id) });
    }

    getDescriptionByTransition(
        prevStatus: ETaskStatus,
        nextStatus: ETaskStatus,
    ): string | undefined {
        // little state machine with possible transitions
        // between statuses
        return {
            [ETaskStatus.DRAFT]: {
                [ETaskStatus.IN_PROGRESS]: "Отправка задания",
            },
            [ETaskStatus.IN_PROGRESS]: {
                [ETaskStatus.ON_CHECK]: "Задание прислано на проверку",
                [ETaskStatus.COMPLETED]: "Этап завершён",
            },
            [ETaskStatus.ON_CHECK]: {
                [ETaskStatus.IN_PROGRESS]: "Отправка задания",
            },
        }[prevStatus][nextStatus];
    }
}
