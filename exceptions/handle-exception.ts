import { NextFunction } from "express";
import HttpException from "./http.exception";

export default class ErrorHandling {
  static handle(next: NextFunction, error: any): void {
    const exception = new HttpException(error.status, error.message);
    next(exception);
  }
}