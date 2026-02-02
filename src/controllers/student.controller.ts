
import { Request, Response, NextFunction } from "express";
import { studentService } from "../services/student.service";

export class StudentController {
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const student = await studentService.createStudent(req.body);
            res.status(201).json({ status: "success", data: student });
        } catch (error) {
            next(error);
        }
    };

    getOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const student = await studentService.getStudent(req.params.id as string);
            res.status(200).json({ status: "success", data: student });
        } catch (error) {
            next(error);
        }
    };

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await studentService.getAllStudents(req.query);
            res.status(200).json({ status: "success", results: result.data.length, total: result.total, data: result.data });
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const student = await studentService.updateStudent(req.params.id as string, req.body);
            res.status(200).json({ status: "success", data: student });
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await studentService.deleteStudent(req.params.id as string);
            res.status(204).json({ status: "success", data: null });
        } catch (error) {
            next(error);
        }
    };
}
export const studentController = new StudentController();
