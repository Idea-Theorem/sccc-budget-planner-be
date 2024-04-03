import { Router } from "express";
import DashboardController from "../controllers/DashboardController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Dashboards
 *   description: API endpoints for managing dashboards
 */

/**
 * @swagger
 * /api/dashboard/departmentsCount:
 *   get:
 *     tags:
 *       - Dashboards
 *     summary: Get department counts for dashboards
 *     description: Retrieve the count of all departments and departments with approved programs
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 departmentsCount:
 *                   type: integer
 *                   description: Count of all departments
 *                 departmentsWithApprovedPrograms:
 *                   type: integer
 *                   description: Count of departments with all approved programs
 */
router.get("/departmentsCount", DashboardController.fetchDepartmentsCount);

/**
 * @swagger
 * /api/dashboard/programsCount:
 *   get:
 *     tags:
 *       - Dashboards
 *     summary: Get program counts for dashboards
 *     description: Retrieve the count of all programs and programs with approved programs
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 programsCount:
 *                   type: integer
 *                   description: Count of all programs
 *                 approvedProgramsCount:
 *                   type: integer
 *                   description: Count of programs with all approved programs
 */
router.get("/programsCount", DashboardController.fetchProgramsCount);

export default router;