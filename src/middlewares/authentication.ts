import UserService from "../services/UserService";
import helpers from "../utils/helpers";
import { AuthRequest, User } from "../utils/types";
import asyncErrorHandler from "./asyncErrorHandler";
import ErrorHandler from '../utils/errorHandler';
const constants = require("../../config/constants");

const authenication = asyncErrorHandler(async (req: AuthRequest, res, next) => {
  const token = req.headers["authorization"];

  if (!token)
    return next(new ErrorHandler('User is not valid.', constants.RESPONSE_MESSAGES.UNAUTHORIZED));

  const isValid = token.toUpperCase().startsWith("BEARER");

  if (!isValid)
    return next(new ErrorHandler('Token is invalid.', constants.RESPONSE_MESSAGES.UNAUTHORIZED));

  const jwt = token.split(" ")[1];
  if (!jwt)
    return next(new ErrorHandler('Token is missing.', constants.RESPONSE_MESSAGES.UNAUTHORIZED));

  const payload = helpers.decodeJWT(jwt);
  if (!payload)
    return next(new ErrorHandler('You are unauthorized to access.', constants.RESPONSE_MESSAGES.UNAUTHORIZED));

  const user = (await UserService.getUserById(payload.id)) as User;

  req.user = user;

  next();
});

export default authenication;