
import { studentRepository } from "../repositories";
import { Student } from "../models/student.model";
import { AppError } from "../utils/AppError";

export class StudentService {
    async createStudent(data: Omit<Student, "id" | "createdAt" | "updatedAt">): Promise<Student> {
        
        const existing = await studentRepository.findAll(s => s.email === data.email || s.rollNo === data.rollNo);
        if (existing.length > 0) {
            throw new AppError("Student with this email or rollNo already exists", 400);
        }
        return await studentRepository.create(data);
    }

    async getStudent(id: string): Promise<Student> {
        const student = await studentRepository.findById(id);
        if (!student) throw new AppError("Student not found", 404);
        return student;
    }

    async updateStudent(id: string, updates: Partial<Student>): Promise<Student> {
        const updated = await studentRepository.update(id, updates);
        if (!updated) throw new AppError("Student not found", 404);
        return updated;
    }

    async deleteStudent(id: string): Promise<void> {
        const deleted = await studentRepository.delete(id);
        if (!deleted) throw new AppError("Student not found", 404);
    }

    async getAllStudents(query: any): Promise<{ data: Student[], total: number, page: number, limit: number }> {
        let students = await studentRepository.findAll();

        
        if (query.q) {
            const q = (query.q as string).toLowerCase();
            students = students.filter(s =>
                s.name.toLowerCase().includes(q) ||
                s.rollNo.toLowerCase().includes(q) ||
                s.email.toLowerCase().includes(q)
            );
        }

        
        if (query.department) {
            students = students.filter(s => s.department === query.department);
        }
        if (query.batchYear) {
            students = students.filter(s => s.batchYear === Number(query.batchYear));
        }
        if (query.status) {
            students = students.filter(s => s.status === query.status);
        }

        
        if (query.sortBy) {
            const field = query.sortBy as keyof Student;
            const dir = query.sortDir === 'desc' ? -1 : 1;
            students.sort((a, b) => {
                const valA = a[field] ?? "";
                const valB = b[field] ?? "";
                if (valA < valB) return -1 * dir;
                if (valA > valB) return 1 * dir;
                return 0;
            });
        } else {
            
            students.sort((a, b) => a.name.localeCompare(b.name));
        }

        
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const sliced = students.slice(startIndex, startIndex + limit);

        return {
            data: sliced,
            total: students.length,
            page,
            limit
        };
    }
}

export const studentService = new StudentService();
