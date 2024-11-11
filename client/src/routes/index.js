import DashBoard from "../pages/DashBoard";
import Page2 from "../pages/DashBoard/Page2";
import Register from "../pages/DashBoard/Register";
import FeeMange from "../pages/FeeMange";
import Detail from "../pages/FeeMange/Detail";
import LayoutDefault from "../pages/Layout/LayoutDefault";
import LogIn from "../pages/SignUp/LogIn";
import SignUp from "../pages/SignUp/SignUp";
import Stats from "../pages/Stats";

export const routes = [
  {
    path: "/",
    element: <SignUp/>,
  },
  {
    path: "login",
    element: <LogIn/>
  },
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
        path: "stats",
        element: <Stats/>
      },
      {
        path: "fee_manage",
        element: <FeeMange/>
      },
      {
        path: "detail",
        element: <Detail/>
      }
    ]
  }
]