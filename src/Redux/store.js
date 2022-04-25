import { configureStore , combineReducers } from "@reduxjs/toolkit";
import CallReducer  from './reducers/call-reducer';

const rootReducer = combineReducers({
   CallReducer,
})

export const SetupStore = () => {
   return configureStore({
      reducer : rootReducer
   })
}