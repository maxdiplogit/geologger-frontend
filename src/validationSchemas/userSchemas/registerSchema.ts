import { z } from 'zod';


export const registerSchema = z.object({
    email: z.string().email('Invalid email format').nonempty('Email is required'),
    password: z.string().min(4, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(4, 'Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // path to the error
});