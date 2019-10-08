import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PrimaryBaseEntity } from "../../../shared/entities/primary-base.entity";
import { User } from "./user.entity";

@Entity()
export class UserRole extends PrimaryBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    title: string;

    @Column({ type: "text", nullable: true })
    description: string;
}
