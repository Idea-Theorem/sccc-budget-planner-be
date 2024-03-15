import { Request, Response, NextFunction, RequestHandler } from 'express';
import prisma from '../../config/prisma';
import asyncErrorHandler from './asyncErrorHandler';
import ErrorHandler from '../utils/errorHandler';
const constants = require("../../config/constants");
const helpers = require("../utils/helpers");
import { AuthRequest, User } from "../utils/types";

const authentication = {
  verify: asyncErrorHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;
    if (bearer) {
      const isValid = bearer.startsWith('Bearer');
      if (isValid) {
        const token = bearer.split(' ')[1];
        const payload = helpers.decodeJWT(token);
        const user = await prisma.user.findUnique({ where: { id: payload.id }, include: { role: true } });
        if (user) {
          req.user = user as User;
          return next();
        } else {
          return next(new ErrorHandler('User is not valid.', 401));
        }
      } else {
        return next(new ErrorHandler('Token is invalid.', 401));
      }
    } else {
      return next(new ErrorHandler('Token is missing.', 401));
    }
  }) as RequestHandler,
  // isHR: asyncErrorHandler((req: AuthRequest, res: Response, next: NextFunction) => {
  //   const user = req.user;
  //   if (user?.role?.name === constants.USER_ROLES.ADMIN) {
  //     return next();
  //   } else {
  //     return next(new ErrorHandler('You are not authorized to access this resource.', 401));
  //   }
  // }) as RequestHandler,
  // isSuperAdmin: asyncErrorHandler((req: AuthRequest, res: Response, next: NextFunction) => {
  //   const user = req.user;
  //   if (user?.role?.name !== constants.USER_ROLES.USER) {
  //     return next();
  //   } else {
  //     return next(new ErrorHandler('You are not authorized to access this resource.', 401));
  //   }
  // }) as RequestHandler,
};

export default authentication;