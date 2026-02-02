
import { markRepository, examRepository } from "../repositories";
import { Mark } from "../models/mark.model";
import { AppError } from "../utils/AppError";

export class MarkService {
    async addMark(data: Omit<Mark, "id" | "createdAt" | "updatedAt">): Promise<Mark> {
        const exam = await examRepository.findById(data.examId);
        if (!exam) throw new AppError("Exam not found", 404);

        if (data.marksObtained < 0 || data.marksObtained > exam.maxMarks) {
            throw new AppError(`Marks obtained must be between 0 and ${exam.maxMarks}`, 400);
        }


        const existing = await markRepository.findAll(m =>
            m.studentId === data.studentId &&
            m.examId === data.examId &&
            m.subjectId === data.subjectId
        );
        if (existing.length > 0) {
            throw new AppError("Marks for this student, subject and exam already exist", 400);
        }

        return await markRepository.create(data);
    }

    async getMarks(query: any): Promise<Mark[]> {
        let marks = await markRepository.findAll();
        if (query.studentId) marks = marks.filter(m => m.studentId === query.studentId);
        if (query.subjectId) marks = marks.filter(m => m.subjectId === query.subjectId);
        if (query.examId) marks = marks.filter(m => m.examId === query.examId);

        if (query.sortBy === 'marksObtained' && query.sortDir === 'desc') {
            marks.sort((a, b) => b.marksObtained - a.marksObtained);
        }
        return marks;
    }
}
export const markService = new MarkService();
