import { Router } from "express";
import PermissionController from "../controllers/PermissionController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Permissions
 *   description: API endpoints for managing permissions
 */

/**
 * @swagger
 * /api/permission:
 *   get:
 *     tags:
 *       - Permissions
 *     summary: Get all permissions
 *     description: Retrieve a list of all permissions
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 */
router.get("/", PermissionController.fetchPermissions);

/**
 * @swagger
 * /api/permission/{id}:
 *   get:
 *     tags:
 *       - Permissions
 *     summary: Get permission by ID
 *     description: Retrieve a permission by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Permission ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *       404:
 *         description: Permission not found
 */
router.get("/:id", PermissionController.getPermissionById);

export default router;