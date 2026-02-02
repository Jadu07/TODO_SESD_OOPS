
import { Department, BaseEntity } from "./types";

export interface Subject extends BaseEntity {
    code: string;
    name: string;
    credits: number;
    semester: number;
    department: Department;
    isActive: boolean;
}
