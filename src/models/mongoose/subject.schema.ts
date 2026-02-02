
import mongoose, { Schema, Document } from "mongoose";
import { Subject } from "../subject.model";
import { Department } from "../types";

const SubjectSchema: Schema = new Schema({
    _id: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    credits: { type: Number, required: true },
    semester: { type: Number, required: true },
    department: { type: String, enum: Object.values(Department), required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

export const SubjectModel = mongoose.model<Subject & Document>("Subject", SubjectSchema);
