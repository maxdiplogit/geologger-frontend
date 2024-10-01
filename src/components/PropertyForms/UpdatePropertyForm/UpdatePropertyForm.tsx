import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Custom Hooks
import useValidate from "../../../hooks/formHooks/useValidate";
import useUpdateProperty from '../../../hooks/apiHooks/propertyHooks/useUpdateProperty';

// Components
import BaseForm from "../../customWrappers/BaseForm/BaseForm";

// Schemas
import { propertySchema } from "../../../validationSchemas/propertySchemas/propertySchema";

// Store Actions
import { appActions, Property as SingleProperty } from '../../../store';
import Input from '../../Form/Input';


const UpdatePropertyForm: React.FC = () => {
    const { id: propId } = useParams();
    const propertyId = Number(propId);

    const navigate = useNavigate();

    const loggedInUser = useSelector(((state: any) => state.app.loggedInUser));
    const userId = loggedInUser?.data?.id;
    
    const properties = useSelector((state: any) => state.app.properties.properties);
    console.log(userId, properties);

    const selectedProperty: SingleProperty[] = properties.filter((property: SingleProperty) => property.id === propertyId);

    const dispatch = useDispatch();

    const [ serverError, setServerError ] = useState<string | null>(null);

    const { updateProperty } = useUpdateProperty();

    const { values, errors, handleChange, handleSubmit } = useValidate({
        schema: propertySchema,
        initialValues: { name: selectedProperty[0]?.name, address: selectedProperty[0]?.address, latitude: selectedProperty[0]?.latitude, longitude: selectedProperty[0]?.longitude, price: selectedProperty[0]?.price },
        onFormSubmit: async (values) => {
            const body = {
                name: values.name,
                address: values.address,
                latitude: values.latitude,
                longitude: values.longitude,
                price: values.price,
            };
            const res = await updateProperty(propertyId, body);
            if (typeof res === 'string') {
                console.log(res);
                if (res === 'Current user undefined') {
                    dispatch(appActions.changeLoggedInUser({}));
                }
                setServerError(res);
            } else {
                setServerError(null);
                console.log('UpdateProperty Successful');
                navigate('/');
            }
        }
    });
    

    if (selectedProperty.length === 0) {
        return (
            <div className='w-full h-full flex justify-center text-sm text-red-500'>
                Property not found
            </div>
        );
    }

    if (selectedProperty[0].createdBy.id !== userId) {
        return (
            <div className='w-full h-full flex justify-center text-sm text-red-500'>
                You don't own this property
            </div>
        );
    }

    if (selectedProperty[0].isBought) {
        return (
            <div className='w-full h-full flex justify-center text-sm text-red-500'>
                Property has been bought!
            </div>
        )
    }

    return (
        <>
            <h1 className="text-2xl font-bold text-center pb-4">Update Property</h1>
            <BaseForm onSubmit={ handleSubmit }>
                <Input id={"name"} name={"name"} label={"Name"} type={"text"} value={ values.name } changehandler={ handleChange } error={errors.name} />
                <Input id={"address"} name={"address"} label={"Address"} type={"text"} value={ values.address } changehandler={ handleChange } error={errors.address} />
                <Input id={"latitude"} name={"latitude"} label={"Latitude"} type={"number"} value={ values.latitude } changehandler={ handleChange } error={errors.latitude} />
                <Input id={"longitude"} name={"longitude"} label={"Longitude"} type={"number"} value={ values.longitude } changehandler={ handleChange } error={errors.longitude} />
                <Input id={"price"} name={"price"} label={"Price"} type={"number"} value={ values.price } changehandler={ handleChange } error={errors.price} />
                <span className="text-sm text-red-500">{ serverError }</span>
            </BaseForm>
        </>
    );
};


export default UpdatePropertyForm;