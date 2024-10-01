import React, { useState } from "react";

// Custom Hooks
import useRegister from "../../../hooks/apiHooks/userHooks/useRegister";
import useValidate from "../../../hooks/formHooks/useValidate";

// Components
import BaseForm from "../../customWrappers/BaseForm/BaseForm";
import Input from "../../Form/Input";

// Schemas
import { registerSchema } from "../../../validationSchemas/userSchemas/registerSchema";


const RegisterForm: React.FC = () => {
    const [ serverError, setServerError ] = useState<string | null>(null);

    const { register } = useRegister();

    const { values, errors, handleChange, handleSubmit } = useValidate({
        schema: registerSchema,
        initialValues: { email: '', password: '', confirmPassword: '' },
        onFormSubmit: async (values) => {
            const res = await register(values.email, values.password);
            if (typeof res === 'string') {
                setServerError(res);
            } else {
                setServerError(null);
                console.log('Register Successful');
            }
        }
    });

    return (
        <BaseForm onSubmit={ handleSubmit }>
            <Input id={"email"} label={"Email"} type={"email"} value={values.email} changehandler={handleChange} error={errors.email}/>
            <Input id={"password"} label={"Password"} type={"password"} value={values.password} changehandler={handleChange} error={errors.password}/>
            <Input id={"confirmPassword"} name={"confirmPassword"} label={"Confirm Password"} type={"password"} value={ values.confirmPassword } changehandler={ handleChange } error={errors.confirmPassword} />
            <span className="text-sm text-red-500">{ serverError }</span>
        </BaseForm>
    );
};


export default RegisterForm;