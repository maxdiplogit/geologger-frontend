import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useCreatePropertyMutation } from "../../../store/services/propertiesApiSlice";

// Interfaces
import { ErrorResponse } from "../userHooks/useLogin";


const useCreateProperty = () => {
    const [ createNewProperty, { isLoading, isError, data } ] = useCreatePropertyMutation();

    const createProperty = async (name: string, address: string, latitude: number, longitude: number, price: number) => {
        const res = await createNewProperty({ name, address, latitude, longitude, price });

        if ('error' in res) {
            const errorResponse = res.error as FetchBaseQueryError;
            
            if (errorResponse && 'data' in errorResponse && errorResponse.data) {
                const serverError = errorResponse.data as ErrorResponse;
                return serverError.message || 'CreateProperty failed. Please try again.';
            }

            return errorResponse.status ? errorResponse.status.toString() : 'CreateProperty failed. Please try again.';
        }

        return res;
    }

    return { createProperty, isLoading, isError, data };
};


export default useCreateProperty;