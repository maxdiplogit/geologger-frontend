import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useCancelPurchaseMutation } from "../../../store/services/propertiesApiSlice";

// Interfaces
import { ErrorResponse } from "../userHooks/useLogin";


const useCancelPurchase = () => {
    const [ cancelPropertyPurchase, { isLoading, isError, data } ] = useCancelPurchaseMutation();

    const cancelPurchase = async (id: number) => {
        const res = await cancelPropertyPurchase({ id });
        
        if ('error' in res) {
            const errorResponse = res.error as FetchBaseQueryError;
            
            if (errorResponse && 'data' in errorResponse && errorResponse.data) {
                const serverError = errorResponse.data as ErrorResponse;
                return serverError.message || 'CancelPurchase failed. Please try again.';
            }

            return errorResponse.status ? errorResponse.status.toString() : 'CancelPurchase failed. Please try again.';
        }
        
        return res;
    }

    return { cancelPurchase, isLoading, isError, data };
};


export default useCancelPurchase;