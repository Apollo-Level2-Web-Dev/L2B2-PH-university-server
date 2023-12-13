import { z } from 'zod';

const createOfferedCourseValidationSchema = z.object({
  body: z.object({}),
});

const updateOfferedCourseValidationSchema = z.object({
  body: z.object({}),
});

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
