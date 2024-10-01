import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useLogoutUserMutation } from "../../../store/services/usersApiSlice";

// Interfaces
import { ErrorResponse } from "./useLogin";


const useLogout = () => {
    const [ logoutUser, { isLoading, isError, data } ] = useLogoutUserMutation();

    const logout = async () => {
        const res = await logoutUser();

        if ('error' in res) {
            const errorResponse = res.error as FetchBaseQueryError;
            
            if (errorResponse && 'data' in errorResponse && errorResponse.data) {
                const serverError = errorResponse.data as ErrorResponse;
                return serverError.message || 'Logout failed. Please try again.';
            }

            return errorResponse.status ? errorResponse.status.toString() : 'Logout failed. Please try again.';
        }

        return res;
    }

    return { logout, isLoading, isError, data };
};


export default useLogout;