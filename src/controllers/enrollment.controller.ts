
import { Request, Response, NextFunction } from "express";
import { enrollmentService } from "../services/enrollment.service";

export class EnrollmentController {
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const enrollment = await enrollmentService.createEnrollment(req.body);
            res.status(201).json({ status: "success", data: enrollment });
        } catch (error) {
            next(error);
        }
    };

    createBulk = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const enrollments = await enrollmentService.bulkEnroll(req.body);
            res.status(201).json({ status: "success", data: enrollments });
        } catch (error) {
            next(error);
        }
    };

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const enrollments = await enrollmentService.getEnrollments(req.query);
            res.status(200).json({ status: "success", results: enrollments.length, data: enrollments });
        } catch (error) {
            next(error);
        }
    };

    updateStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const enrollment = await enrollmentService.updateStatus(req.params.id as string, req.body.status);
            res.status(200).json({ status: "success", data: enrollment });
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await enrollmentService.deleteEnrollment(req.params.id as string);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
export const enrollmentController = new EnrollmentController();
