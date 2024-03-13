import { Router } from "express";
import ProgramController from "../controllers/ProgramController";

const router = Router();

router.get("/", ProgramController.fetchPrograms);
router.get("/:id", ProgramController.getProgramById);
router.post("/", ProgramController.createProgram);
router.put("/:id", ProgramController.updateProgram);
router.delete("/:id", ProgramController.deleteProgram);

export default router;