import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./style.css"


function Detail(){
    const [fees, setFees] = useState([]);
    useEffect(() => {
        // Gọi API khi component Detail được load
        axios.get('http://localhost:3180/fees/api/v1/fees')  
          .then(response => {
            setFees(response.data);
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
                        <h2>Chi tiết các khoản phí cho Hộ gia đình: Nguyễn Văn A</h2>
                        <a href="page1_fee.html" class="btn">Quay lại</a>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <td>Loại phí</td>
                                <td>Số tiền</td>
                                <td>Ngày thu</td>
                                <td>Hình thức</td>
                                <td>Trạng thái</td>
                            </tr>
                        </thead>
                        <tbody>
                            {fees.map((fee, index) => (
                                <tr key={index}>
                                    <td>{fee.name}</td>
                                    <td>{fee.amount} VNĐ</td>
                                    <td>{fee.due}</td>
                                    <td>{fee.status}</td>
                                    <td>
                                        <span className={fee.status === 'paid' ? 'status-paid' : 'status-unpaid'}>
                                        {fee.status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                                        </span>
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
export default Detail