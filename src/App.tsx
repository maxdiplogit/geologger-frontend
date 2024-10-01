import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Components
import Home from './components/Home/Home';
import Property from './components/Property/Property';
import CreatePropertyForm from './components/PropertyForms/CreatePropertyForm/CreatePropertyForm';
import UpdatePropertyForm from './components/PropertyForms/UpdatePropertyForm/UpdatePropertyForm';
import Button from './components/customWrappers/Button/Button';

// Custom Hooks
import useLogout from './hooks/apiHooks/userHooks/useLogout';
import useProperties from './hooks/apiHooks/propertyHooks/useProperties';

// Store Actions
import { appActions } from './store';

// Styles
import './App.css';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CreateProperty from './components/PropertyForms/CreateProperty';
import UpdateProperty from './components/PropertyForms/UpdateProperty';


const App: React.FC = () => {
	const loggedInUser = useSelector((state: any) => state.app.loggedInUser);
    const userId = loggedInUser?.data?.id;

	const dispatch = useDispatch();

	const { properties, error } = useProperties();

	if (!error) {
		dispatch(appActions.changeProperties(properties));
	}

	console.log(properties);

	return (
		<div className='w-full h-full'>
			<Routes>
				<Route path='/' element={ <Home /> } />
				<Route path='/:id' element={ <Property /> } />
				<Route path='/create' element={ userId !== undefined ? <CreateProperty /> : <Navigate to={ '/' } /> } />
				<Route path='/update/:id' element={ userId !== undefined ? <UpdateProperty /> : <Navigate to={ '/' } /> } />
				<Route path='/login' element={ userId === undefined ? <Login /> : <Navigate to={ '/' } /> } />
				<Route path='/register' element={ userId === undefined ? <Register /> : <Navigate to={ '/' } /> } />
			</Routes>
		</div>
	);
}

export default App;
