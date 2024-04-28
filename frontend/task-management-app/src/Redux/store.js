import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Auth-redux/reducer";
import { thunk } from "redux-thunk";
import { taskReducer } from "./Task-redux/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));