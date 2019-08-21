import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiImplicitBody,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiUseTags,
} from "@nestjs/swagger";
import { NonCompatiblePropsPipe } from "../../shared/pipes/non-compatible-props.pipe";
import { SplitPropPipe } from "../../shared/pipes/split-prop.pipe";
import { BaseResponse } from "../../shared/responses/base.response";
import { ErrorResponse } from "../../shared/responses/error.response";
import { Template } from "../template/entities/template.entity";
import { ITemplateService } from "../template/interfaces/template.service.interface";
import { TemplateByIdPipe } from "../template/pipes/template-by-id.pipe";
import { TemplateService } from "../template/services/template.service";
import { AddTemplatesBody } from "./bodies/add-templates.body";
import { TaskStageDto } from "./dto/task-stage.dto";
import { TaskDto } from "./dto/task.dto";
import { TemplateAssignmentDto } from "./dto/template-assignment.dto";
import { TaskStage } from "./entities/task-stage.entity";
import { Task } from "./entities/task.entity";
import { TemplateAssignment } from "./entities/tempalte-assignment.entity";
import { ITaskService } from "./interfaces/task.service.interface";
import { TaskByIdPipe } from "./pipes/task-by-id.pipe";
import { TemplatesByIdsPipe } from "./pipes/templates-by-ids.pipe";
import { FindAllQuery } from "./queries/find-all.query";
import { CreateTaskResponse } from "./responses/create-task.response";
import { GetTaskExtendedResponse } from "./responses/get-task-extended.response";
import { GetTaskResponse } from "./responses/get-task.response";
import { GetTasksResponse } from "./responses/get-tasks.response";
import { UpdateTaskResponse } from "./responses/update-task.response";
import { TaskService } from "./services/task.service";
import _ = require("lodash");

@ApiUseTags("tasks")
@Controller("tasks")
export class TaskController {
    constructor(
        @Inject(TaskService) private readonly taskService: ITaskService,
        @Inject(TemplateService) private readonly templateService: ITemplateService,
    ) {}

    @Get("/")
    @ApiOkResponse({ type: GetTasksResponse, description: "Get all Tasks" })
    @ApiBadRequestResponse({ description: "Found non compatible props" })
    async findAll(
        @Query(
            new NonCompatiblePropsPipe<FindAllQuery>(["status", "statuses"]),
            new SplitPropPipe<FindAllQuery>("statuses"),
        )
        query?: FindAllQuery,
    ) {
        const { offset, limit, sort, statuses, status, title } = {
            ...new FindAllQuery(),
            ...query,
        };
        const tasks = await this.taskService.findAll(offset, limit, sort, status, statuses, title);
        return { success: 1, total: tasks.length, tasks };
    }

    @Post("/")
    @ApiImplicitBody({ name: "task", type: TaskDto, description: "Task JSON" })
    @ApiCreatedResponse({ type: CreateTaskResponse, description: "ID of created Task" })
    async create(@Body("task") taskDto: TaskDto) {
        const task = new Task(taskDto);
        const saved = await this.taskService.insert(task);
        return { success: 1, task_id: saved.id };
    }

    @Put("/:id")
    @ApiImplicitBody({ name: "task", type: TaskDto, description: "Task JSON" })
    @ApiOkResponse({ type: UpdateTaskResponse, description: "ID of updated Template" })
    @ApiNotFoundResponse({ type: ErrorResponse, description: "Task not found" })
    async update(@Param("id", TaskByIdPipe) id: string, @Body("task") taskDto: TaskDto) {
        const task = await this.taskService.findById(id);
        const updated = await this.taskService.update(id, { ...task, ...taskDto });
        return { success: 1, task_id: updated.id };
    }

