import { Request, Response, NextFunction } from "express";
import asyncErrorHandler from "./asyncErrorHandler";
import { Schema } from "joi";

const validation = (
  schema: Schema,
  objectType: "body" | "params" | "query" = "body"
) => {
  return asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const data = req[objectType];
    await schema.validateAsync(data, { abortEarly: false });
    next();
  });
};

export default validation;
