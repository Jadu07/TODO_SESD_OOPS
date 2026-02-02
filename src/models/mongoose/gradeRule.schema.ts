
import mongoose, { Schema, Document } from "mongoose";
import { GradeRule } from "../gradeRule.model";

const GradeRuleSchema: Schema = new Schema({
    _id: { type: String, required: true },
    grade: { type: String, required: true },
    gradePoint: { type: Number, required: true },
    minPercent: { type: Number, required: true },
    maxPercent: { type: Number, required: true }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

export const GradeRuleModel = mongoose.model<GradeRule & Document>("GradeRule", GradeRuleSchema);
