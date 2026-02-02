
import mongoose, { Schema, Document } from "mongoose";
import { Enrollment } from "../enrollment.model";
import { EnrollmentStatus } from "../types";

const EnrollmentSchema: Schema = new Schema({
    _id: { type: String, required: true },
    studentId: { type: String, ref: 'Student', required: true },
    subjectId: { type: String, ref: 'Subject', required: true },
    semester: { type: Number, required: true },
    academicYear: { type: String, required: true },
    status: { type: String, enum: Object.values(EnrollmentStatus), default: EnrollmentStatus.ENROLLED }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

export const EnrollmentModel = mongoose.model<Enrollment & Document>("Enrollment", EnrollmentSchema);
