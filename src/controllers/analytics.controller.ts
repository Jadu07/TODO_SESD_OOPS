
import { Request, Response, NextFunction } from "express";
import { analyticsService } from "../services/analytics.service";

export class AnalyticsController {
    getStudentSGPA = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { semester, year } = req.query;
            const sgpa = await analyticsService.calculateSGPA(id as string, Number(semester), String(year));
            res.status(200).json({ status: "success", data: { sgpa } });
        } catch (error) {
            next(error);
        }
    };

    getStudentCGPA = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cgpa = await analyticsService.calculateCGPA(req.params.id as string);
            res.status(200).json({ status: "success", data: { cgpa } });
        } catch (error) {
            next(error);
        }
    };

    getRankings = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const rankings = await analyticsService.getRankings(req.query);
            res.status(200).json({ status: "success", results: rankings.length, data: rankings });
        } catch (error) {
            next(error);
        }
    };

    getTranscript = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const transcript = await analyticsService.getTranscript(req.params.id as string);
            res.status(200).json({ status: "success", data: transcript });
        } catch (error) {
            next(error);
        }
    };
}
export const analyticsController = new AnalyticsController();
