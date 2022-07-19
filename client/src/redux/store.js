import { configureStore } from '@reduxjs/toolkit';
import logSlice from './logSlice';


const store = configureStore({ 
    reducer: {
        logSlice: logSlice,
    }
});

export default store; 
