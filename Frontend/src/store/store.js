import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userInfo from '../slice/userInfo'
import hospitalInfo from '../slice/hospitalInfo';

const persistConfig = {
    key: "root",
    storage,
};

const persistedHospitalInfoReducer = persistReducer(persistConfig, hospitalInfo);
const persistedUserInfoReducer = persistReducer(persistConfig, userInfo);

const store = configureStore({
    reducer: {
        userInfo: persistedUserInfoReducer,
        hospitalInfo: persistedHospitalInfoReducer
    }
})

const persistor = persistStore(store);

export { store, persistor };