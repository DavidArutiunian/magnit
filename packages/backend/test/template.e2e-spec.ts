import { AppModule } from "../src/app.module";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { TemplateService } from "../src/modules/template/services/template.service";
import { NestApplication } from "@nestjs/core";
import { Template } from "../src/modules/template/entities/template.entity";
import { PuzzleService } from "../src/modules/template/services/puzzle.service";
import { SectionService } from "../src/modules/template/services/section.service";
import { ConditionService } from "../src/modules/template/services/condition.service";
import { ValidationService } from "../src/modules/template/services/validation.service";

const payload = require("./payload.json");

describe("TemplateController (e2e)", () => {
    let app: NestApplication;
    const templateService = {
        async findAll() {
            return [];
        },

        async save(template: Template) {
            return template;
        },

        async findById(id: string) {
            const buffer = { ...payload };
            delete buffer.sections;
            return { ...buffer };
        },
    };

    const sectionService = {
        async findByTemplateId(id: number) {
            if (payload.id !== id) {
                return;
            }
            return payload.sections.map(section => {
                const buffer = { ...section };
                delete buffer.puzzles;
                return { ...buffer };
            });
        },
    };

    const puzzleService = {
        async findBySectionId(id: string) {
            return payload.sections.reduce((prev, curr) => {
                if (curr.id !== id) {
                    return prev;
                }
                return [...prev, ...curr.puzzles];
            }, []);
        },

        async findByParentId(id: string) {
            const puzzles = await this.findBySectionId(payload.sections[0].id);
            return puzzles.reduce((prev, curr) => {
                if (curr.id !== id) {
                    return prev;
                }
                return [...prev, ...(curr.puzzles || [])];
            }, []);
        },
    };

    const conditionService = {
        async findByPuzzleId(id: string) {
            const puzzles = [
                ...(await puzzleService.findBySectionId(payload.sections[0].id)),
                ...(await puzzleService.findByParentId(id)),
            ];
            return puzzles.reduce((prev, curr) => {
                if (curr.id !== id) {
                    return prev;
                }
                return [...prev, ...(curr.conditions || [])];
            }, []);
        },
    };

    const validationService = {
        async findByPuzzleId(id: string) {
            const puzzles = [
                ...(await puzzleService.findBySectionId(payload.sections[0].id)),
                ...(await puzzleService.findByParentId(id)),
            ];
            return puzzles.reduce((prev, curr) => {
                if (curr.id !== id) {
                    return prev;
                }
                return [...prev, ...(curr.validations || [])];
            }, []);
        },
    };

    beforeEach(async () => {
        const imports = [AppModule];
        const moduleFixture = await Test.createTestingModule({ imports })
            .overrideProvider(TemplateService)
            .useValue(templateService)
            .overrideProvider(PuzzleService)
            .useValue(puzzleService)
            .overrideProvider(SectionService)
            .useValue(sectionService)
            .overrideProvider(ConditionService)
            .useValue(conditionService)
            .overrideProvider(ValidationService)
            .useValue(validationService)
            .compile();

        app = moduleFixture.createNestApplication();
        (await app.setGlobalPrefix("v1")).init();
    });

    afterEach(async () => {
        await app.close();
    });

    it("GET /v1/templates", async () => {
        return request(app.getHttpServer())
            .get("/v1/templates")
            .expect(200)
            .expect({ success: 1, total: 0, templates: await templateService.findAll() });
    });

    it("POST /v1/template", async () => {
        return request(app.getHttpServer())
            .post("/v1/templates")
            .send({ template: payload })
            .expect(201)
            .expect({ success: 1, template_id: 0 });
    });

    it("GET /v1/template/0", async () => {
        return request(app.getHttpServer())
            .get("/v1/templates/0")
            .send({ template: payload })
            .expect(200)
            .then(res => {
                const body = res.body;
                body.template = JSON.parse(body.template);
                expect(body).toStrictEqual({ success: 1, template: payload });
            });
    });
});
