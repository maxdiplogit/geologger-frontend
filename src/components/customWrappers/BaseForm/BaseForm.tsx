import React from "react";


interface BaseFormProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    children: React.ReactNode,
    className?: string,
};


const BaseForm: React.FC<BaseFormProps> = ({ onSubmit, children, className="" }) => {
    return (
        <form onSubmit={ onSubmit } className={ `${className} p-2 flex flex-col items-center` }>
            {children}
            <button className="mt-4 py-2 px-3 text-white bg-blue-500 rounded-lg hover:bg-blue-700 w-fit" type="submit">Submit</button>
        </form>
    )
};


export default BaseForm;