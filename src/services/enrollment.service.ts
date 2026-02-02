
import { enrollmentRepository, subjectRepository, studentRepository } from "../repositories";
import { Enrollment } from "../models/enrollment.model";
import { AppError } from "../utils/AppError";

export class EnrollmentService {
    async createEnrollment(data: Omit<Enrollment, "id" | "createdAt" | "updatedAt">): Promise<Enrollment> {
        
        const existing = await enrollmentRepository.findAll(e =>
            e.studentId === data.studentId &&
            e.subjectId === data.subjectId &&
            e.semester === data.semester &&
            e.academicYear === data.academicYear
        );
        if (existing.length > 0) {
            throw new AppError("Student already enrolled in this subject for this semester/year", 400);
        }

        
        const student = await studentRepository.findById(data.studentId);
        if (!student) throw new AppError("Student not found", 404);
        const subject = await subjectRepository.findById(data.subjectId);
        if (!subject) throw new AppError("Subject not found", 404);

        return await enrollmentRepository.create(data);
    }

    
    async bulkEnroll(data: { studentId: string, subjectIds: string[], semester: number, academicYear: string, status: any }): Promise<Enrollment[]> {
        const results: Enrollment[] = [];
        for (const subjectId of data.subjectIds) {
            try {
                const enrollment = await this.createEnrollment({
                    studentId: data.studentId,
                    subjectId,
                    semester: data.semester,
                    academicYear: data.academicYear,
                    status: data.status
                });
                results.push(enrollment);
            } catch (e) {
                
                
                
                console.error(`Failed to enroll subject ${subjectId}`, e);
            }
        }
        return results;
    }

    async getEnrollments(query: any): Promise<Enrollment[]> {
        let items = await enrollmentRepository.findAll();
        if (query.studentId) items = items.filter(e => e.studentId === query.studentId);
        if (query.semester) items = items.filter(e => e.semester === Number(query.semester));
        if (query.year) items = items.filter(e => e.academicYear === query.year);
        return items;
    }

    async updateStatus(id: string, status: any): Promise<Enrollment> {
        const updated = await enrollmentRepository.update(id, { status });
        if (!updated) throw new AppError("Enrollment not found", 404);
        return updated;
    }

    async deleteEnrollment(id: string): Promise<void> {
        const deleted = await enrollmentRepository.delete(id);
        if (!deleted) throw new AppError("Enrollment not found", 404);
    }
}

export const enrollmentService = new EnrollmentService();
