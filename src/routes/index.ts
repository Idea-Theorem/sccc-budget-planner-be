import { Router } from "express";
import userRoutes from "./userRoutes";
import departmentRoutes from "./departmentRoutes";
import centerRoutes from "./centerRoutes";
import programRoutes from "./programRoutes";
import roleRoutes from "./roleRoutes";
import permissionRoutes from "./permissionRoutes";
import dashboardRoutes from "./dashboardRoutes";
import benefitRoutes from "./benefitRoute";
import helpers from "../utils/helpers";

const router = Router();

router.use("/user", userRoutes);
router.use("/department", departmentRoutes);
router.use("/center", centerRoutes);
router.use("/benefit", benefitRoutes);
router.use("/program", programRoutes);
router.use("/role", roleRoutes);
router.use("/permission", permissionRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
