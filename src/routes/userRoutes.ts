import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

router.get("/", UserController.fetchUsers);
router.get("/:id", UserController.getUserById);
router.post("/", UserController.createUser);
router.post("/login", UserController.signin);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export default router;