
import mongoose, { Schema, Document } from "mongoose";
import { Student } from "../student.model";
import { Department, StudentStatus } from "../types";
// Note: We might need to adjust student.model.ts to just export interfaces if it doesn't already.

const StudentSchema: Schema = new Schema({
    _id: { type: String, required: true }, // We'll manage UUIDs manually to keep consistency or switch to ObjectId if allowed? 
    // The previous implementation used UUIDs. Mongoose uses ObjectId by default. 
    // To minimize friction with existing services/tests, I can keep UUIDs or switch. 
    // The user said "use mongoose". Usually implies standard Mongoose _id.
    // But I have an IRepository that expects strict types. 
    // Let's try to stick to the interface. The interface has `id: string`. Mongoose `_id` is implicit. 
    // I will map `_id` to `id` in the repository layer.

    name: { type: String, required: true },
    rollNo: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, enum: Object.values(Department), required: true },
    batchYear: { type: Number, required: true },
    status: { type: String, enum: Object.values(StudentStatus), default: StudentStatus.ACTIVE }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

export const StudentModel = mongoose.model<Student & Document>("Student", StudentSchema);
