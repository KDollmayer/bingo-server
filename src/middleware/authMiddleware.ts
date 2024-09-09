import { Request, Response, NextFunction } from "express";
import { createError } from "./errorMiddleware";
import { findUser, createUser } from "../service/users";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(createError(401, "No Token Provided"));
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(createError(401, "Invalid token format"));
  }

  try {
    let userData = await findUser(token);

    if (!userData) {
      userData = await createUser(token);
    }
    if (userData && typeof userData === "object") {
      req.user = userData;
    } else {
      return next(createError(401, "User authentication failed"));
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
