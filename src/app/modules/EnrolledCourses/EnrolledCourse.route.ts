import express from 'express';
import { EnrolledCourseControllers } from './EnrolledCourses.controller';

const router = express.Router();

// router.post(
//   '/create-course',
//   // validateRequest(CourseValidations.createCourseValidationSchema),
//   EnrolledCourseControllers.createEnrolledCourse,
// );

router.post(
  '/enroll-into-course',
  EnrolledCourseControllers.enrollIntoCourse,
);
router.get('/:id', EnrolledCourseControllers.getSingleEnrolledCourse);

router.patch(
  '/:id',
  // validateRequest(CourseValidations.updateCourseValidationSchema),
  EnrolledCourseControllers.updateEnrolledCourseIntoDB,
);

router.get('/', EnrolledCourseControllers.getAllEnrolledCourses);

export const EnrolledCoursesRoutes = router;
