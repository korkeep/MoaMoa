import { combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import store from "./store";
import query from "./query"

const persistConfig = {
    key: 'moamoa',
    storage
}

const reducer = combineReducers({
    store,
    query
})

const persist_reducer = persistReducer(persistConfig, reducer)

export default function configureStore() {
    const store = createStore(persist_reducer)
    const persistor = persistStore(store)
    return { store, persistor }
}
