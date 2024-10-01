import { useGetPropertyQuery } from "../../../store/services/propertiesApiSlice"


const useProperty = (id: number) => {
    const { data: property, error, isLoading, refetch } = useGetPropertyQuery({ id });

    return {
        property,
        error,
        isLoading,
        refetch,
    };
};


export default useProperty;