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
  })
}
