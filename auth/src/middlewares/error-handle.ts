import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../error/request-validation-error";
import { DatabaseConnectionError } from "../error/database-connection-error";

export const errorHandle = (
  err: Error, 
  req: Request, 
  res: Response,
  next: NextFunction,
  ) => {
    if (err instanceof RequestValidationError) {
      return res.status(err.statuscode).send({ errors: err.serializeErrors() });
    }
    if (err instanceof DatabaseConnectionError) {
      return res.status(err.statuscode).send({ errors: err.serializeErrors() });
    }
  
    res.status(400).send({
      errors: [{ message: 'Something went wrong' }],
    });
}