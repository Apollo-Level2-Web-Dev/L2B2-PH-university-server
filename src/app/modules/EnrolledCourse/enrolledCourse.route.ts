import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { EnrolledCourseControllers } from './enrolledCourse.controller';
import { EnrolledCourseValidations } from './enrolledCourse.validation';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseControllers.createEnrolledCourse,
);

export const EnrolledCourseRoutes = router;
