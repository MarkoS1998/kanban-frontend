import { combineReducers } from "@reduxjs/toolkit";
import { taskReducer } from "./taskReducer";
import { taskListReducer } from "./taskListReducer";
import { labelReducer } from "./labelReducer";
import { userReducer } from "./userReducer";
import { apiStatusReducer } from "./apiStatusReducer";
import { loggedInUserReducer } from "./loggedInUserReducer";

const rootReducer = combineReducers({
  task: taskReducer,
  taskList: taskListReducer,
  label: labelReducer,
  user: userReducer,
  apiStatus: apiStatusReducer,
  loggedInUser: loggedInUserReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
