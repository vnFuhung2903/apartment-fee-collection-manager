import "./assets/css/style.scss"
import "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
import customer01 from "./assets/imgs/customer01.jpg"
import { Outlet, Link } from "react-router-dom"
import {useRef} from "react"

function LayoutDefault(){
    const navigationRef = useRef(null);
    const mainRef = useRef(null);

    const handleClick = () => {
        if (navigationRef.current && mainRef.current) {
          navigationRef.current.classList.toggle("active");
          mainRef.current.classList.toggle("active");
        }
      };
    return (
    <>
      <div className="layout-default">
        <div className="layout-default__sidebar">
          <div className="layout-default__sidebar--container">
            <div className="layout-default__sidebar--navigation" ref={navigationRef}>
              <ul>
              <li>
                    <Link to="dashboard">
                        <span className="icon">
                            <ion-icon name="business-sharp"></ion-icon>
                        </span>
                        <span className="title">BLUEMOON</span>
                    </Link>
                </li>

                <li>
                    <Link to="dashboard">
                        <span className="icon">
                            <ion-icon name="home-outline"></ion-icon>
                        </span>
                        <span className="title">Trang chủ</span>
                    </Link>
                </li>

                <li>
                    <Link to="dashboard">
                        <span className="icon">
                            <ion-icon name="people-outline"></ion-icon>
                        </span>
                        <span className="title">Quản lí căn hộ và cư dân</span>
                    </Link>
                </li>

                <li>
                    <Link to="/fee_manage">
                        <span className="icon">
                            <ion-icon name="cash-outline"></ion-icon>
                        </span>
                        <span className="title">Quản lý thu phí chung cư</span>
                    </Link>
                </li>

                <li>
                    <Link to="stats">
                        <span className="icon">
                            <ion-icon name="stats-chart-outline"></ion-icon>
                        </span>
                        <span className="title">Thống kê</span>
                    </Link>
                </li>

                <li>
                    <Link to="/password">
                        <span className="icon">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                        </span>
                        <span className="title">Đổi mật khẩu</span>
                    </Link>
                </li>

                <li>
                    <a href="#">
                        <span className="icon">
                            <ion-icon name="log-out-outline"></ion-icon>
                        </span>
                        <span className="title">Đăng xuất</span>
                    </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
            {/* ----------------------Main ---------------------- */}
        <div className="layout-default__main" ref={mainRef}>
            <div className="layout-default__main--topbar">
                <div className="layout-default__main--toggle" onClick={handleClick}>
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