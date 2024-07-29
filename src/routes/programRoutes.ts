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
router.put(
  "/resolve/:id",
  authenication.verify,
  ProgramController.updateCommentstatus
);
/**
 * @swagger
 * /api/program:
 *   get:
 *     tags:
 *       - Programs
 *     summary: Get all programs or search by status or name
 *     description: Retrieve a list of all programs or search by status or name
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *           enum: [PENDING, REJECTED, APPROVED, DRAFTED]
 *         description: Optional status parameter to filter programs by status
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *         description: Optional name parameter to search programs by name
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 */
router.get("/", authenication.verify, ProgramController.fetchPrograms);

/**
 * @swagger
 * /api/program/byId/{id}:
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
router.get("/byId/:id", authenication.verify, ProgramController.getProgramById);

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
router.post(
  "/",
  authenication.verify,
  validation(programSchema.createProgram),
  ProgramController.createProgram
);

/**
 * @swagger
 * /api/program/updateStatus:
 *   put:
 *     tags:
 *       - Programs
 *     summary: Update programs status by IDs
 *     description: Updates the status of programs with the provided IDs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProgram'
 *     responses:
 *       200:
 *         description: Programs updated successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */

router.put(
  "/updateStatus",
  authenication.verify,
  validation(programSchema.updateProgramStatus),
  ProgramController.updateProgramStatus
);

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
router.put(
  "/:id",
  authenication.verify,
  validation(programSchema.updateProgram),
  ProgramController.updateProgram
);

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
router.delete("/:id", authenication.verify, ProgramController.deleteProgram);
router.post(
  "/comments",
  authenication.verify,
  ProgramController.commentsInPrograms
);
router.get("/comments", authenication.verify, ProgramController.fetchcomments);
router.delete(
  "/comment/:id",
  authenication.verify,
  ProgramController.deletecomment
);
router.put(
  "/comment/:id",
  authenication.verify,
  ProgramController.updateComment
);

router.get(
  "/fetchProgramByUser",
  authenication.verify,
  ProgramController.fetchProgramsByUser
);
router.get(
  "/all-programs",
  authenication.verify,
  ProgramController.fetchAllPrograms
);

export default router;
