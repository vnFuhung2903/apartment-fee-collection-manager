import DashBoard from "../pages/DashBoard";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";

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
    path: "dashboard",
    element: <DashBoard/>
  }
]