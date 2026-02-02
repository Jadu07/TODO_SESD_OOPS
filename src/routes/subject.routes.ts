
import { Router } from "express";
import { subjectController } from "../controllers/subject.controller";

const router = Router();

router.post("/", subjectController.create);
router.get("/", subjectController.getAll);
router.get("/:id", subjectController.getOne);
router.patch("/:id", subjectController.update);
router.delete("/:id", subjectController.delete);

export const subjectRoutes = router;
