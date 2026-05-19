import { NextFunction, Request, Response } from "express";
import { getAuth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import { UnauthorizedException } from "../utils/app-error";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // TODO: Implement authentication logic
  const auth = await getAuth();

  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return new UnauthorizedException("Unauthorized,Please Sign in");
  }

  req.user = session.user;
  req.session = session;
  next();
};
