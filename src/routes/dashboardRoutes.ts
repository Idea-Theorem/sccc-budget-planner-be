import { Router } from "express";
import DashboardController from "../controllers/DashboardController";
import helpers from "../utils/helpers";

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
 *     summary: Get departments count for dashboards
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
 *                 approvedCount:
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
 *     summary: Get programs count for dashboards
 *     description: Retrieve the count of all programs and approved programs
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
 *                 approvedCount:
 *                   type: integer
 *                   description: Count of all approved programs
 */
router.get("/programsCount", DashboardController.fetchProgramsCount);

/**
 * @swagger
 * /api/dashboard/centersCount:
 *   get:
 *     tags:
 *       - Dashboards
 *     summary: Get centers count for dashboards
 *     description: Retrieve the count of all centers and centers with approved departments
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 centersCount:
 *                   type: integer
 *                   description: Count of all centers
 *                 approvedCount:
 *                   type: integer
 *                   description: Count of centers with all approved departments
 */
router.get("/centersCount", DashboardController.fetchCentersCount);
router.post("/budget", DashboardController.addTotalBudget);
router.get("/budget/:id", DashboardController.fetchTotalBudget);
router.put("/budget/:id", DashboardController.updateTotalBudget);
router.post(
  "/budget-super-admin",
  DashboardController.addSuperAdminTotalBudget
);
router.get(
  "/budget-super-admin/:id",
  DashboardController.fetchSuperAdminTotalBudget
);
router.put(
  "/budget-super-admin/:id",
  DashboardController.updateSuperAdminTotalBudget
);
router.get("/record", DashboardController.fetchAllRecord);
router.get("/history", helpers.updateApprovedProgramsToExpired);

export default router;
