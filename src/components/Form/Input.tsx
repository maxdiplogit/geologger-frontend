interface InputPropType {
    label: string,
    id: string,
    type: string,
    name?: string,
    value: string | number | undefined,
    changehandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
    error: string | undefined,
}

const Input = ({label, id, type, name, value, changehandler, error} : InputPropType) => {
    return (<div className="py-2 flex flex-col">
        <label htmlFor={id} className="text-sm text-gray-500 pb-1.5">{label} </label>
        <input className="border rounded-xl p-1" id={id} type={type} name={name || type} value={ value } onChange={ changehandler } />
        { error && <div className="text-sm text-red-500">{ error }</div> }
    </div>)
}

export default Input