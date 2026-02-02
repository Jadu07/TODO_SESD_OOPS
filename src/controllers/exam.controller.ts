
import { Request, Response, NextFunction } from "express";
import { examService } from "../services/exam.service";

export class ExamController {
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const exam = await examService.createExam(req.body);
            res.status(201).json({ status: "success", data: exam });
        } catch (error) {
            next(error);
        }
    };

    getOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const exam = await examService.getExam(req.params.id as string);
            res.status(200).json({ status: "success", data: exam });
        } catch (error) {
            next(error);
        }
    };

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const exams = await examService.getExams(req.query);
            res.status(200).json({ status: "success", results: exams.length, data: exams });
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await examService.deleteExam(req.params.id as string);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
export const examController = new ExamController();
