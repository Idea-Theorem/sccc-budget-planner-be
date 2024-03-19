import { Router } from "express";
import centerController from '../controllers/CenterController';
import { authenication } from "../middlewares/authentication";
import validation from "../middlewares/validation";
import { centerSchema } from "../validators/center";

const router = Router();

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
 *     tags:
 *       - Centers
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
router.post('/', authenication.verify, authenication.isHR, validation(centerSchema.createCenter), centerController.createCenter);

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
router.get('/:id', authenication.verify, authenication.isHR, centerController.getCenterById);

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
router.put('/:id', authenication.verify, authenication.isHR, validation(centerSchema.createCenter), centerController.updateCenter);

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
router.delete('/:id', authenication.verify, authenication.isHR, centerController.deleteCenter);

export default router;