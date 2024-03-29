import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    status: false,
    errMsg: err.message,
  })
  next(err);
}