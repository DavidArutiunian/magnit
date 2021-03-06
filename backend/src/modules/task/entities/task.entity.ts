import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, RelationId } from "typeorm";
import { PrimaryBaseEntity } from "../../../shared/entities/primary-base.entity";
import { Marketplace } from "../../marketplace/entities/marketplace.entity";
import { TemplateAnswer } from "../../template/entities/template-answer.entity";
import { TaskDocument } from "./task-document.entity";
import { TaskStage } from "./task-stage.entity";
import { TemplateAssignment } from "./tempalte-assignment.entity";

export enum ETaskStatus {
    IN_PROGRESS = "in_progress",
    ON_CHECK = "on_check",
    DRAFT = "draft",
    COMPLETED = "completed",
    EXPIRED = "expired",
}

@Entity()
export class Task extends PrimaryBaseEntity {
    @Index()
    @Column("varchar")
    title: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @Index()
    @Column("varchar")
    status: ETaskStatus;

    @Column({ type: "varchar", nullable: true })
    id_owner: string;

    @Index()
    @Column({ type: "varchar", nullable: true })
    id_assignee: string;

    @Column({ type: "int", default: 3 })
    notify_before: number;

    @Index()
    @RelationId((task: Task) => task.marketplace)
    @Column({ nullable: true })
    id_marketplace: number | null;

    @ManyToOne(() => Marketplace)
    @JoinColumn({ name: "id_marketplace" })
    marketplace: Marketplace;

    @OneToMany(
        () => TemplateAssignment,
        assignment => assignment.task,
    )
    assignments: TemplateAssignment[];

    @OneToMany(
        () => TemplateAnswer,
        answer => answer.task,
    )
    answers: TemplateAnswer[];

    @OneToMany(
        () => TaskStage,
        stage => stage.task,
    )
    stages: TaskStage[];

    @OneToMany(
        () => TaskDocument,
        document => document.task,
    )
    documents: TaskDocument[];
}
