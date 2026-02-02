
import { ExamType, BaseEntity } from "./types";

export interface Exam extends BaseEntity {
    name: string;
    type: ExamType;
    maxMarks: number;
    weightage: number; 
    semester: number;
    academicYear: string;
}
