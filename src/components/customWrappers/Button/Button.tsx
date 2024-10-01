import React from "react";


interface ButtonProps {
    onClick: () => void,
    children: React.ReactNode,
    className?: string,
};


const Button: React.FC<ButtonProps> = ({ onClick, children, className="", ...rest }) => {
    return (
        <button onClick={ onClick } className={ className } { ...rest }>
            { children }
        </button>
    );
};


export default Button;