import dotenv from 'dotenv';

dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL || 'https://parabank.parasoft.com/parabank/',
  headless: process.env.HEADLESS !== 'false',
  slowMo: Number(process.env.SLOW_MO) || 400,
  stepDelay: Number(process.env.STEP_DELAY) || 1000,
  fieldDelay: Number(process.env.FIELD_DELAY) || 500,
  defaultTimeout: 15_000,
  navigationTimeout: 30_000,
} as const;
