import { NextFunction, Request, Response } from "express";

const asyncErrorHandler =
  (asyncFunc: (req: Request, res: Response, next: NextFunction) => void) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(asyncFunc(req, res, next)).catch(next);
  };

export default asyncErrorHandler;
