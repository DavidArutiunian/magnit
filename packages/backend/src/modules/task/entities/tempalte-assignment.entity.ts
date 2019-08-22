import {
    Column,
    CreateDateColumn,
    DeepPartial,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { EntityConstructor } from "../../../shared/decorators/entity-constructor.decorator";
import { Template } from "../../template/entities/template.entity";
import { Task } from "./task.entity";

@Entity({ name: "template_assignment" })
@EntityConstructor
export class TemplateAssignment {
    constructor(dto?: DeepPartial<TemplateAssignment>) {}

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "boolean", default: false })
    editable: boolean;

    @Column()
    id_task: number;

    @Index()
    @ManyToOne(() => Task)
    @JoinColumn({ name: "id_task", referencedColumnName: "id" })
    task: Task;

    @Column()
    id_template: number;

    @Index()
    @ManyToOne(() => Template)
    @JoinColumn({ name: "id_template", referencedColumnName: "id" })
    template: Template;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: string;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: string;
}