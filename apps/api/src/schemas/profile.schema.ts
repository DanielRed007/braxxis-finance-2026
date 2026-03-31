import { z } from 'zod';

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().optional().default(''),
  dateOfBirth: z.string().optional().default(''),
  country: z.string().optional().default(''),
  city: z.string().optional().default(''),
  address: z.string().optional().default(''),
  postalCode: z.string().optional().default(''),
  taxId: z.string().optional().default(''),
  employmentStatus: z.string().optional().default(''),
  employer: z.string().optional().default(''),
  jobTitle: z.string().optional().default(''),
  investmentExperience: z.string().optional().default(''),
  riskTolerance: z.string().optional().default(''),
  annualIncome: z.string().optional().default(''),
  netWorth: z.string().optional().default(''),
  investmentGoal: z.string().optional().default(''),
  sourceOfFunds: z.string().optional().default(''),
});

export type UpdateProfileBody = z.infer<typeof updateProfileSchema>;
