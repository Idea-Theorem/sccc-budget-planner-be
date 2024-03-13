import { Router } from "express";
import DepartmentController from "../controllers/DepartmentController";

const router = Router();

router.get("/", DepartmentController.fetchDepartments);
router.get("/:id", DepartmentController.getDepartmentById);
router.post("/", DepartmentController.createDepartment);
router.put("/:id", DepartmentController.updateDepartment);
router.delete("/:id", DepartmentController.deleteDepartment);

export default router;