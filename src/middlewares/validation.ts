import { Schema, ValidationResult } from "joi";
import asyncErrorHandler from "./asyncErrorHandler";
import { NextFunction, Request, Response } from "express";
import { RESPONSE_MESSAGES } from "../../config/constants";

const validation = (
  schema: Schema,
  object: "body" | "params" | "query" = "body"
) => {
  return asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const value: ValidationResult = await schema.validateAsync(req[object], { abortEarly: false });

        if (value.error) {
          const errorMessage = value.error.details.map((detail) => detail.message.replace(/"/g, '')).join(', ');
          return res.status(RESPONSE_MESSAGES.ERROR).json({ error: errorMessage });
        }

        next();
      } catch (error) {
        next(error);
      }
    }
  );
};

export default validation;
