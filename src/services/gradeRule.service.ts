
import { gradeRuleRepository } from "../repositories";
import { GradeRule } from "../models/gradeRule.model";
import { AppError } from "../utils/AppError";

export class GradeRuleService {
    async createRule(data: Omit<GradeRule, "id" | "createdAt" | "updatedAt">): Promise<GradeRule> {
        
        const allRules = await gradeRuleRepository.findAll();
        
        for (const rule of allRules) {
            if (Math.max(data.minPercent, rule.minPercent) < Math.min(data.maxPercent, rule.maxPercent)) {
                throw new AppError(`Grade range overlaps with existing rule for ${rule.grade}`, 400);
            }
        }
        
        if (data.minPercent >= data.maxPercent) {
            throw new AppError("Min percent must be less than max percent", 400);
        }

        return await gradeRuleRepository.create(data);
    }

    async getRules(): Promise<GradeRule[]> {
        return await gradeRuleRepository.findAll();
    }
}
export const gradeRuleService = new GradeRuleService();
