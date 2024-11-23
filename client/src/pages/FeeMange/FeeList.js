import "./style.css"
import { Link, useNavigate } from 'react-router-dom';
import { CloseOutlined } from "@ant-design/icons"
import { useState,useEffect  } from "react";
import axios from "axios";

function FeeList(){
  const navigate = useNavigate();
  const [fees, getFees] = useState([]);
  // const handleDelete = (id) => {
  //   setFees(fees.filter(fee => fee.id !== id));
  // };

  const handleEdit = (fee) => {
    navigate("/edit_fee", { state: { fee } });
  };
  useEffect(() => {
    // Gọi API khi component Detail được load
    axios
      .get("http://localhost:8386/fees/api/v1/fees")
      .then((response) => {
        getFees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching fees data:", error);
      });
  }, []);

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
            {fees.map((fee, index) => {
              const formattedDueDate = fee.due ? new Date(fee.due).toLocaleDateString("vi-VN") : "Không xác định";
              return (
                <tr key={index + 1}>
                  <td>{index + 1}</td> 
                  <td>{fee.name}</td>
                  <td>{fee.amount.toLocaleString("vi-VN")} VNĐ</td>
                  <td>{formattedDueDate}</td>
                  <td>{fee.status}</td>
                  <td>
                    <button className="btn-details" onClick={() => handleEdit(fee)}>Cập nhật</button>
                    <button className="btn-details delete-icon" ><CloseOutlined /></button>
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default FeeList;