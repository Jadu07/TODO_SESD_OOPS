
import { Request, Response, NextFunction } from "express";
import { gradeRuleService } from "../services/gradeRule.service";

export class GradeRuleController {
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const rule = await gradeRuleService.createRule(req.body);
            res.status(201).json({ status: "success", data: rule });
        } catch (error) {
            next(error);
        }
    };

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const rules = await gradeRuleService.getRules();
            res.status(200).json({ status: "success", results: rules.length, data: rules });
        } catch (error) {
            next(error);
        }
    };
}
export const gradeRuleController = new GradeRuleController();
