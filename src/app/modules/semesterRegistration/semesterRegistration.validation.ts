import { z } from 'zod';

const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(), // Assuming ObjectId is stored as a UUID string
    status: z.enum(['UPCOMING', 'ONGOING', 'ENDED']),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number().min(3).optional(),
    maxCredit: z.number().max(20).optional(),
  }),
});

export const SemesterRegistrationValidations = {
  createSemesterRegistrationValidationSchema,
};
