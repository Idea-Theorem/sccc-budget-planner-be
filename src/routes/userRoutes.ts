import { Router } from "express";
import UserController from "../controllers/UserController";
import { authenication } from "../middlewares/authentication";
import validation from "../middlewares/validation";
import { userSchema } from "../validators/user";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get("/", authenication.verify, authenication.isHR, UserController.fetchUsers);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user by ID
 *     description: Retrieve a user by their ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get("/:id", authenication.verify, authenication.isHR, UserController.getUserById);

/**
 * @swagger
 * /api/user:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     description: Creates a new user with the provided data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Invalid request
 */
router.post("/", authenication.verify, authenication.isHR, validation(userSchema.createUser), UserController.createUser);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: User login
 *     description: Authenticates the user and returns an access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/login", validation(userSchema.login), UserController.signin);

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update user by ID
 *     description: Updates a user with the provided ID and data
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 */
router.put("/:id", authenication.verify, authenication.isHR, validation(userSchema.createUser), UserController.updateUser);

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete user by ID
 *     description: Deletes a user with the provided ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/:id", authenication.verify, authenication.isHR, UserController.deleteUser);

export default router;