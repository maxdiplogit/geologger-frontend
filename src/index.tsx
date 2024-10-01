// Hooks
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { BrowserRouter } from 'react-router-dom';

// Components
import App from './App';

// Store
import store from './store/index';

// Styles
import './index.css';


const persistor = persistStore(store);


createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Provider store={ store }>
			<PersistGate loading={ null } persistor={ persistor }>
				<App />
			</PersistGate>
		</Provider>
	</BrowserRouter>
);