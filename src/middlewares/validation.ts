import { Schema, ValidationResult } from "joi";
import asyncErrorHandler from "./asyncErrorHandler";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
const constants = require("../../config/constants");

const validation = (
  schema: Schema,
  object: "body" | "params" | "query" = "body"
) => {
  return asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const value: ValidationResult = await schema.validateAsync(req[object]);

      if (value.error) {
        return next(new ErrorHandler(value.error.details[0].message, constants.ERROR));
      }

      next();
    }
  );
};

export default validation;
