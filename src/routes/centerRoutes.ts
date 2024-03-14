import { Router } from "express";
import centerController from '../controllers/CenterController';

const router = Router();

// Define Swagger documentation for Center endpoints
/**
 * @swagger
 * tags:
 *   name: Centers
 *   description: API endpoints for managing centers
 */

/**
 * @swagger
 * /api/center:
 *   get:
 *     summary: Get all centers
 *     description: Retrieve a list of all centers
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Center'
 */
router.get('/', centerController.fetchCenters);

/**
 * @swagger
 * /api/center:
 *   post:
 *     summary: Create a new center
 *     description: Creates a new center with the provided data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Center'
 *     responses:
 *       200:
 *         description: Center created successfully
 *       400:
 *         description: Invalid request
 */
router.post('/', centerController.createCenter);

/**
 * @swagger
 * /api/center/{id}:
 *   get:
 *     summary: Get center by ID
 *     description: Retrieve a center by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Center ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Center'
 *       404:
 *         description: Center not found
 */
router.get('/:id', centerController.getCenterById);

/**
 * @swagger
 * /api/center/{id}:
 *   put:
 *     summary: Update center by ID
 *     description: Updates a center with the provided ID and data
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Center ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Center'
 *     responses:
 *       200:
 *         description: Center updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Center not found
 */
router.put('/:id', centerController.updateCenter);

/**
 * @swagger
 * /api/center/{id}:
 *   delete:
 *     summary: Delete center by ID
 *     description: Deletes a center with the provided ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Center ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Center deleted successfully
 *       404:
 *         description: Center not found
 */
router.delete('/:id', centerController.deleteCenter);

export default router;