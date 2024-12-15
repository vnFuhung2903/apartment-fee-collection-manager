import {combineReducers} from "redux";
import passwordReducer from "./password";
import page1Reducer from "./page1";
import feeDetailReducer from "./feeDetail";
import householdDetailReducer from "./feeDetail2"
import feeManageReducer from "./feeManage";
import feeManageReducer1 from "./feeManage";
import chartReducer from "./chart";

const allReducers = combineReducers({
  passwordReducer,
  page1Reducer,
  feeDetailReducer,
  householdDetailReducer,
  feeManageReducer,
  feeManageReducer1,
  chartReducer,
  //Thêm nhiều reducer ở đây
})

export default allReducers;