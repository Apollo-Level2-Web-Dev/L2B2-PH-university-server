import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentControllers } from './student.controller';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);

router.get('/:facultyId', StudentControllers.getSingleStudent);

router.patch(
  '/:facultyId',
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete('/:facultyId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
