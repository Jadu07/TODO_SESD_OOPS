
import { Router } from "express";
import { examController } from "../controllers/exam.controller";

const router = Router();

router.post("/", examController.create);
router.get("/", examController.getAll);
router.get("/:id", examController.getOne);
router.delete("/:id", examController.delete);

export const examRoutes = router;
