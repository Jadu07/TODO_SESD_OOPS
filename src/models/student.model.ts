
import { Department, StudentStatus, BaseEntity } from "./types";

export interface Student extends BaseEntity {
    name: string;
    rollNo: string;
    email: string;
    department: Department;
    batchYear: number;
    status: StudentStatus;
}
