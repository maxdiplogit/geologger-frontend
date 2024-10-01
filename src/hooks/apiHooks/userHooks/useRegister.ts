import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRegisterUserMutation } from "../../../store/services/usersApiSlice";

// Interfaces
import { ErrorResponse } from "../userHooks/useLogin";


const useRegister = () => {
    const [ registerUser, { isLoading, isError, data } ] = useRegisterUserMutation();

    const register = async (email: string, password: string) => {
        const res = await registerUser({ email, password });

        if ('error' in res) {
            const errorResponse = res.error as FetchBaseQueryError;
            
            if (errorResponse && 'data' in errorResponse && errorResponse.data) {
                const serverError = errorResponse.data as ErrorResponse;
                return serverError.message || 'Register failed. Please try again.';
            }

            return errorResponse.status ? errorResponse.status.toString() : 'Register failed. Please try again.';
        }

        return res;        
    }

    return { register, isLoading, isError, data };
};


export default useRegister;