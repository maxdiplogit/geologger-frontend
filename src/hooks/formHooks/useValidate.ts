import { useState } from 'react';
import { ZodError, ZodSchema } from 'zod';

interface UseValidateProps<T> {
    schema: ZodSchema<T>; // Zod schema for validation
    initialValues: T; // Initial form values
    onFormSubmit: (values: T) => void; // Submission handler
}


const useValidate = <T>({ schema, initialValues, onFormSubmit }: UseValidateProps<T>) => {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        let parsedValue: string | number = value;
        if (type === 'number') {
            parsedValue = value === '' ? '' : Number(value); // Convert non-empty strings to numbers
        }

        setValues((prev) => ({
            ...prev,
            [name]: parsedValue,
        }));
        
        // Clear the error for this field when the user starts typing
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            // Validate the values against the schema
            console.log(values);
            schema.parse(values);
            // If valid, call the submit handler
            onFormSubmit(values);
        } catch (error) {
            if (error instanceof ZodError) {
                const fieldErrors = error.errors.reduce((acc, curr) => {
                    const fieldName = curr.path[0] as keyof T; // Get the field name from the error path
                    acc[fieldName] = curr.message; // Set the error message
                    return acc;
                }, {} as Partial<Record<keyof T, string>>);
                
                setErrors(fieldErrors); // Update the errors state
            }
        }
    };

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
    };
};


export default useValidate;