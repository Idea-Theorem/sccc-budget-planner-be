import { Response } from "express";
import { RESPONSE_MESSAGES } from "../../config/constants";
import ErrorHandler from "./errorHandler";

export const OK = <T>(res: Response, result: T, message: string) => {
  return res.status(RESPONSE_MESSAGES.OK).json({ success: true, result, message });
};

export const ERROR = <T>(res: Response, result: T | null, message: string) => {
  return res.status(RESPONSE_MESSAGES.OK).json({ success: false, result, message });
};

export const INTERNAL_ERROR = <T>(
  res: Response,
  responseCode: number,
  result: T | null,
  message: string,
  error?: ErrorHandler
) => {
  return res
    .status(responseCode)
    .json({ success: false, result, message, error: error || null });
};
