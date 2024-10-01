import { z } from 'zod';


export const propertySchema = z.object({
    name: z.string().nonempty('Property name is required'),
    address: z.string().nonempty('Address is required'),
    latitude: z.number().min(-90).max(90, 'Latitude must be between -90 and 90'),
    longitude: z.number().min(-180).max(180, 'Longitude must be between -180 and 180'),
    price: z.number().max(100000000).positive('Price must be a positive number'),
});