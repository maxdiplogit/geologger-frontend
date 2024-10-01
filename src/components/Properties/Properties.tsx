import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Custom Hooks
import useProperties from "../../hooks/apiHooks/propertyHooks/useProperties";

// Store Actions
import { appActions } from "../../store";


const Properties = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
	
	const { properties, error } = useProperties();
	console.log(properties);

	if (!error) {
		dispatch(appActions.changeProperties(properties));
	}

    return (
        <div className="w-full h-full flex flex-col">
            <ul className="w-full h-full list-none flex flex-col items-center mt-20">
                {properties?.properties.map((property) => (
                    <li className="w-100 border rounded-lg bg-gray-200 p-4 m-2 hover:cursor-pointer hover:bg-gray-100" onClick={ () => navigate(`/${ property.id }`) }>{ property.name }</li>
                ))}
            </ul>
        </div>
    );
};


export default Properties;