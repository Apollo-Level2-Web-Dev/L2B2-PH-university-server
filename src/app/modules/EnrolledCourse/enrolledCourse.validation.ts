import { z } from 'zod';

const createEnrolledCourseValidationZodSchema = z.object({
  body: z.object({
    student: z.string(),
    offeredCourse: z.string(),
  }),
});

const updateStudentEnrolledCourseMarkValidationZodSchema = z.object({
  body: z.object({
    student: z.string(),
    semesterRegistration: z.string(),
    offeredCourse: z.string(),
    courseMarks: z
      .object({
        classTest1: z.number().optional(),
        midTerm: z.number().optional(),
        classTest2: z.number().optional(),
        finalTerm: z.number().optional(),
      })
      .optional(),
  }),
});

export const EnrolledCourseValidations = {
  createEnrolledCourseValidationZodSchema,
  updateStudentEnrolledCourseMarkValidationZodSchema,
};
