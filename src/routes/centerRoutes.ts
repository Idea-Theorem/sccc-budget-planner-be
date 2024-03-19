import { Router } from "express";
import centerController from '../controllers/CenterController';
import { roleValidator } from "../validators/middlewares/role";
import { authenication } from "../middlewares/authentication";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Centers
 *   description: API endpoints for managing centers
 *   security:
 *     - bearerAuth: []
 */

/**
 * @swagger
 * /api/center:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Centers
 *     summary: Get all centers
 *     description: Retrieve a list of all centers
 *     responses:
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Center'
 */
router.get('/', authenication.verify, authenication.isHR, centerController.fetchCenters);

/**
 * @swagger
 * /api/center:
 *   post:
 *     tags:
 *       - Centers
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
router.post('/', roleValidator.createRole, centerController.createCenter);

/**
 * @swagger
 * /api/center/{id}:
 *   get:
 *     tags:
 *       - Centers
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
 *     tags:
 *       - Centers
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
router.put('/:id', roleValidator.createRole, centerController.updateCenter);

/**
 * @swagger
 * /api/center/{id}:
 *   delete:
 *     tags:
 *       - Centers
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