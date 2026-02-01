import { Router } from "express";
import { ToDoController } from "../controller/todo.controller";

export class ToDoRoutes {
    public router: Router;
    private todoController: ToDoController;

    constructor() {
        this.router = Router();
        this.todoController = new ToDoController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/tsk", this.todoController.getAll);
        this.router.post("/tsk", this.todoController.create);
        this.router.put("/tsk/:id", this.todoController.update);
        this.router.delete("/tsk/:id", this.todoController.delete);
    }
}