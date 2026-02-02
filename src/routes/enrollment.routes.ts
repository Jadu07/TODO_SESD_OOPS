
import { Router } from "express";
import { enrollmentController } from "../controllers/enrollment.controller";

const router = Router();

router.post("/", enrollmentController.create);
router.post("/bulk", enrollmentController.createBulk);
router.get("/", enrollmentController.getAll);
router.patch("/:id", enrollmentController.updateStatus);
router.delete("/:id", enrollmentController.delete);

export const enrollmentRoutes = router;
