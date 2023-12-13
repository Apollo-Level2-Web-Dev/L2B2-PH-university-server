import express from 'express';
import { OfferedCourseControllers } from './OfferedCourse.controller';

const router = express.Router();

router.get('/', OfferedCourseControllers.getAllOfferedCourses);
router.get('/:id', OfferedCourseControllers.getSingleOfferedCourses);

router.post(
  '/create-offered-course',
  OfferedCourseControllers.createOfferedCourse,
);

router.patch('/:id', OfferedCourseControllers.updateOfferedCourse);

router.delete(
  '/:id',

  OfferedCourseControllers.deleteOfferedCourseFromDB,
);

export const offeredCourseRoutes = router;
