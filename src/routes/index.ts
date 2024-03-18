import { Router } from "express";
import UserRoutes from "./userRoutes";
import DepartmentRoutes from "./departmentRoutes";
import CenterRoutes from "./centerRoutes";
import ProgramRoutes from "./programRoutes";
import RoleRoutes from "./roleRoutes";

const router = Router();

router.use("/user", UserRoutes);
router.use("/department", DepartmentRoutes);
router.use("/center", CenterRoutes);
router.use("/program", ProgramRoutes);
router.use("/role", RoleRoutes);

export default router;