
import { BaseEntity } from "./types";

export interface GradeRule extends BaseEntity {
    grade: string;
    gradePoint: number;
    minPercent: number;
    maxPercent: number;
}
