import express from 'express';
import { SemesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();

router.get('/:id', SemesterRegistrationController.getByIdFromDB);

router.post(
  '/',

  SemesterRegistrationController.insertIntoDB,
);

router.patch(
  '/:id',

  SemesterRegistrationController.updateOneInDB,
);

router.delete(
  '/:id',

  SemesterRegistrationController.deleteByIdFromDB,
);

// router.post(
//   '/:id/start-new-semester',
//   SemesterRegistrationController.startNewSemester,
// );

export const semesterRegistrationRoutes = router;
