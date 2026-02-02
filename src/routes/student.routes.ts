
import { Router } from "express";
import { studentController } from "../controllers/student.controller";

const router = Router();

router.post("/", studentController.create);
router.get("/", studentController.getAll);
router.get("/:id", studentController.getOne);
router.patch("/:id", studentController.update);
router.delete("/:id", studentController.delete);

export const studentRoutes = router;
