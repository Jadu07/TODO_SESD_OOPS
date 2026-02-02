
import { Router } from "express";
import { gradeRuleController } from "../controllers/gradeRule.controller";

const router = Router();

router.post("/", gradeRuleController.create);
router.get("/", gradeRuleController.getAll);

export const gradeRuleRoutes = router;
