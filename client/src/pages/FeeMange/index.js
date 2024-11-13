import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import axios from 'axios';
import "./style.css"

function FeeMange(){
  const [totalPayment, setTotalPayments] = useState([]);
  
  useEffect(() => {
    // Gọi API khi component được load
    axios.get('http://localhost:3180/payments/api/v1/totalPayment')  
      .then(response => {
        setTotalPayments(response.data.data); // Lấy dữ liệu từ response.data.data nếu API trả về dạng này
      })
      .catch(error => {
        console.error("Error fetching fees data:", error);
      });
  }, []);
  return (
    <>
      <div class="details__fee">
                <div class="recentCt">
                    <div class="cardHeader">
                        <h2>Quản lý thu phí chung cư</h2>
                        <button class="btn">Thêm khoản phí mới</button>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <td>Tên hộ gia đình</td>
                                <td>Tổng phí</td>
                                <td>Trạng thái</td>
                                <td>Chi tiết</td>
                            </tr>
                        </thead>
                        <tbody>
                            {totalPayment.map((Tpayment,index) => (
                              <tr key={index}>
                                <td>{Tpayment.headName}</td>
                                <td>{Tpayment.totalAmount}</td>
                                  <span className={Tpayment.totalAmount === 0 ? "status-paid" : "status-unpaid"}>
                                    {Tpayment.totalAmount === 0 ? "Đã thanh toán" : "Chưa thanh toán"}
                                  </span>
                                <td>
                                  <Link to="/detail">
                                    <button class="btn-details">Xem</button>
                                  </Link>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
    </>
  )
}
export default FeeMange