import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useLoginUserMutation } from "../../../store/services/usersApiSlice";


export interface ErrorResponse {
    message: string,
    error: string,
    statusCode: number,
};


const useLogin = () => {
    const [ loginUser, { isLoading, isError, data, error } ] = useLoginUserMutation();

    const login = async (email: string, password: string) => {
        const res = await loginUser({ email, password });

        if ('error' in res) {
            const errorResponse = res.error as FetchBaseQueryError;
            
            if (errorResponse && 'data' in errorResponse && errorResponse.data) {
                const serverError = errorResponse.data as ErrorResponse;
                return serverError.message || 'Login failed. Please try again.';
            }

            return errorResponse.status ? errorResponse.status.toString() : 'Login failed. Please try again.';
        }

        return res;
    }

    return { login, isLoading, isError, data, error };
};


export default useLogin;