import { Router } from "express";
import DepartmentController from "../controllers/DepartmentController";

const router = Router();

// Define Swagger documentation for Department endpoints
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
router.get("/", DepartmentController.fetchDepartments);

/**
 * @swagger
 * /api/department/{id}:
 *   get:
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
router.get("/:id", DepartmentController.getDepartmentById);

/**
 * @swagger
 * /api/department:
 *   post:
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
router.post("/", DepartmentController.createDepartment);

/**
 * @swagger
 * /api/department/{id}:
 *   put:
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
router.put("/:id", DepartmentController.updateDepartment);

/**
 * @swagger
 * /api/department/{id}:
 *   delete:
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
router.delete("/:id", DepartmentController.deleteDepartment);

export default router;