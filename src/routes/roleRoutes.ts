import { Router } from "express";
import RoleController from "../controllers/RoleController";
import validation from "../middlewares/validation";
import { roleSchema } from "../validators/role";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: API endpoints for managing roles
 */

/**
 * @swagger
 * /api/role:
 *   get:
 *     tags:
 *       - Roles
 *     summary: Get all roles
 *     description: Retrieve a list of all roles
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 */
router.get("/", RoleController.fetchRoles);

/**
 * @swagger
 * /api/role/{id}:
 *   get:
 *     tags:
 *       - Roles
 *     summary: Get role by ID
 *     description: Retrieve a role by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Role ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Role not found
 */
router.get("/employee-role", RoleController.fetchEmployeeRole);
router.post("/employee-role", validation(roleSchema.createRole), RoleController.createEmployeeRole);
router.put("/employee-role/:id", validation(roleSchema.createRole), RoleController.updateEmployeeRole);
router.delete("/employee-role/:id", RoleController.deleteEmployeeRole);
router.get("/:id", RoleController.getRoleById);


export default router;