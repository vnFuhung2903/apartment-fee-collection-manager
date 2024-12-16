import DashBoard from "../pages/DashBoard";
import Page2 from "../pages/DashBoard/Page2";
import Register from "../pages/DashBoard/Register";
import FeeMange from "../pages/FeeMange";
import CreateFee from "../pages/FeeMange/CreateFee";
import Detail from "../pages/FeeMange/Detail";
import EditFee from "../pages/FeeMange/EditFee";
import FeeList from "../pages/FeeMange/FeeList";
import LayoutDefault from "../pages/Layout/LayoutDefault";
import LogIn from "../pages/LogIn/LogIn";
import Password from "../pages/Password";
import Stats from "../pages/Stats";
import HouseholdInfo from "../pages/DashBoard/HouseholdInfo";

export const routes = [
  // {
  //   path: "/",
  //   element: <LogIn/>,
  // },
  // {
  //   path: "login",
  //   element: <LogIn/>
  // },
  {
    path: "/",
    element: <LayoutDefault/>,
    children: [
      {
        path: "dashboard",
        element: <DashBoard/>
      },
      {
        path: "view_all",
        element: <Page2/>
      },
      {
        path: "register_resident",
        element: <Register/>
      },
      {
        path: "household_infor",
        element: <HouseholdInfo/>
      },
      {
        path: "stats",
        element: <Stats/>
      },
      {
        path: "fee_manage",
        element: <FeeMange/>
      },
      {
        path: "fee_list",
        element: <FeeList/>
      },
      {
        path: "fee_create",
        element: <CreateFee/>
      },
      {
        path: "edit_fee",
        element: <EditFee/>
      },
      {
        path: "detail/:household_id",
        element: <Detail/>
      },
      {
        path: "password",
        element: <Password/>
      }
    ]
  }
]