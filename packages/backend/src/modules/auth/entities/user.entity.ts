import { Exclude } from "class-transformer";
import { IsEmail, IsString, IsNumber } from "class-validator";
import {
    Entity,
    DeepPartial,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    PrimaryColumn,
    Index,
} from "typeorm";
import { BaseEntity } from "../../../shared/entities/base.entity";
import { UserRole } from "./user.role.entity";

@Entity()
export class User extends BaseEntity<User> {
    constructor(dto?: DeepPartial<User>) {
        super();
        this.construct(this, dto);
    }

    @Exclude({ toPlainOnly: true })
    @Column()
    password: string;

    @IsString()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @IsEmail()
    @Column()
    email: string;

    @IsString()
    @Column("varchar")
    firstName: string;

    @IsString()
    @Column("varchar")
    lastName: string;

    @IsString()
    @Column({ type: "varchar", nullable: true })
    patronymic: string;

    @IsString()
    @Column({ type: "varchar", nullable: true })
    region: string;

    @IsString()
    @Column({ type: "varchar", nullable: true })
    department: string;

    @Index()
    @PrimaryColumn()
    id_role: number = 0;

    @ManyToOne(() => UserRole, role => role.users)
    @JoinColumn({ name: "id_role", referencedColumnName: "id" })
    role: UserRole;

    @IsNumber()
    @Column({ type: "int" })
    level: number = 1;
}
