
import { Request, Response, NextFunction } from "express";
import { markService } from "../services/mark.service";

export class MarkController {
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const mark = await markService.addMark(req.body);
            res.status(201).json({ status: "success", data: mark });
        } catch (error) {
            next(error);
        }
    };

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const marks = await markService.getMarks(req.query);
            res.status(200).json({ status: "success", results: marks.length, data: marks });
        } catch (error) {
            next(error);
        }
    };
}
export const markController = new MarkController();
