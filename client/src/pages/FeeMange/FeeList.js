import "./style.css"
import { Link, useNavigate } from 'react-router-dom';
import { CloseOutlined } from "@ant-design/icons"
import { useState } from "react";

function FeeList(){
  const navigate = useNavigate();
  const [fees, setFees] = useState([
    { id: 1, name: "Phí dịch vụ chung cư", price: 3000, dueDate: "2024-11-21", mandatory: "Bắt buộc" },
    { id: 2, name: "Phí dịch vụ chung cư", price: 3000, dueDate: "2024-11-30", mandatory: "Bắt buộc" },
    { id: 3, name: "Quỹ từ thiện", price: 10000, dueDate: "2024-11-30", mandatory: "Không bắt buộc" },
  ]);

  const handleDelete = (id) => {
    setFees(fees.filter(fee => fee.id !== id));
  };

  const handleEdit = (fee) => {
    navigate("/edit_fee", { state: { fee } });
  };

  return (
    <>
      <div className="details__fee">
        <div className="recentCt">
          <div className="cardHeader">
            <h2>Danh sách các loại phí</h2>
              <div className="all-button"> 
                <Link to="/fee_create" className="btn">Thêm loại phí</Link>
                <Link to="/fee_manage" className="btn">Quay lại</Link>
              </div>
          </div>

          <table>
            <thead>
              <tr>
                <td>STT</td>
                <td>Loại phí</td>
                <td>Giá/đơn vị</td>
                <td>Hạn nộp</td>
                <td>Bắt buộc</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {fees.map(fee => (
                <tr key={fee.id}>
                  <td>{fee.id}</td>
                  <td>{fee.name}</td>
                  <td>{fee.price}</td>
                  <td>{fee.dueDate}</td>
                  <td>{fee.mandatory}</td>
                  <td>
                    <button className="btn-details" onClick={() => handleEdit(fee)}>Cập nhật</button>
                    <button className="btn-details delete-icon" onClick={() => handleDelete(fee.id)}><CloseOutlined /></button>
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

export default FeeList;