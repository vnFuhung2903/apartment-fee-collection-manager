import "./assets/css/style.scss"
import "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
import customer01 from "./assets/imgs/customer01.jpg"
import { Outlet, Link } from "react-router-dom"

function LayoutDefault(){
  return (
    <>
      <div className="layout-default">
        <div className="layout-default__sidebar">
          <div className="layout-default__sidebar--container">
            <div className="layout-default__sidebar--navigation">
              <ul>
              <li>
                    <a href="#">
                        <span class="icon">
                            <ion-icon name="business-sharp"></ion-icon>
                        </span>
                        <span class="title">BLUEMOON</span>
                    </a>
                </li>

                <li>
                    <Link to="dashboard">
                        <span class="icon">
                            <ion-icon name="home-outline"></ion-icon>
                        </span>
                        <span class="title">Dashboard</span>
                    </Link>
                </li>

                <li>
                    <Link to="dashboard">
                        <span class="icon">
                            <ion-icon name="people-outline"></ion-icon>
                        </span>
                        <span class="title">Quản lí căn hộ và cư dân</span>
                    </Link>
                </li>

                <li>
                    <Link to="stats">
                        <span class="icon">
                            <ion-icon name="chatbubble-outline"></ion-icon>
                        </span>
                        <span class="title">Thống kê</span>
                    </Link>
                </li>

                <li>
                    <a href="#">
                        <span class="icon">
                            <ion-icon name="help-outline"></ion-icon>
                        </span>
                        <span class="title">Help</span>
                    </a>
                </li>

                <li>
                    <a href="#">
                        <span class="icon">
                            <ion-icon name="settings-outline"></ion-icon>
                        </span>
                        <span class="title">Settings</span>
                    </a>
                </li>

                <li>
                    <a href="#">
                        <span class="icon">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                        </span>
                        <span class="title">Password</span>
                    </a>
                </li>

                <li>
                    <a href="#">
                        <span class="icon">
                            <ion-icon name="log-out-outline"></ion-icon>
                        </span>
                        <span class="title">Sign Out</span>
                    </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
            {/* ----------------------Main ---------------------- */}
        <div className="layout-default__main">
            <div className="layout-default__main--topbar">
                <div className="layout-default__main--toggle">
                    <ion-icon name="menu-outline"></ion-icon>
                </div>

                <div className="layout-default__main--search">
                    <label>
                        <input type="text" placeholder="Search here" />
                        <ion-icon name="search-outline"></ion-icon>
                    </label>
                </div>

                <div className="layout-default__main--user">
                    <img src={customer01} alt="" />
                </div>
            </div>
            <Outlet/>
        </div>
      </div>
    </>
  )
}

export default LayoutDefault