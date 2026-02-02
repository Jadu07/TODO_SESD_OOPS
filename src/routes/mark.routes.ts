
import { Router } from "express";
import { markController } from "../controllers/mark.controller";

const router = Router();

router.post("/", markController.create);
router.get("/", markController.getAll);

export const markRoutes = router;
