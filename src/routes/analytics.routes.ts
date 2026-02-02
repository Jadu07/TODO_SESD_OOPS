
import { Router } from "express";
import { analyticsController } from "../controllers/analytics.controller";

const router = Router();

router.get("/student/:id/sgpa", analyticsController.getStudentSGPA);
router.get("/student/:id/cgpa", analyticsController.getStudentCGPA);
router.get("/rankings", analyticsController.getRankings);
router.get("/reports/student/:id/transcript", analyticsController.getTranscript);

export const analyticsRoutes = router;
