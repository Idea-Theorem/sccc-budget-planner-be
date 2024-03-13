import { Request, Response } from 'express';
import userService from '../services/UserService';
import helpers from "../utils/helpers";

export default {
    fetchUsers: async (req: Request, res: Response) => {
        try {
            const users = await userService.fetchUsers();
            return res.status(200).json({ users });
        } catch (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    createUser: async (req: Request, res: Response) => {
        const data = req.body;
        const { email, password } = data;

        const user = await userService.checkEmail(email);

        if (user) {
            return res.status(409).json({ message: 'User already registered' });
        }

        try {
            const hashedPassword = await helpers.hashPassword(password);

            // Get the role ID based on the role name
            // const role = await prisma.role.findUnique({ where: { name: roleName } });

            const payload = {
                ...data,
                password: hashedPassword
            }
            const createdUser = await userService.createUser(payload);

            const token = helpers.encodeJWT(createdUser?.id);

            return res.status(200).json({ token, user: createdUser });
        } catch (error) {
            console.error('Error signing up user:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    signin: async (req: Request, res: Response) => {
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
    },

    getUserById: async (req: Request, res: Response) => {
        const userId = req.params.id;
        try {
            const user = await userService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json({ user });
        } catch (error) {
            console.error('Error fetching user by id:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    updateUser: async (req: Request, res: Response) => {
        const userId = req.params.id;
        const { name, email, password } = req.body;
        try {
            await userService.updateUser(userId, name, email, password);
            return res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            console.error('Error updating user:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    deleteUser: async (req: Request, res: Response) => {
        const userId = req.params.id;
        try {
            await userService.deleteUser(userId);
            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
