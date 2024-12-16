import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Reducers
import UserReducer from  './reducers/UserReducer'
import ProductReducer from './reducers/ProductReducer'
import CartReducer from './reducers/CartReducer'
import OrderReducer from './reducers/OrderReducer'

const persistConfig = {
  key: "root", 
  storage, 
};

const rootReducer = combineReducers({
    user: UserReducer,
    product: ProductReducer,
    cart: CartReducer,
    order: OrderReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer
})

const persistor = persistStore(store)

export { store,persistor }
