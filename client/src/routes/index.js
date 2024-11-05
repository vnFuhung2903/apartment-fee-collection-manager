import DashBoard from "../pages/DashBoard";
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
        path: "stats",
        element: <Stats/>
      }
    ]
  }
]