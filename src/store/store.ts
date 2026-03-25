
import { combineReducers, configureStore} from "@reduxjs/toolkit";
import counterSlice from "./counter/slice";
import favoritesSlice from "./favorites/slice";

import AsyncStorage from "@react-native-async-storage/async-storage"
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";


const rootReducer = combineReducers({
    counter: counterSlice,
    favorites: favoritesSlice
})

const persistedReducer = persistReducer({key: "parkings-state", storage: AsyncStorage, version: 1}, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [PERSIST, FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER]
            }
        })
    }
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;