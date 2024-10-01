// Hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Interfaces
import { UserApiResponse } from './usersApiSlice';

export interface SinglePropertyApiResponse {
    id: number,
    name: string,
    latitude: number,
    longitude: number,
    address: string,
    price: number,
}

interface PropertyApiResponse {
    id: number,
    name: string,
    latitude: number,
    longitude: number,
    address: string,
    price: string,
    createdBy: UserApiResponse,
    boughtBy: UserApiResponse | null,
    isBought: boolean,
};

interface PropertiesApiResponse {
    properties: PropertyApiResponse[],
};

interface BuyApiResponse {
    id: number,
    role: string,
    property: {
        id: number,
    },
    user: {
        id: number,
    },
}

interface CancelPurchaseApiResponse {
    role: string,
}

export const propertiesApiSlice = createApi({
    reducerPath: 'propertiesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/properties',
        credentials: 'include',
    }),
    tagTypes: ['Properties', 'Property'],
    endpoints: (builder) => ({
        getProperty: builder.query<SinglePropertyApiResponse, { id: number; }>({
            query: ({ id }) => `/${ id }`,
            providesTags: (result, error, { id }) => [{ type: 'Property', id }],
        }),
        getProperties: builder.query<PropertiesApiResponse, void>({
            query: () => '/',
            providesTags: (result) => result ? [
                ...result.properties.map(({ id }) => ({ type: 'Property' as const, id })),
                { type: 'Properties', id: 'LIST' },
            ] : [{ type: 'Properties', id: 'LIST' }]
        }),
        createProperty: builder.mutation<SinglePropertyApiResponse, { name: string; address: string; latitude: number; longitude: number; price: number; }>({
            query: ({ name, address, latitude, longitude, price }) => ({
                url: '/create',
                method: 'POST',
                body: {
                    name,
                    address,
                    latitude,
                    longitude,
                    price
                },
            }),
            invalidatesTags: [{ type: 'Properties', id: 'LIST' }],
        }),
        updateProperty: builder.mutation<SinglePropertyApiResponse, { id: number; body: Partial<SinglePropertyApiResponse>; }>({
            query: ({ id, body }) => ({
                url: `/update/${ id }`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: 'Properties', id: 'LIST' },
                { type: 'Property', id },
            ],
        }),
        deleteProperty: builder.mutation<void, { id: number; }>({
            query: ({ id }) => ({
                url: `/delete/${ id }`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: 'Properties', id: 'LIST' }
            ],
        }),
        buyProperty: builder.mutation<BuyApiResponse, { id: number; }>({
            query: ({ id }) => ({
                url: `/buy/${ id }`,
                method: 'POST',
                body: {},
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: 'Properties', id: 'LIST' },
                { type: 'Property', id },
            ],
        }),
        cancelPurchase: builder.mutation<CancelPurchaseApiResponse, { id: number; }>({
            query: ({ id }) => ({
                url: `/cancelPurchase/${ id }`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: 'Properties', id: 'LIST' },
                { type: 'Property', id },
            ],
        })
    }),
});


export const {
    useGetPropertyQuery,
    useGetPropertiesQuery,
    useCreatePropertyMutation,
    useUpdatePropertyMutation,
    useDeletePropertyMutation,
    useBuyPropertyMutation,
    useCancelPurchaseMutation,
} = propertiesApiSlice;