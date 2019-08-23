import { Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/typeorm";
import { Connection, EntitySubscriberInterface, InsertEvent } from "typeorm";
import { StageHistory } from "../entities/stage-history.entity";
import { TaskStage } from "../entities/task-stage.entity";

@Injectable()
export class TaskStageSubscriber implements EntitySubscriberInterface<TaskStage> {
    constructor(@InjectConnection() readonly connection: Connection) {
        connection.subscribers.push(this);
    }

    listenTo(): Function {
        return TaskStage;
    }

    async afterInsert(event: InsertEvent<TaskStage>): Promise<void> {
        const stages = await event.manager.find(TaskStage, {
            where: { task: event.entity.task },
        });
        // set all non-finished stages as finished
        // usually it should be only one of the stages
        await Promise.all(
            stages
                .map(history => {
                    history.finished = true;
                    if (history.finished) {
                        return;
                    }
                    return event.manager.save(history);
                })
                .filter(Boolean),
        );
        const history = new StageHistory({ description: "Создание этапа", stage: event.entity });
        await event.manager.save(history);
    }
}