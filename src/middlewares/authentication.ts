import UserService from "../services/UserService";
import helpers from "../utils/helpers";
import { AuthRequest, User } from "../utils/types";
import asyncErrorHandler from "./asyncErrorHandler";
import ErrorHandler from '../utils/errorHandler';
import roleService from "../services/RoleService";
import { USER_ROLES, RESPONSE_MESSAGES } from "../../config/constants";

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
    const user = req.user;
    if (user) {
      const role = await roleService.getRoleById(user.role_id as string);
      if (role?.name === USER_ROLES.HR) {
        return next();
      }
    }
    return next(new ErrorHandler('You are not authorized to perform this operation.', RESPONSE_MESSAGES.UNAUTHORIZED));
  })
}
