import express from "express";
import mongoose from "mongoose"

interface App_Interface {
    startServer(): void;
    connectDatabase(): void;
    initializeRoutes(): void;

}

import { ToDoRoutes } from "./Routes/todo.routes";

export class App implements App_Interface {

    PORT: number;
    app: express.Application;

    constructor() {
        this.PORT = 4000
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.startServer();
        this.initializeRoutes()
        this.connectDatabase();
    }

    startServer(): void {
        this.app.listen(this.PORT, () => {
            console.log("Server is Running")
        })
    };
    async connectDatabase(): Promise<void> {
        try {
            // Replace with your actual valid connection string or environment variable
            await mongoose.connect("mongodb://localhost:27017/todo-oop")
            console.log("Database Connected")
        } catch (err) {
            console.log("URL Not Found", err)
        }
    };
    initializeRoutes(): void {
        const todoRoutes = new ToDoRoutes();
        this.app.use("/api", todoRoutes.router);
    };
}