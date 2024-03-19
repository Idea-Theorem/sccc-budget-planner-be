import { Router } from "express";
import DepartmentController from "../controllers/DepartmentController";
import { authenication } from "../middlewares/authentication";
import validation from "../middlewares/validation";
import { departmentSchema } from "../validators/department";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: API endpoints for managing departments
 */

/**
 * @swagger
 * /api/department:
 *   get:
 *     tags:
 *       - Departments
 *     summary: Get all departments
 *     description: Retrieve a list of all departments
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Department'
 */
router.get("/", authenication.verify, authenication.isHR, DepartmentController.fetchDepartments);

/**
 * @swagger
 * /api/department/{id}:
 *   get:
 *     tags:
 *       - Departments
 *     summary: Get department by ID
 *     description: Retrieve a department by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Department ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Department'
 *       404:
 *         description: Department not found
 */
router.get("/:id", authenication.verify, authenication.isHR, DepartmentController.getDepartmentById);

/**
 * @swagger
 * /api/department:
 *   post:
 *     tags:
 *       - Departments
 *     summary: Create a new department
 *     description: Creates a new department with the provided data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Department'
 *     responses:
 *       200:
 *         description: Department created successfully
 *       400:
 *         description: Invalid request
 */
router.post("/", authenication.verify, authenication.isHR, validation(departmentSchema.createDepartment), DepartmentController.createDepartment);

/**
 * @swagger
 * /api/department/{id}:
 *   put:
 *     tags:
 *       - Departments
 *     summary: Update department by ID
 *     description: Updates a department with the provided ID and data
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Department ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Department'
 *     responses:
 *       200:
 *         description: Department updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Department not found
 */
router.put("/:id", authenication.verify, authenication.isHR, validation(departmentSchema.createDepartment), DepartmentController.updateDepartment);

/**
 * @swagger
 * /api/department/{id}:
 *   delete:
 *     tags:
 *       - Departments
 *     summary: Delete department by ID
 *     description: Deletes a department with the provided ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Department ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Department deleted successfully
 *       404:
 *         description: Department not found
 */
router.delete("/:id", authenication.verify, authenication.isHR, DepartmentController.deleteDepartment);

export default router;