import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Puzzle } from "../entities/puzzle.entity";

@Injectable()
export class PuzzleService {
    constructor(@InjectRepository(Puzzle) private readonly puzzleRepository: Repository<Puzzle>) {}

    async findBySectionId(id: string) {
        return this.puzzleRepository.find({ where: { section: { id }, parent: null } });
    }

    async findByParentId(id: string) {
        return this.puzzleRepository.find({ where: { parent: { id } } });
    }
}
