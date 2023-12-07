import express from 'express';
import { OfferedCourseController } from './OfferedCourses.controller';

const router = express.Router();

router.get('/', OfferedCourseController.getAllFromDB);
router.get('/:id', OfferedCourseController.getByIdFromDB);

router.post(
  '/',

  OfferedCourseController.insertIntoDB,
);

router.patch(
  '/:id',

  OfferedCourseController.updateOneInDB,
);

router.delete(
  '/:id',

  OfferedCourseController.deleteByIdFromDB,
);

export const offeredCourseRoutes = router;
