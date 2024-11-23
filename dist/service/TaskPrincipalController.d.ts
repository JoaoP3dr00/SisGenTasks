import { PrismaService } from "src/dataac/conn/prisma.conn";
import { TaskDTO } from "src/domain/dto/TaskDTO";
import { Response } from "express";
import { GetTaskDTO } from "src/domain/dto/GetTaskDTO";
export declare class TaskPrincipalController {
    private prisma;
    constructor(prisma: PrismaService);
    createTask(taskDTO: TaskDTO, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteTask(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    getTaskById(getTaskDTO: GetTaskDTO, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllTask(res: Response): Promise<Response<any, Record<string, any>>>;
    updateTask(id: number, taskDTO: TaskDTO, res: Response): Promise<Response<any, Record<string, any>>>;
}
