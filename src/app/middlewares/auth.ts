import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';

const USER_ROLE = {
  STUDENT: 'STUDENT',
  ADMIN: 'ADMIN',
  FACULTY: 'FACULTY',
} as const;

type TUSER_ROLE = keyof typeof USER_ROLE;

// interface CustomRequest extends Request {
//   user: JwtPayload;
// }

const auth = (...requiredRoles: TUSER_ROLE[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get authorization token
      const token = req.headers.authorization;

      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      let verifiedUser = null;

      verifiedUser = jwt.verify(
        token,
        config.jwt_secret as string,
      ) as JwtPayload;

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new AppError(httpStatus.FORBIDDEN, 'Forbidden');
      }

      req.user = verifiedUser;
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;

auth(USER_ROLE.ADMIN);
