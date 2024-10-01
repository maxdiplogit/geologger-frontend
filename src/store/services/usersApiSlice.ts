// Hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface UserApiResponse {
    id: number,
    email: string,
};


export const usersApiSlice = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/users',
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation<UserApiResponse, { email: string; password: string; }>({
            query: ({ email, password }) => ({
                url: '/register',
                method: 'POST',
                body: {
                    email,
                    password,
                },
            }),
        }),
        loginUser: builder.mutation<UserApiResponse, { email: string; password: string; }>({
            query: ({ email, password }) => ({
                url: '/login',
                method: 'POST',
                body: {
                    email,
                    password,
                },
            }),
        }),
        logoutUser: builder.mutation<void, void>({
            query: () => ({
                url: '/logout',
                method: 'POST',
                body: {},
            }),
        })
    }),
});


export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
} = usersApiSlice;