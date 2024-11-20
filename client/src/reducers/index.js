import {combineReducers} from "redux";
import passwordReducer from "./password";
import page1Reducer from "./page1";
import feeDetailReducer from "./feeDetail";
import feeManageReducer from "./feeManage";
import chartReducer from "./chart";

const allReducers = combineReducers({
  passwordReducer,
  page1Reducer,
  feeDetailReducer,
  feeManageReducer,
  chartReducer
  //Thêm nhiều reducer ở đây
})

export default allReducers;