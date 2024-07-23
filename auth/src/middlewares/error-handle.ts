import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../error/request-validation-error";
import { DatabaseConnectionError } from "../error/database-connection-error";

export const errorHandle = (
  err: Error, 
  req: Request, 
  res: Response,
  next: NextFunction,
  ) => {
    if (err instanceof RequestValidationError){
      console.log('handling this error as a request valiadation error');
    }

    if (err instanceof DatabaseConnectionError){
      console.log('handling this error as a db connecting error');
    }

    res.status(400).send({
      message: err.message
  });
}