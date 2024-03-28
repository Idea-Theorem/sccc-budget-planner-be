import UserService from "../services/UserService";
import helpers from "../utils/helpers";
import { AuthRequest, User } from "../utils/types";
import asyncErrorHandler from "./asyncErrorHandler";
import ErrorHandler from '../utils/errorHandler';
import { RESPONSE_MESSAGES, USER_ROLES } from "../../config/constants";
import prisma from '../../config/prisma';

export const authenication = {
  verify: asyncErrorHandler(async (req: AuthRequest, res, next) => {
    const token = req.headers["authorization"];

    if (!token)
      return next(new ErrorHandler('User is not valid.', RESPONSE_MESSAGES.UNAUTHORIZED));

    const isValid = token.toUpperCase().startsWith("BEARER");

    if (!isValid)
      return next(new ErrorHandler('Token is invalid.', RESPONSE_MESSAGES.UNAUTHORIZED));

    const jwt = token.split(" ")[1];
    if (!jwt)
      return next(new ErrorHandler('Token is missing.', RESPONSE_MESSAGES.UNAUTHORIZED));

    const payload = helpers.decodeJWT(jwt);
    if (!payload)
      return next(new ErrorHandler('You are unauthorized to access.', RESPONSE_MESSAGES.UNAUTHORIZED));

    const user = (await UserService.getUserById(payload)) as User;

    req.user = user;

    next();
  }),
  isHR: asyncErrorHandler(async (req: AuthRequest, res, next) => {
    const userId = req.user?.id;
    if (userId) {
      const userRoles = await prisma.userRole.findMany({
        where: {
          user_id: userId,
        },
        include: {
          role: true,
        },
      });
      const hrRole = userRoles.find(userRole => userRole.role.name === USER_ROLES.HR);
      if (hrRole) {
        return next();
      }
    }
    return next(new ErrorHandler('You are not authorized to perform this operation.', RESPONSE_MESSAGES.UNAUTHORIZED));
  }),
  isAdmin: asyncErrorHandler(async (req: AuthRequest, res, next) => {
    const userId = req.user?.id;
    if (userId) {
      const userRoles = await prisma.userRole.findMany({
        where: {
          user_id: userId,
        },
        include: {
          role: true,
        },
      });
      const hrRole = userRoles.find(userRole => userRole.role.name === USER_ROLES.ADMIN);
      if (hrRole) {
        return next();
      }
    }
    return next(new ErrorHandler('You are not authorized to perform this operation.', RESPONSE_MESSAGES.UNAUTHORIZED));
  }),
  isSuperAdmin: asyncErrorHandler(async (req: AuthRequest, res, next) => {
    const userId = req.user?.id;
    if (userId) {
      const userRoles = await prisma.userRole.findMany({
        where: {
          user_id: userId,
        },
        include: {
          role: true,
        },
      });
      const hrRole = userRoles.find(userRole => userRole.role.name === USER_ROLES.SUPER_ADMIN);
      if (hrRole) {
        return next();
      }
    }
    return next(new ErrorHandler('You are not authorized to perform this operation.', RESPONSE_MESSAGES.UNAUTHORIZED));
  }),
  isProgramHead: asyncErrorHandler(async (req: AuthRequest, res, next) => {
    const userId = req.user?.id;
    if (userId) {
      const userRoles = await prisma.userRole.findMany({
        where: {
          user_id: userId,
        },
        include: {
          role: true,
        },
      });
      const hrRole = userRoles.find(userRole => userRole.role.name === USER_ROLES.PROGRAM_HEAD);
      if (hrRole) {
        return next();
      }
    }
    return next(new ErrorHandler('You are not authorized to perform this operation.', RESPONSE_MESSAGES.UNAUTHORIZED));
  }),
  isDepartmentHead: asyncErrorHandler(async (req: AuthRequest, res, next) => {
    const userId = req.user?.id;
    if (userId) {
      const userRoles = await prisma.userRole.findMany({
        where: {
          user_id: userId,
        },
        include: {
          role: true,
        },
      });
      const hrRole = userRoles.find(userRole => userRole.role.name === USER_ROLES.DEPARTMENT_HEAD);
      if (hrRole) {
        return next();
      }
    }
    return next(new ErrorHandler('You are not authorized to perform this operation.', RESPONSE_MESSAGES.UNAUTHORIZED));
  }),
  hasPermission: asyncErrorHandler(async (req: AuthRequest, res, next) => {
    const userId = req.user?.id;
    if (!userId) {
      return next(new ErrorHandler('User not found.', RESPONSE_MESSAGES.UNAUTHORIZED));
    }

    try {
      // Fetch all role IDs associated with the user
      const userRoleIds = await prisma.userRole.findMany({
        where: {
          user_id: userId,
        },
        select: {
          role_id: true,
        },
      });
      console.log("userRoleIds: ===>000", userRoleIds)

      // Extract the role IDs into an array for easier comparison
      const userRoleIdsSet = userRoleIds.map(({ role_id }) => role_id);
      console.log("userRoleIdsSet: ===>111", userRoleIdsSet)

      // Fetch all permissions associated with the userRoleIdsSet
      const rolePermissions = await prisma.role.findMany({
        where: {
          id: {
            in: userRoleIdsSet,
          },
        },
        select: {
          permissions: {
            select: {
              permission_id: true
            }
          },
        },
      });
      console.log("rolePermissions: ===>222", rolePermissions)

      // Extract the permission IDs and remove duplicates
      const permissionIdsSet = new Set(rolePermissions.flatMap(role => role.permissions.map(permission => permission.permission_id)));
      const permissionIds = [...permissionIdsSet];
      console.log("permissionIds: ===>333", permissionIds);

      // Check if any of the user's roles have the required permissions
      const hasPermission = permissionIds.some(permissionId => userRoleIdsSet.includes(permissionId));
      console.log("hasPermission: ===>444", hasPermission)

      if (hasPermission) {
        return next();
      } else {
        return next(new ErrorHandler('You are not authorized to perform this operation.', RESPONSE_MESSAGES.UNAUTHORIZED));
      }
    } catch (error) {
      console.error('Error fetching permissions:', error);
      return next(new ErrorHandler('An error occurred while fetching permissions.', RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR));
    }
  })
}
