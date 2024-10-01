import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useBuyPropertyMutation } from "../../../store/services/propertiesApiSlice";

// Interfaces
import { ErrorResponse } from "../userHooks/useLogin";


const useBuyProperty = () => {
    const [ buyOldProperty, { isLoading, isError, data } ] = useBuyPropertyMutation();

    const buyProperty = async (id: number) => {
        const res = await buyOldProperty({ id });
        
        if ('error' in res) {
            const errorResponse = res.error as FetchBaseQueryError;
            
            if (errorResponse && 'data' in errorResponse && errorResponse.data) {
                const serverError = errorResponse.data as ErrorResponse;
                return serverError.message || 'BuyProperty failed. Please try again.';
            }

            return errorResponse.status ? errorResponse.status.toString() : 'BuyProperty failed. Please try again.';
        }
        
        return res;
    }

    return { buyProperty, isLoading, isError, data };
};


export default useBuyProperty;