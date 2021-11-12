import { createStore, combineReducers, applyMiddleware } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import reducer from '../reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['bookmarkList', 'isloggedIn'],
};

const rootReducer = combineReducers({
    reducer: persistReducer(persistConfig, reducer)
});

export const store = createStore(rootReducer);
export const persistor = persistStore(store);