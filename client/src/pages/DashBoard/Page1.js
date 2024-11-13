import "./style.css"
import customer01 from "../Layout/assets/imgs/customer01.jpg"
import { Link } from "react-router-dom"

function Page1(){
  return (
    <>
      {/* Card box */}
      <div className="cardBox">
        <div className="card">
            <div>
                <div className="numbers">200</div>
                <div className="cardName">Căn hộ</div>
            </div>

            <div className="iconBx">
                <ion-icon name="storefront-outline"></ion-icon>
            </div>
        </div>

        <div className="card">
            <div>
                <div className="numbers">409</div>
                <div className="cardName">Dân cư</div>
            </div>

            <div className="iconBx">
                <ion-icon name="people-circle-outline"></ion-icon>
            </div>
        </div>

        <div className="card">
            <div>
                <div className="numbers">394</div>
                <div className="cardName">Tạm trú</div>
            </div>

            <div className="iconBx">
                <ion-icon name="person-add-outline"></ion-icon>
            </div>
        </div>

        <div className="card">
            <div>
                <div className="numbers">23</div>
                <div className="cardName">Tạm vắng</div>
            </div>

            <div className="iconBx">
                <ion-icon name="person-remove-outline"></ion-icon>
            </div>
        </div>
      </div>

      {/*  */}

      <div className="details">
        <div className="recentCt">
          <div className="cardHeader">
            <h2>Quản lí dân cư</h2>
            <Link to="/view_all" className="btn">View All</Link>
          </div>

          <table>
            <thead>
                <tr>
                    <td>Tên chủ căn hộ</td>
                    <td>Tầng</td>
                    <td>Số căn hộ</td>
                    <td>Chi tiết</td>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>Star Refrigerator</td>
                    <td>8</td>
                    <td>808</td>
                    <td><span className="status">Mở rộng</span></td>
                </tr>

                <tr>
                    <td>Dell Laptop</td>
                    <td>9</td>
                    <td>902</td>
                    <td><span className="status">Mở rộng</span></td>
                </tr>

                <tr>
                    <td>Apple Watch</td>
                    <td>5</td>
                    <td>502</td>
                    <td><span className="status">Mở rộng</span></td>
                </tr>

                <tr>
                    <td>Addidas Shoes</td>
                    <td>3</td>
                    <td>305</td>
                    <td><span className="status">Mở rộng</span></td>
                </tr>

                <tr>
                    <td>Star Refrigerator</td>
                    <td>6</td>
                    <td>607</td>
                    <td><span className="status">Mở rộng</span></td>
                </tr>

                <tr>
                    <td>Dell Laptop</td>
                    <td>3</td>
                    <td>308</td>
                    <td><span className="status">Mở rộng</span></td>
                </tr>

                <tr>
                    <td>Apple Watch</td>
                    <td>6</td>
                    <td>605</td>
                    <td><span className="status">Mở rộng</span></td>
                </tr>

                <tr>
                    <td>Addidas Shoes</td>
                    <td>4</td>
                    <td>405</td>
                    <td><span className="status">Mở rộng</span></td>
                </tr>
            </tbody>
          </table>
        </div>

        <div className="recentCustomers">
          <div className="cardHeader">
            <h2>Recent Customers</h2>
          </div>

          <table>
            <tr>
                <td width="60px">
                    <div className="imgBx"><img src={customer01} alt=""/></div>
                </td>
                <td>
                    <h4>David <br/> <span>Italy</span></h4>
                </td>
            </tr>

            <tr>
                <td width="60px">
                    <div className="imgBx"><img src={customer01} alt=""/></div>
                </td>
                <td>
                    <h4>Amit <br/> <span>India</span></h4>
                </td>
            </tr>

            <tr>
                <td width="60px">
                    <div className="imgBx"><img src={customer01} alt=""/></div>
                </td>
                <td>
                    <h4>David <br/> <span>Italy</span></h4>
                </td>
            </tr>

            <tr>
                <td width="60px">
                    <div className="imgBx"><img src={customer01} alt=""/></div>
                </td>
                <td>
                    <h4>Amit <br/> <span>India</span></h4>
                </td>
            </tr>

            <tr>
                <td width="60px">
                    <div className="imgBx"><img src={customer01} alt=""/></div>
                </td>
                <td>
                    <h4>David <br/> <span>Italy</span></h4>
                </td>
            </tr>

            <tr>
                <td width="60px">
                    <div className="imgBx"><img src={customer01} alt=""/></div>
                </td>
                <td>
                    <h4>Amit <br/> <span>India</span></h4>
                </td>
            </tr>

            <tr>
                <td width="60px">
                    <div className="imgBx"><img src={customer01} alt=""/></div>
                </td>
                <td>
                    <h4>David <br/> <span>Italy</span></h4>
                </td>
            </tr>

            <tr>
                <td width="60px">
                    <div className="imgBx"><img src={customer01} alt=""/></div>
                </td>
                <td>
                    <h4>Amit <br/> <span>India</span></h4>
                </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  )
}

export default Page1