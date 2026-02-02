
import { subjectRepository, enrollmentRepository } from "../repositories";
import { Subject } from "../models/subject.model";
import { AppError } from "../utils/AppError";

export class SubjectService {
    async createSubject(data: Omit<Subject, "id" | "createdAt" | "updatedAt">): Promise<Subject> {
        if (data.credits <= 0) {
            throw new AppError("Credits must be greater than 0", 400);
        }
        
        const existing = await subjectRepository.findAll(s => s.code === data.code);
        if (existing.length > 0) {
            throw new AppError("Subject with this code already exists", 400);
        }
        return await subjectRepository.create(data);
    }

    async getSubject(id: string): Promise<Subject> {
        const subject = await subjectRepository.findById(id);
        if (!subject) throw new AppError("Subject not found", 404);
        return subject;
    }

    async updateSubject(id: string, updates: Partial<Subject>): Promise<Subject> {
        if (updates.credits !== undefined && updates.credits <= 0) {
            throw new AppError("Credits must be greater than 0", 400);
        }
        const updated = await subjectRepository.update(id, updates);
        if (!updated) throw new AppError("Subject not found", 404);
        return updated;
    }

    async deleteSubject(id: string): Promise<void> {
        
        
        
        
        const enrollments = await enrollmentRepository.findAll(e => e.subjectId === id);
        if (enrollments.length > 0) {
            throw new AppError("Cannot delete subject with active enrollments", 400);
        }

        const deleted = await subjectRepository.delete(id);
        if (!deleted) throw new AppError("Subject not found", 404);
    }

    async getAllSubjects(query: any): Promise<{ data: Subject[], total: number, page: number, limit: number }> {
        let subjects = await subjectRepository.findAll();

        if (query.q) {
            const q = (query.q as string).toLowerCase();
            subjects = subjects.filter(s =>
                s.name.toLowerCase().includes(q) ||
                s.code.toLowerCase().includes(q)
            );
        }

        if (query.semester) subjects = subjects.filter(s => s.semester === Number(query.semester));
        if (query.department) subjects = subjects.filter(s => s.department === query.department);
        if (query.isActive !== undefined) subjects = subjects.filter(s => String(s.isActive) === query.isActive);

        if (query.sortBy) {
            const field = query.sortBy as keyof Subject;
            subjects.sort((a, b) => {
                if (a[field] === undefined || b[field] === undefined) return 0;
                if (a[field] < b[field]) return -1;
                if (a[field] > b[field]) return 1;
                return 0;
            });
        }

        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const sliced = subjects.slice(startIndex, startIndex + limit);

        return { data: sliced, total: subjects.length, page, limit };
    }
}

export const subjectService = new SubjectService();
