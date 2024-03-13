import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import { INTERNAL_ERROR } from "../utils/responses";
const constants = require("../../config/constants");

const error = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || constants.INTERNAL_SERVER_ERROR;
  err.message = err.message || "INTERNAL SERVER ERROR";

  /** ------- FOR JWT TOKEN ------ **/

  /** HANDLING WRONG TOKEN **/
  if (err.name == "JsonWebTokenError") {
    const message = `Json web token is invalid, try again`;
    err = new ErrorHandler(message, constants.UNAUTHORIZED);
  }

  /** HANDLING EXPIRED TOKEN **/
  if (err.name == "TokenExpiredError") {
    const message = `Json web token has expired, try again`;
    err = new ErrorHandler(message, constants.UNAUTHORIZED);
  }

  /** ---------------------------- **/

  return INTERNAL_ERROR(res, err.statusCode, null, err.message);
};

export default error;