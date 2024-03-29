import { Router } from "express";
import ProgramController from "../controllers/ProgramController";
import { authenication } from "../middlewares/authentication";
import validation from "../middlewares/validation";
import { programSchema } from "../validators/program";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Programs
 *   description: API endpoints for managing programs
 */

/**
 * @swagger
 * /api/program:
 *   get:
 *     tags:
 *       - Programs
 *     summary: Get all programs
 *     description: Retrieve a list of all programs
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 */
router.get("/", authenication.verify, authenication.isHR, ProgramController.fetchPrograms);

/**
 * @swagger
 * /api/program/{id}:
 *   get:
 *     tags:
 *       - Programs
 *     summary: Get program by ID
 *     description: Retrieve a program by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Program ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       404:
 *         description: Program not found
 */
router.get("/:id", authenication.verify, authenication.isHR, ProgramController.getProgramById);

/**
 * @swagger
 * /api/program:
 *   post:
 *     tags:
 *       - Programs
 *     summary: Create a new program
 *     description: Creates a new program with the provided data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Program'
 *     responses:
 *       200:
 *         description: Program created successfully
 *       400:
 *         description: Invalid request
 */
router.post("/", authenication.verify, authenication.isHR, validation(programSchema.createProgram), ProgramController.createProgram);

/**
 * @swagger
 * /api/program/{id}:
 *   put:
 *     tags:
 *       - Programs
 *     summary: Update program by ID
 *     description: Updates a program with the provided ID and data
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Program ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Program'
 *     responses:
 *       200:
 *         description: Program updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Program not found
 */
router.put("/:id", authenication.verify, authenication.isHR, validation(programSchema.createProgram), ProgramController.updateProgram);

/**
 * @swagger
 * /api/program/{id}:
 *   delete:
 *     tags:
 *       - Programs
 *     summary: Delete program by ID
 *     description: Deletes a program with the provided ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Program ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Program deleted successfully
 *       404:
 *         description: Program not found
 */
router.delete("/:id", authenication.verify, authenication.isHR, ProgramController.deleteProgram);

export default router;