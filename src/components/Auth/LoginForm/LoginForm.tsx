import React, { useState } from "react";
import { useDispatch } from "react-redux";

// Custom Hooks
import useValidate from "../../../hooks/formHooks/useValidate";
import useLogin from "../../../hooks/apiHooks/userHooks/useLogin";

// Components
import BaseForm from "../../customWrappers/BaseForm/BaseForm";

// Schemas
import { loginSchema } from "../../../validationSchemas/userSchemas/loginSchema";

// Store Actions
import { appActions } from "../../../store";
import Input from "../../Form/Input";


const LoginForm: React.FC = () => {
    const dispatch = useDispatch();

    const [ serverError, setServerError ] = useState<string | null>(null);

    const { login } = useLogin();

    const { values, errors, handleChange, handleSubmit } = useValidate({
        schema: loginSchema,
        initialValues: { email: '', password: '' },
        onFormSubmit: async (values) => {
            const res = await login(values.email, values.password);
            if (typeof res === 'string') {
                setServerError(res);
            } else {
                setServerError(null);
                dispatch(appActions.changeLoggedInUser(res));
            }
        }
    });

    return (
        <BaseForm onSubmit={ handleSubmit }>
            <Input id={"email"} label={"Email"} type={"email"} value={values.email} changehandler={handleChange} error={errors.email}/>
            <Input id={"password"} label={"Password"} type={"password"} value={values.password} changehandler={handleChange} error={errors.password}/>
            <span className="text-sm text-red-500">{ serverError }</span>
        </BaseForm>
        
    );
};


export default LoginForm;