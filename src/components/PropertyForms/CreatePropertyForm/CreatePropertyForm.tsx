import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Custom Hooks
import useValidate from "../../../hooks/formHooks/useValidate";
import useCreateProperty from "../../../hooks/apiHooks/propertyHooks/useCreateProperty";

// Components
import BaseForm from "../../customWrappers/BaseForm/BaseForm";
import Input from '../../Form/Input';

// Schemas
import { propertySchema } from "../../../validationSchemas/propertySchemas/propertySchema";

// Store Actions
import { appActions } from '../../../store';


const CreatePropertyForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ serverError, setServerError ] = useState<string | null>(null);

    const { createProperty } = useCreateProperty();

    const { values, errors, handleChange, handleSubmit } = useValidate({
        schema: propertySchema,
        initialValues: { name: '', address: '', latitude: 0, longitude: 0, price: 0 },
        onFormSubmit: async (values) => {
            const res = await createProperty(values.name, values.address, values.latitude, values.longitude, values.price);
            if (typeof res === 'string') {
                if (res === 'Current user undefined') {
                    dispatch(appActions.changeLoggedInUser({}));
                }
                setServerError(res);
            } else {
                setServerError(null);
                console.log('CreateProperty Successful');
                navigate('/');
            }
        }
    });

    return (
        <BaseForm onSubmit={ handleSubmit }>
            <Input id={"name"} name={"name"} label={"Name"} type={"text"} value={ values.name } changehandler={ handleChange } error={errors.name} />
            <Input id={"address"} name={"address"} label={"Address"} type={"text"} value={ values.address } changehandler={ handleChange } error={errors.address} />
            <Input id={"latitude"} name={"latitude"} label={"Latitude"} type={"number"} value={ values.latitude } changehandler={ handleChange } error={errors.latitude} />
            <Input id={"longitude"} name={"longitude"} label={"Longitude"} type={"number"} value={ values.longitude } changehandler={ handleChange } error={errors.longitude} />
            <Input id={"price"} name={"price"} label={"Price"} type={"number"} value={ values.price } changehandler={ handleChange } error={errors.price} />
            <span className="text-sm text-red-500">{ serverError }</span>
        </BaseForm>
    );
};


export default CreatePropertyForm;