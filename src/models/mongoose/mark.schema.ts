
import mongoose, { Schema, Document } from "mongoose";
import { Mark } from "../mark.model";

const MarkSchema: Schema = new Schema({
    _id: { type: String, required: true },
    studentId: { type: String, ref: 'Student', required: true },
    subjectId: { type: String, ref: 'Subject', required: true },
    examId: { type: String, ref: 'Exam', required: true },
    marksObtained: { type: Number, required: true },
    remarks: { type: String }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

export const MarkModel = mongoose.model<Mark & Document>("Mark", MarkSchema);
