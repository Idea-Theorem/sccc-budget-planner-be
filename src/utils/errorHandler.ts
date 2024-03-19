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
}

export default ErrorHandler;
