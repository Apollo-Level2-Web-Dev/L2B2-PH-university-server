import { z } from 'zod';

const userValidationSchema = z.object({
  id: z.string(),
  pasword: z
    .string()
    .max(20, { message: 'Password can not be more than 20 characters' }),
  needsPasswordChange: z.boolean().optional().default(true),
  role: z.enum(['student', 'faculty', 'admin']),
  status: z.enum(['in-progress', 'blocked']).default('in-progress'),
  isDeleted: z.boolean().optional().default(false),
});

export const UserValidation = {
  userValidationSchema,
};
