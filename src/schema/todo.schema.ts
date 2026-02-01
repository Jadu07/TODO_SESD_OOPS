import { Schema, Document, model } from "mongoose"

interface IToDo extends Document {
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt: Date;
}

const ToDoSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, default: "" },
    isCompleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

export const ToDoModel = model<IToDo>("task", ToDoSchema);