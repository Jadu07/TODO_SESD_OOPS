
import { MongooseRepository } from "./mongoose.repository";
import { StudentModel } from "../models/mongoose/student.schema";
import { SubjectModel } from "../models/mongoose/subject.schema";
import { EnrollmentModel } from "../models/mongoose/enrollment.schema";
import { ExamModel } from "../models/mongoose/exam.schema";
import { MarkModel } from "../models/mongoose/mark.schema";
import { GradeRuleModel } from "../models/mongoose/gradeRule.schema";
import { Student } from "../models/student.model";
import { Subject } from "../models/subject.model";
import { Enrollment } from "../models/enrollment.model";
import { Exam } from "../models/exam.model";
import { Mark } from "../models/mark.model";
import { GradeRule } from "../models/gradeRule.model";

export const studentRepository = new MongooseRepository<Student>(StudentModel);
export const subjectRepository = new MongooseRepository<Subject>(SubjectModel);
export const enrollmentRepository = new MongooseRepository<Enrollment>(EnrollmentModel);
export const examRepository = new MongooseRepository<Exam>(ExamModel);
export const markRepository = new MongooseRepository<Mark>(MarkModel);
export const gradeRuleRepository = new MongooseRepository<GradeRule>(GradeRuleModel);
