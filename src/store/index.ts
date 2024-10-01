import { createSlice, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';


// Services
import { usersApiSlice } from "./services/usersApiSlice";
import { propertiesApiSlice } from "./services/propertiesApiSlice";


export interface User {
    id: number,
    email: string,
};


export interface Property {
    id: number,
    name: string,
    address: string,
    latitude: number,
    longitude: number,
    price: number,
    createdBy: {
        id: number,
        email: string,
    },
    boughtBy?: {
        id: number,
        email: string,
    },
    isBought: boolean,
};

interface InitialState {
    loggedInUser: User | null,
    properties: Property[],
};


const initialAppState: InitialState = {
    loggedInUser: null,
    properties: [],
};


const appSlice = createSlice({
    name: 'app',
    initialState: initialAppState,
    reducers: {
        changeLoggedInUser(currentState, action) {
            currentState.loggedInUser = action.payload;
        },
        changeProperties(currentState, action) {
            currentState.properties = action.payload;
        },
    }
});


const reducers = combineReducers({
    app: appSlice.reducer,
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
    [propertiesApiSlice.reducerPath]: propertiesApiSlice.reducer,
});


const persistConfig = {
    key: 'root',
    storage
};


const persistedReducer = persistReducer(persistConfig, reducers);


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                ignoredPaths: ['app.refetchHomes'],
            }
        }).concat(
            usersApiSlice.middleware,
            propertiesApiSlice.middleware,
        ),
});


export const appActions = appSlice.actions;


export default store;