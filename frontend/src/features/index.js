import { combineReducers } from "redux";
import authReducer from "./authSlice";
import ticketReducer from "./ticketSlice";
import noteReducer from "./noteSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  tickets: ticketReducer,
  notes: noteReducer,
});

export default rootReducer;
