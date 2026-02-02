
import { BaseEntity } from "./types";

export interface Mark extends BaseEntity {
    studentId: string;
    subjectId: string;
    examId: string;
    marksObtained: number;
    remarks?: string;
}
