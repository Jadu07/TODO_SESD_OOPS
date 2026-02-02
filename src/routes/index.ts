import { Router } from "express";
import { studentRoutes } from "./student.routes";
import { subjectRoutes } from "./subject.routes";
import { enrollmentRoutes } from "./enrollment.routes";
import { examRoutes } from "./exam.routes";
import { markRoutes } from "./mark.routes";
import { gradeRuleRoutes } from "./gradeRule.routes";
import { analyticsRoutes } from "./analytics.routes";

const router = Router();

router.use("/students", studentRoutes);
router.use("/subjects", subjectRoutes);
router.use("/enrollments", enrollmentRoutes);
router.use("/exams", examRoutes);
router.use("/marks", markRoutes);
router.use("/grade-rules", gradeRuleRoutes);
router.use("/analytics", analyticsRoutes);

export { router as routes };
