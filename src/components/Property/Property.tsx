import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// Custom Hooks
import useBuyProperty from "../../hooks/apiHooks/propertyHooks/useBuyProperty";
import useCancelPurchase from "../../hooks/apiHooks/propertyHooks/useCancelPurchase";
import useDeleteProperty from "../../hooks/apiHooks/propertyHooks/useDeleteProperty";
import useProperty from "../../hooks/apiHooks/propertyHooks/useProperty";

// Components
import Button from "../customWrappers/Button/Button";

// Store Actions
import { appActions, Property as SingleProperty } from "../../store";


const Property: React.FC = () => {
    const navigate = useNavigate();

    const { id: propId } = useParams();
    const propertyId = Number(propId);

    const loggedInUser = useSelector((state: any) => state.app.loggedInUser);
    const userId = loggedInUser?.data?.id;
    const { property: foundProperty } = useProperty(propertyId);
    const properties = useSelector((state: any) => state.app.properties.properties);
    console.log(userId, properties);

    const selectedProperty: SingleProperty[] = properties.filter((property: SingleProperty) => property.id === propertyId);
    
    const dispatch = useDispatch();
    
    const [ serverError, setServerError ] = useState<string | null>(null);

    console.log(selectedProperty[0], userId);
    
    const { buyProperty } = useBuyProperty();
    const { cancelPurchase } = useCancelPurchase();
    const { deleteProperty } = useDeleteProperty();
    
    const handleBuyProperty = async () => {
        const res = await buyProperty(propertyId);
        // Extract the conditional logic
        const isCurrentUserUndefined = res === 'Current user undefined';
        
        if (isCurrentUserUndefined) {
            dispatch(appActions.changeLoggedInUser({}));
        }
        
        if (typeof res === 'string') {
            console.log(res);
            if (res === 'Current user undefined') {
                dispatch(appActions.changeLoggedInUser({}));
            }
            setServerError(res);
        } else {
            setServerError(null);
            console.log('BuyProperty Successful');
        }
    };
    
    const handleCancelPurchase = async () => {
        const res = await cancelPurchase(propertyId);
        if (typeof res === 'string') {
            console.log(res);
            if (res === 'Current user undefined') {
                dispatch(appActions.changeLoggedInUser({}));
            }
            setServerError(res);
        } else {
            setServerError(null);
            console.log('CancelPurchase Successful');
        }
    };
    
    const handleDeleteProperty = async () => {
        const res = await deleteProperty(propertyId);
        if (typeof res === 'string') {
            console.log(res);
            if (res === 'Current user undefined') {
                dispatch(appActions.changeLoggedInUser({}));
            }
            setServerError(res);
        } else {
            setServerError(null);
            console.log('DeleteProperty Successful');
            navigate('/');
        }
    }

    if (selectedProperty.length === 0) {
        return (
            <div className="w-full h-full text-red-500 flex justify-center items-center">
                Property not found
            </div>
        );
    }
    
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-fit border rounded-lg p-8">
                <ul className="list-none">
                    <li>Name: <span className="text-gray-500">{ foundProperty?.name }</span></li>
                    <li>Address: <span className="text-gray-500">{ foundProperty?.address }</span></li>
                    <li>Latitude: <span className="text-gray-500">{ foundProperty?.latitude }</span></li>
                    <li>Longitude: <span className="text-gray-500">{ foundProperty?.longitude }</span></li>
                    <li>Price: <span className="text-gray-500">{ foundProperty?.price }</span></li>
                    <span className="text-sm text-red-500">{ serverError }</span>
                </ul>
                <div className="w-full flex justify-center">
                    { userId !== undefined ? <>
                        { selectedProperty[0].isBought && <p>Already Bought!</p> }
                        { selectedProperty[0].createdBy.id !== userId && !selectedProperty[0].isBought &&
                            <Button className="border rounded-xl p-1 bg-green-500 text-white hover:bg-green-600" onClick={ handleBuyProperty }>Buy Property</Button>
                        }
                        { selectedProperty[0].createdBy.id !== userId && selectedProperty[0].isBought && selectedProperty[0].boughtBy?.id === userId &&
                            <Button className="border rounded-xl p-1 bg-red-500 text-white hover:bg-red-600" onClick={ handleCancelPurchase }>Cancel Purchase</Button>
                        }
                        { selectedProperty[0].createdBy.id === userId && !selectedProperty[0].isBought &&
                            <Button className="border rounded-xl p-1 bg-yellow-500 text-white hover:bg-yellow-600" onClick={ () => navigate(`/update/${ propertyId }`) }>Update Property</Button>
                        }
                        { selectedProperty[0].createdBy.id === userId && !selectedProperty[0].isBought &&
                            <Button className="border rounded-xl p-1 bg-red-500 text-white hover:bg-red-600" onClick={ handleDeleteProperty }>Delete Property</Button>
                        }
                    </> : <>
                        <Button onClick={ () => navigate('/login') } className="mt-4 py-2 px-3 text-white bg-blue-500 rounded-lg hover:bg-blue-700">Login</Button>
                    </>}
                </div>
            </div>
        </div>
    );
};


export default Property;