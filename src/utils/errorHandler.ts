import { ValidationError } from "joi";

class ErrorHandler extends Error {
  statusCode: number;
  code?: number;
  path?: string;
  keyValue?: any;

  constructor(
    message: string,
    statusCode: number,
    code?: number,
    path?: string,
    keyValue?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.path = path;
    this.keyValue = keyValue;
    Error.captureStackTrace(this, this.constructor);
  }

  static fromValidationError(validationError: ValidationError) {
    const errorMessage = validationError.details.map((detail) => detail.message.replace(/"/g, '')).join(', ');
    return new ErrorHandler(errorMessage, 400);
  }
}

export default ErrorHandler;
