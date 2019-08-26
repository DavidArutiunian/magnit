import { Column, DeepPartial, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../../shared/entities/base.entity";
import { TemplateAssignment } from "../../task/entities/tempalte-assignment.entity";
import { TemplateAnswer } from "./template-answer.entity";

export type TTemplateType = "light" | "complex";

export interface IPuzzle {
    id: string;
    puzzle_type: string;
    puzzles: IPuzzle[];
}

@Entity()
export class Template extends BaseEntity<Template> {
    constructor(dto?: DeepPartial<Template>) {
        super();
        this.construct(this, dto);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    title: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @Column({ type: "jsonb", default: [] })
    sections: object;

    @OneToMany(() => TemplateAssignment, template_assignment => template_assignment.template, {
        cascade: true,
    })
    assignments: TemplateAssignment[];

    @OneToMany(() => TemplateAnswer, answer => answer.template, { cascade: true })
    answers: TemplateAnswer[];

    @Column({ type: "varchar", default: "light" })
    type: TTemplateType;
}
