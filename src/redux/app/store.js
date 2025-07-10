import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/auth/registerSlice";
import loginReducer from "../features/auth/loginSlice";
import userReducer from "../features/auth/userSlice";
import taskReducer from '../features/task/taskSlice';

const store=configureStore({
  reducer:{
   register:registerReducer,
   login:loginReducer,
   user:userReducer,
   tasks: taskReducer,
  }
});
export default store