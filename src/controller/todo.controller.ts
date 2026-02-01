import { ToDoService } from "../schema/todo.service";
import { Request, Response } from "express";

export class ToDoController {
    private todoService: ToDoService;

    constructor() {
        this.todoService = new ToDoService();
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const tasks = await this.todoService.getTask();
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: "Error fetching tasks", error });
        }
    }

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const task = await this.todoService.createTask(req.body);
            res.status(201).json(task);
        } catch (error) {
            res.status(500).json({ message: "Error creating task", error });
        }
    }

    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const task = await this.todoService.updateTask(id as string, req.body);
            if (!task) {
                res.status(404).json({ message: "Task not found" });
                return;
            }
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ message: "Error updating task", error });
        }
    }

    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const task = await this.todoService.deleteTask(id as string);
            if (!task) {
                res.status(404).json({ message: "Task not found" });
                return;
            }
            res.status(200).json({ message: "Task deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting task", error });
        }
    }
}