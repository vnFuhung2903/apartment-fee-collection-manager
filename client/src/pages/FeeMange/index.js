import { Link } from "react-router-dom"
import "./style.css"

function FeeMange(){
  return (
    <>
      <div className="details__fee">
                <div className="recentCt">
                    <div className="cardHeader">
                        <h2>Quản lý thu phí chung cư</h2>
                        <button className="btn">Thêm khoản phí mới</button>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <td>Tên hộ gia đình</td>
                                <td>Số căn hộ</td>
                                <td>Diện tích</td>
                                <td>Phí dịch vụ</td>
                                <td>Phí quản lý</td>
                                <td>Khoản khác</td>
                                <td>Trạng thái</td>
                                <td>Chi tiết</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Nguyễn Văn A</td>
                                <td>102</td>
                                <td>75 m²</td>
                                <td>500,000 VNĐ</td>
                                <td>200,000 VNĐ</td>
                                <td>100,000 VNĐ</td>
                                <td><span className="status-paid">Đã thanh toán</span></td>
                                <td>
                                  <Link to="/detail">
                                    <button className="btn-details">Xem</button>
                                  </Link>
                                </td>
                            </tr>
                            <tr>
                                <td>Trần Thị B</td>
                                <td>203</td>
                                <td>60 m²</td>
                                <td>400,000 VNĐ</td>
                                <td>200,000 VNĐ</td>
                                <td>50,000 VNĐ</td>
                                <td><span className="status-unpaid">Chưa thanh toán</span></td>
                                <td>
                                  <Link to="/detail">
                                    <button className="btn-details">Xem</button>
                                  </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
    </>
  )
}
export default FeeMange