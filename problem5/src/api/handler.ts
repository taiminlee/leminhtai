import { NextFunction, Request, Response, Router } from "express";

export function errorHandler(router: Router): Response | void {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).json({
      status: 500,
      message: err.message || err,
    });
  });
}
