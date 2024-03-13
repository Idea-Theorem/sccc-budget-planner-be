import { Router } from "express";
import UserRoutes from "./userRoutes";
import DepartmentRoutes from "./departmentRoutes";
import CenterRoutes from "./centerRoutes";
import ProgramRoutes from "./programRoutes";

const router = Router();

router.use("/user", UserRoutes);
router.use("/department", DepartmentRoutes);
router.use("/center", CenterRoutes);
router.use("/program", ProgramRoutes);

export default router;