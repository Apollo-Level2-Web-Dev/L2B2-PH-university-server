import express, { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { studentValidationSchema } from '../student/student.validation';
import { UserControllers } from './user.controller';

const router = express.Router();

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // validation check
      //if everything allright next() ->
      await schema.parseAsync({
        body: req.body,
      });

      next();
    } catch (err) {
      next(err);
    }
  };
};

router.post(
  '/create-student',
  validateRequest(studentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
