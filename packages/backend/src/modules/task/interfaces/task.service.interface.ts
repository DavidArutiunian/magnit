import { TaskReportDto } from "../dto/task-report.dto";
import { TaskDto } from "../dto/task.dto";
import { TaskStage } from "../entities/task-stage.entity";
import { ETaskStatus, Task } from "../entities/task.entity";

export type TTaskWithLastStageAndToken = Task & { token: string; stage: TaskStage };

export interface ITaskService {
    findAll(
        offset?: number,
        limit?: number,
        sortBy?: keyof TaskDto,
        sort?: "ASC" | "DESC",
        status?: ETaskStatus,
        statuses?: ETaskStatus[],
        title?: string,
    ): Promise<Task[]>;

    insert(task: Task): Promise<Task>;

    update(id: number, task: Task): Promise<Task>;

    findById(id: string, relations?: string[]): Promise<Task>;

    getTaskExtended(id: string): Promise<Task>;

    getTaskStagesWithHistory(id: string): Promise<Task>;

    deleteById(id: string): Promise<void>;

    setTaskAnswers(
        taskId: string,
        templateIds: string[],
        files: Express.Multer.File[],
        body: { [key: string]: string },
    ): Promise<void>;

    setAllAssignmentsNonEditable(id: number): Promise<void>;

    findActiveStage(id: string): Promise<TaskStage | undefined>;

    getDescriptionByTransition(prevStatus: ETaskStatus, nextStatus: ETaskStatus): string;

    getReport(id: string): Promise<[Task, TaskReportDto]>;

    getReportBuffer(report: TaskReportDto): Buffer;

    findTasksWithExpiringStages(): Promise<TTaskWithLastStageAndToken[]>;
}
