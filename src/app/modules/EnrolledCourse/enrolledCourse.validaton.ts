import { z } from 'zod';

const createEnrolledCourseValidationZodSchema = z.object({
  body: z.object({}),
});

export const EnrolledCourseValidations = {
  createEnrolledCourseValidationZodSchema,
};
