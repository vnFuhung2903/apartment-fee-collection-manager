import "./style.css"
import {useState, useEffect} from "react"
import axios from 'axios'
import { Link } from 'react-router-dom';

function Detail(){
    const [fees, setFees] = useState([]);
    useEffect(() => {
        // Gọi API khi component Detail được load
        axios.get('http://localhost:8386/fees/api/v1/fees')  
          .then(response => {
            setFees(response.data);
          })
          .catch(error => {
            console.error("Error fetching fees data:", error);
          });
      }, []);
    
  return (
    <>
      <div className="details__fee">
                <div className="recentCt">
                    <div className="cardHeader">
                        <h2>Chi tiết các khoản phí cho Hộ gia đình: Nguyễn Văn A</h2>
                        <Link to="/fee_manage" className="btn">Quay lại</Link>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <td>Loại phí</td>
                                <td>Số tiền</td>
                                <td>Ngày thu</td>
                                <td>Trạng thái</td>
                            </tr>
                        </thead>
                        <tbody>
                            {fees.map((fee, index) => (
                                <tr key={index}>
                                    <td>{fee.name}</td>
                                    <td>{fee.amount} VNĐ</td>
                                    <td>
                                        {fee.due ? new Date(fee.due).toLocaleDateString('vi-VN') : 'Chưa có ngày'}                                     
                                    </td>
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