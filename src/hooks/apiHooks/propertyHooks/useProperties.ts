import { useGetPropertiesQuery } from "../../../store/services/propertiesApiSlice";


const useProperties = () => {
    const { data: properties, error, isLoading, refetch } = useGetPropertiesQuery();

    return {
        properties,
        error,
        isLoading,
        refetch,
    };
};


export default useProperties;