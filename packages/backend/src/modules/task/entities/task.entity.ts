import { Column, DeepPartial, Entity, Index, OneToMany } from "typeorm";
import { BaseEntity } from "../../../shared/entities/base.entity";
import { TaskStage } from "./task-stage.entity";
import { TemplateAssignment } from "./tempalte-assignment.entity";

export enum ETaskStatus {
    IN_PROGRESS = "in_progress",
    ON_CHECK = "on_check",
    DRAFT = "draft",
    COMPLETED = "completed",
}

@Entity()
export class Task extends BaseEntity<Task> {
    constructor(dto?: DeepPartial<Task>) {
        super();
        this.construct(this, dto);
    }

    @Index()
    @Column("varchar")
    title: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @Index()
    @Column("varchar")
    status: ETaskStatus;

    @OneToMany(() => TemplateAssignment, template_assignment => template_assignment.task, {
        cascade: true,
    })
    assignments: TemplateAssignment[];

    @OneToMany(() => TaskStage, task_stage => task_stage.task, { cascade: true })
    stages: TaskStage[];
}
