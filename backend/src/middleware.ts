import { NextFunction, Request, Response } from "express";
import { validateToken } from "./authgenerator";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      currentUser: string | JwtPayload;
    }
  }
}

export default (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  const userData = token && validateToken(token);

  if (userData) {
    req.currentUser = userData;
    next();
  } else {
    res.status(401).json("You need to be logged in to access this data");
  }
};
