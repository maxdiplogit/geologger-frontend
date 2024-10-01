import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Custom Hooks
import useLogout from "../../hooks/apiHooks/userHooks/useLogout";

// Components
import Properties from "../Properties/Properties";
import Button from "../customWrappers/Button/Button";

// Store Actions
import { appActions } from "../../store";


const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const loggedInUser = useSelector((state: any) => state.app.loggedInUser);
    const userId = loggedInUser?.data?.id;

    const { logout } = useLogout();

	const handleLogout = async () => {
		const res = await logout();
		dispatch(appActions.changeLoggedInUser({}));
	};

    return (
        <>
            { userId === undefined ?
                <Button onClick={ () => navigate('/login') } className="mt-4 py-2 px-3 text-white bg-blue-500 rounded-lg hover:bg-blue-700">Login</Button>
            : <Button onClick={ handleLogout } className="mt-4 py-2 px-3 text-white bg-red-500 rounded-lg hover:bg-red-700">Logout</Button>
            }
            <Properties />
        </>
    )
};


export default Home;