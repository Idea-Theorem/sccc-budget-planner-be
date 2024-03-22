import { Router } from "express";
import UserRoutes from "./userRoutes";
import DepartmentRoutes from "./departmentRoutes";
import CenterRoutes from "./centerRoutes";
import ProgramRoutes from "./programRoutes";
import RoleRoutes from "./roleRoutes";
import PermissionRoutes from "./permissionRoutes";

const router = Router();

router.use("/user", UserRoutes);
router.use("/department", DepartmentRoutes);
router.use("/center", CenterRoutes);
router.use("/program", ProgramRoutes);
router.use("/role", RoleRoutes);
router.use("/permission", PermissionRoutes);

export default router;