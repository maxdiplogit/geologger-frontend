import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useDeletePropertyMutation } from "../../../store/services/propertiesApiSlice";

// Interfaces
import { ErrorResponse } from "../userHooks/useLogin";


const useDeleteProperty = () => {
    const [ deleteOldProperty, { isLoading, isError, data } ] = useDeletePropertyMutation();

    const deleteProperty = async (id: number) => {
        const res = await deleteOldProperty({ id });
        
        if ('error' in res) {
            const errorResponse = res.error as FetchBaseQueryError;
            
            if (errorResponse && 'data' in errorResponse && errorResponse.data) {
                const serverError = errorResponse.data as ErrorResponse;
                return serverError.message || 'DeleteProperty failed. Please try again.';
            }

            return errorResponse.status ? errorResponse.status.toString() : 'DeleteProperty failed. Please try again.';
        }
        
        return res;
    }

    return { deleteProperty, isLoading, isError, data };
};


export default useDeleteProperty;