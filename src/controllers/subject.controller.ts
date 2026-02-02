
import { Request, Response, NextFunction } from "express";
import { subjectService } from "../services/subject.service";

export class SubjectController {
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const subject = await subjectService.createSubject(req.body);
            res.status(201).json({ status: "success", data: subject });
        } catch (error) {
            next(error);
        }
    };

    getOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const subject = await subjectService.getSubject(req.params.id as string);
            res.status(200).json({ status: "success", data: subject });
        } catch (error) {
            next(error);
        }
    };

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await subjectService.getAllSubjects(req.query);
            res.status(200).json({ status: "success", results: result.data.length, total: result.total, data: result.data });
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const subject = await subjectService.updateSubject(req.params.id as string, req.body);
            res.status(200).json({ status: "success", data: subject });
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await subjectService.deleteSubject(req.params.id as string);
            res.status(204).json({ status: "success", data: null });
        } catch (error) {
            next(error);
        }
    };
}
export const subjectController = new SubjectController();
