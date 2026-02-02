
import mongoose, { Schema, Document } from "mongoose";
import { Exam } from "../exam.model";
import { ExamType } from "../types";

const ExamSchema: Schema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, enum: Object.values(ExamType), required: true },
    maxMarks: { type: Number, required: true },
    weightage: { type: Number, required: true },
    semester: { type: Number, required: true },
    academicYear: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

export const ExamModel = mongoose.model<Exam & Document>("Exam", ExamSchema);