    @Get("/:id")
    @ApiOkResponse({ type: GetTaskResponse, description: "Task JSON" })
    @ApiNotFoundResponse({ type: ErrorResponse, description: "Task not found" })
    async findById(@Param("id", TaskByIdPipe) id: string) {
        const task = await this.taskService.findById(id, ["task_stages"]);
        const templates = await this.templateService.findByTaskId(task.id.toString());
        return {
            success: 1,
            task: {
                ..._.omit(task, "task_stages"),
                templates: (templates || []).map(template => template.id),
                stages: (task.task_stages || []).map(stage => stage.id),
            },
        };
    }

    @Post("/:id/templates")
    @ApiImplicitBody({
        name: "templates",
        type: AddTemplatesBody,
        description: "IDs of Templates to add",
    })
    @ApiOkResponse({ type: BaseResponse })
    @ApiNotFoundResponse({ type: ErrorResponse, description: "Template not found" })
    @ApiNotFoundResponse({ type: ErrorResponse, description: "Task not found" })
    async addTemplateAssignment(
        @Param("id", TaskByIdPipe) id: string,
        @Body("templates", TemplatesByIdsPipe) templateIds: number[],
    ) {
        const templates: Template[] = [];
        for (const templateId of templateIds) {
            const template = await this.templateService.findById(templateId.toString());
            templates.push(template);
        }
        const task = await this.taskService.findById(id, ["template_assignments"]);
        task.template_assignments = [
            ...task.template_assignments,
            ...templates.map(template => new TemplateAssignment({ task, template })),
        ];
        await this.taskService.update(id, task);
        return { success: 1 };
    }

    @Put("/:taskId/templates/:templateId")
    @ApiOkResponse({ type: BaseResponse })
    @ApiNotFoundResponse({ type: ErrorResponse, description: "Template not found" })
    @ApiNotFoundResponse({ type: ErrorResponse, description: "Task not found" })
    async updateTemplateAssignment(
        @Param("taskId", TaskByIdPipe) taskId: string,
        @Param("templateId", TemplateByIdPipe) templateId: string,
        @Body() taskTemplateDto: TemplateAssignmentDto,
    ) {
        const task = await this.taskService.findById(taskId, ["template_assignments"]);
        (task.template_assignments || [])
            .filter(taskToTemplate => taskToTemplate.id_template === Number(templateId))
            .forEach((taskToTemplate, index) => {
                task.template_assignments[index] = { ...taskToTemplate, ...taskTemplateDto };
            });
        await this.taskService.update(taskId, task);
        return { success: 1 };
    }

    @Post("/:id/stages")
    @ApiImplicitBody({ type: [TaskStageDto], name: "stages" })
    @ApiOkResponse({ type: BaseResponse })
    @ApiNotFoundResponse({ type: ErrorResponse, description: "Task not found" })
    async addTaskStage(
        @Param("id", TaskByIdPipe) id: string,
        @Body("stages") taskStageDtos: TaskStageDto[],
    ) {
        const task = await this.taskService.findById(id, ["task_stages"]);
        task.task_stages = [
            ...task.task_stages,
            ...taskStageDtos.map(taskStageDto => new TaskStage({ ...taskStageDto })),
        ];
        await this.taskService.update(id, task);
        return { success: 1 };
    }

    @Delete("/:id")
    @ApiOkResponse({ type: BaseResponse, description: "OK response" })
    @ApiNotFoundResponse({ type: ErrorResponse, description: "Task not found" })
    async deleteById(@Param("id", TaskByIdPipe) id: string) {
        await this.taskService.deleteById(id);
        return { success: 1 };
    }

    @Get("/:id/extended")
    @ApiOkResponse({ type: GetTaskExtendedResponse, description: "Extended Task JSON" })
    @ApiNotFoundResponse({ type: ErrorResponse, description: "Task not found" })
    async findByIdExtended(@Param("id", TaskByIdPipe) id: string) {
        const task = await this.taskService.findById(id, ["task_stages"]);
        const templates = await this.templateService.findByTaskId(task.id.toString());
        return {
            success: 1,
            task: { ..._.omit(task, "task_stages"), templates, stages: task.task_stages || [] },
        };
    }
}
