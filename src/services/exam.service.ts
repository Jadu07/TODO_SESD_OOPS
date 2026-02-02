
import { examRepository } from "../repositories";
import { Exam } from "../models/exam.model";
import { AppError } from "../utils/AppError";

export class ExamService {
    async createExam(data: Omit<Exam, "id" | "createdAt" | "updatedAt">): Promise<Exam> {
        return await examRepository.create(data);
    }

    async getExam(id: string): Promise<Exam> {
        const exam = await examRepository.findById(id);
        if (!exam) throw new AppError("Exam not found", 404);
        return exam;
    }

    async deleteExam(id: string): Promise<void> {
        if (!await examRepository.delete(id)) throw new AppError("Exam not found", 404);
    }

    async getExams(query: any): Promise<Exam[]> {
        let exams = await examRepository.findAll();
        if (query.semester) exams = exams.filter(e => e.semester === Number(query.semester));
        if (query.year) exams = exams.filter(e => e.academicYear === query.year);
        if (query.type) exams = exams.filter(e => e.type === query.type);
        return exams;
    }
}
export const examService = new ExamService();
