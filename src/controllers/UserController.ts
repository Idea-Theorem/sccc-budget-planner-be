import { Request, Response } from 'express';
import userService from '../services/UserService';
import helpers from "../utils/helpers";
import asyncErrorHandler from '../middlewares/asyncErrorHandler';
import { isValidUUID } from '../utils/uuidValidator';
import prisma from '../../config/prisma';
import DepartmentService from '../services/DepartmentService';

export default {
    fetchUsers: asyncErrorHandler(async (req: Request, res: Response) => {
        const { name } = req.params;
        try {
            const users = await userService.fetchUsers(name);
            return res.status(200).json({ users });
        } catch (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ message: error });
        }
    }),

    createUser: asyncErrorHandler(async (req: Request, res: Response) => {

        const data = req.body;
        const { email, password, roles } = data;
        try {
            // Check if the user already exists
            const user = await userService.checkEmail(email);
            if (user) {
                return res.status(409).json({ message: 'User already registered' });
            }

            // Validate role IDs
            const areValidRoleIds = roles.every(isValidUUID);
            if (!areValidRoleIds) {
                return res.status(400).json({ message: 'Invalid role IDs in the roles array' });
            }

            // Validate department ID
            // const isValidDepartmentId = isValidUUID(department_id);
            // if (!isValidDepartmentId) {
            //     return res.status(400).json({ message: 'Invalid department ID' });
            // }

            // Check if all role IDs exist
            const existingRoleIds = await prisma.role.findMany({
                where: {
                    id: {
                        in: roles,
                    },
                },
                select: {
                    id: true,
                },
            }).then((roles) => roles.map((role) => role.id));

            const missingRoleIds = roles.filter((roleId: string) => !existingRoleIds.includes(roleId));
            if (missingRoleIds.length > 0) {
                return res.status(400).json({ message: 'Role IDs do not exist', missingRoleIds });
            }

            // Check if the department exists
            // const existingDepartment = await DepartmentService.getDepartmentById(department_id);
            // if (!existingDepartment) {
            //     return res.status(400).json({ message: 'Department ID does not exist' });
            // }

            // Hash the password
            const hashedPassword = await helpers.hashPassword(password);

            // Create the user
            const createdUser = await userService.createUser({ ...data, password: hashedPassword });
            // Generate JWT token
            const token = helpers.encodeJWT(createdUser?.id);

            return res.status(200).json({ token, user: createdUser });
        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }),

    signin: asyncErrorHandler(async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const user = await userService.checkEmail(email);

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            const isValidPassword = await helpers.verifyPassword(password, user.password || '');

            if (!isValidPassword) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            const token = helpers.encodeJWT(user.id);

            return res.status(200).json({ token, user });
        } catch (error) {
            console.error('Error signing in user:', error);
            return res.status(500).json({ message: 'An error occurred while signing in' });
        }
    }),

    getUserById: asyncErrorHandler(async (req: Request, res: Response) => {
        const userId = req.params.id;
        try {
            const user = await userService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json({ user });
        } catch (error) {
            console.error('Error fetching user by id:', error);
            return res.status(500).json({ message: error });
        }
    }),

    updateUser: asyncErrorHandler(async (req: Request, res: Response) => {
        const userId = req.params.id;
        const { email, roles, department_id } = req.body;

        // Check if the user already exists
        const user = await userService.checkEmail(email);
        if (user && user.id !== userId) {
            return res.status(409).json({ message: 'Email already exist' });
        }

        // Check if role IDs are valid UUIDs
        const areValidRoleIds = roles.every(isValidUUID);
        if (!areValidRoleIds) {
            return res.status(400).json({ message: 'Invalid role IDs in the roles array' });
        }

        // Validate department ID
        const isValidDepartmentId = isValidUUID(department_id);
        if (!isValidDepartmentId) {
            return res.status(400).json({ message: 'Invalid department ID' });
        }

        try {
            // Check if all role IDs exist
            const existingRoleIds = await prisma.role.findMany({
                where: {
                    id: {
                        in: roles,
                    },
                },
                select: {
                    id: true,
                },
            }).then((roles) => roles.map((role) => role.id));

            const missingRoleIds = roles.filter((roleId: string) => !existingRoleIds.includes(roleId));
            if (missingRoleIds.length > 0) {
                return res.status(400).json({ message: 'Role IDs do not exist', missingRoleIds });
            }

            // Check if the department exists
            const existingDepartment = await DepartmentService.getDepartmentById(department_id);
            if (!existingDepartment) {
                return res.status(400).json({ message: 'Department ID does not exist' });
            }

            // Update the user
            await userService.updateUser(userId, req.body);

            return res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            console.error('Error updating user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }),

    deleteUser: asyncErrorHandler(async (req: Request, res: Response) => {
        const userId = req.params.id;
        try {
            await userService.deleteUser(userId);
            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({ message: error });
        }
    })
}
