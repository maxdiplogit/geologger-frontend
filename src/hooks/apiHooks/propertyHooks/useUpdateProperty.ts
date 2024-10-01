import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useUpdatePropertyMutation } from "../../../store/services/propertiesApiSlice";

// Interfaces
import { SinglePropertyApiResponse } from "../../../store/services/propertiesApiSlice";
import { ErrorResponse } from "../userHooks/useLogin";


const useUpdateProperty = () => {
    const [ updateOldProperty, { isLoading, isError, data } ] = useUpdatePropertyMutation();

    const updateProperty = async (id: number, body: Partial<SinglePropertyApiResponse>) => {
        const res = await updateOldProperty({ id, body });

        if ('error' in res) {
            const errorResponse = res.error as FetchBaseQueryError;
            
            if (errorResponse && 'data' in errorResponse && errorResponse.data) {
                const serverError = errorResponse.data as ErrorResponse;
                return serverError.message || 'UpdateProperty failed. Please try again.';
            }

            return errorResponse.status ? errorResponse.status.toString() : 'UpdateProperty failed. Please try again.';
        }

        return res;
    }

    return { updateProperty, isLoading, isError, data };
};


export default useUpdateProperty;