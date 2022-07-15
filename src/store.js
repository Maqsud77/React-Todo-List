import {createStore,combineReducers} from "redux";
import taskReducer from "./reducer/taskReducer";
export default createStore(taskReducer)