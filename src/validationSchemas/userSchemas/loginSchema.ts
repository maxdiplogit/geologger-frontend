import { z } from 'zod';


export const loginSchema = z.object({
    email: z.string().email('Invalid email format').nonempty('Email is required'),
    password: z.string().min(4, 'Password must be at least 4 characters').nonempty('Password is required'),
});