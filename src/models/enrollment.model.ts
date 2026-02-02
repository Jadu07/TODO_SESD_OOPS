
import { EnrollmentStatus, BaseEntity } from "./types";

export interface Enrollment extends BaseEntity {
    studentId: string;
    subjectId: string;
    semester: number;
    academicYear: string; 
    status: EnrollmentStatus;
}
