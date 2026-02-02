
import { studentRepository, subjectRepository, examRepository, markRepository, gradeRuleRepository, enrollmentRepository } from "../repositories";
import { AppError } from "../utils/AppError";

class AnalyticsService {
    
    private async getGradePoint(percentage: number): Promise<number> {
        const rules = await gradeRuleRepository.findAll();
        for (const rule of rules) {
            if (percentage >= rule.minPercent && percentage <= rule.maxPercent) {
                return rule.gradePoint;
            }
        }
        return 0; 
    }

    private async getGrade(percentage: number): Promise<string> {
        const rules = await gradeRuleRepository.findAll();
        for (const rule of rules) {
            if (percentage >= rule.minPercent && percentage <= rule.maxPercent) {
                return rule.grade;
            }
        }
        return "F";
    }

    
    private async getSubjectPercentage(studentId: string, subjectId: string): Promise<number> {
        
        
        
        
        
        

        
        const marks = await markRepository.findAll(m => m.studentId === studentId && m.subjectId === subjectId);

        let totalWeightedScore = 0;
        let totalWeightageChecked = 0;

        for (const mark of marks) {
            const exam = await examRepository.findById(mark.examId);
            if (!exam) continue;

            const percentageInExam = (mark.marksObtained / exam.maxMarks) * 100;
            
            
            const contribution = (mark.marksObtained / exam.maxMarks) * exam.weightage;
            totalWeightedScore += contribution;
            totalWeightageChecked += exam.weightage;
        }

        
        
        
        return totalWeightedScore;
    }

    async calculateSGPA(studentId: string, semester: number, academicYear: string): Promise<number> {
        
        const enrollments = await enrollmentRepository.findAll(e =>
            e.studentId === studentId && e.semester === semester && e.academicYear === academicYear
        );

        if (enrollments.length === 0) return 0;

        let totalCredits = 0;
        let totalWeightedPoints = 0;

        for (const enrollment of enrollments) {
            const subject = await subjectRepository.findById(enrollment.subjectId);
            if (!subject) continue;

            const percentage = await this.getSubjectPercentage(studentId, subject.id);
            const gradePoint = await this.getGradePoint(percentage);

            totalWeightedPoints += (gradePoint * subject.credits);
            totalCredits += subject.credits;
        }

        return totalCredits === 0 ? 0 : Number((totalWeightedPoints / totalCredits).toFixed(2));
    }

    async calculateCGPA(studentId: string): Promise<number> {
        
        
        const enrollments = await enrollmentRepository.findAll(e => e.studentId === studentId);

        
        
        

        let totalCredits = 0;
        let totalWeightedPoints = 0;

        
        

        for (const enrollment of enrollments) {
            const subject = await subjectRepository.findById(enrollment.subjectId);
            if (!subject) continue;

            const percentage = await this.getSubjectPercentage(studentId, subject.id);
            const gradePoint = await this.getGradePoint(percentage);

            totalWeightedPoints += (gradePoint * subject.credits);
            totalCredits += subject.credits;
        }

        return totalCredits === 0 ? 0 : Number((totalWeightedPoints / totalCredits).toFixed(2));
    }

    async getTranscript(studentId: string) {
        const student = await studentRepository.findById(studentId);
        if (!student) throw new AppError("Student not found", 404);

        const enrollments = await enrollmentRepository.findAll(e => e.studentId === studentId);

        
        const terms: any[] = [];
        
        const semesterMap = new Map<string, any[]>();

        for (const enrollment of enrollments) {
            const key = `${enrollment.semester}-${enrollment.academicYear}`;
            if (!semesterMap.has(key)) semesterMap.set(key, []);

            const subject = await subjectRepository.findById(enrollment.subjectId);
            if (!subject) continue;

            const percentage = await this.getSubjectPercentage(studentId, subject.id);
            const grade = await this.getGrade(percentage);
            const gradePoint = await this.getGradePoint(percentage);

            semesterMap.get(key)!.push({
                code: subject.code,
                name: subject.name,
                credits: subject.credits,
                percentage,
                grade,
                gradePoint
            });
        }

        
        for (const [key, subjects] of semesterMap.entries()) {
            const [sem, year] = key.split('-');
            const totalCredits = subjects.reduce((sum: number, s: any) => sum + s.credits, 0);
            const totalPoints = subjects.reduce((sum: number, s: any) => sum + (s.credits * s.gradePoint), 0);
            const sgpa = totalCredits === 0 ? 0 : (totalPoints / totalCredits).toFixed(2);

            terms.push({
                semester: Number(sem),
                academicYear: year,
                subjects,
                sgpa
            });
        }

        const cgpa = await this.calculateCGPA(studentId);

        return {
            student: { name: student.name, rollNo: student.rollNo, department: student.department },
            cgpa,
            terms
        };
    }

    async getRankings(filter: any) {
        
        let students = await studentRepository.findAll();
        if (filter.department) students = students.filter(s => s.department === filter.department);
        if (filter.batchYear) students = students.filter(s => s.batchYear === Number(filter.batchYear));

        
        const ranked = await Promise.all(students.map(async s => {
            const cgpa = await this.calculateCGPA(s.id);
            
            const enrollments = await enrollmentRepository.findAll(e => e.studentId === s.id);
            let totalCredits = 0;
            let totalMarks = 0; 
            
            

            const allMarks = await markRepository.findAll(m => m.studentId === s.id);
            totalMarks = allMarks.reduce((sum, m) => sum + m.marksObtained, 0);

            
            let failedSubjects = 0;
            for (const enrollment of enrollments) {
                const subject = await subjectRepository.findById(enrollment.subjectId);
                if (subject) {
                    totalCredits += subject.credits;
                    const p = await this.getSubjectPercentage(s.id, subject.id);
                    if ((await this.getGradePoint(p)) === 0) failedSubjects++;
                }
            }

            return {
                student: s,
                cgpa,
                totalCredits,
                totalMarks,
                failedSubjects
            };
        }));

        
        ranked.sort((a, b) => {
            if (b.cgpa !== a.cgpa) return b.cgpa - a.cgpa; 
            if (b.totalCredits !== a.totalCredits) return b.totalCredits - a.totalCredits; 
            if (b.totalMarks !== a.totalMarks) return b.totalMarks - a.totalMarks; 
            return a.failedSubjects - b.failedSubjects; 
        });

        return ranked;
    }
}

export const analyticsService = new AnalyticsService();
