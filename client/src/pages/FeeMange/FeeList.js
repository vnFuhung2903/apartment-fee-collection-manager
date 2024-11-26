import "./style.css"
import { Link, useNavigate } from 'react-router-dom';
import { CloseOutlined } from "@ant-design/icons"
import { useState,useEffect  } from "react";
import axios from "axios";
import { Modal } from "antd";

function FeeList(){
  const navigate = useNavigate();
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFees = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8386/fees/api/v1/fees");
      setFees(response.data);
    } catch (error) {
      console.error("Error fetching fees data:", error);
      alert("Có lỗi khi tải dữ liệu!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Hiển thị modal xác nhận trước khi xóa
      Modal.confirm({
        title: "Xác nhận xóa",
        content: "Bạn có chắc chắn muốn xóa loại phí này không?",
        okText: "Xóa",
        okType: "danger",
        cancelText: "Hủy",
        onOk: async () => {
          try {
            const response = await axios.post(
              "http://localhost:8386/fees/api/v1/delete",
              { id },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (response.status === 200 || response.status === 201) {
              alert("Xóa thành công!");
              await fetchFees();
            } else {
              alert("Xóa thất bại!");
            }
          } catch (error) {
            alert("Có lỗi xảy ra khi xóa !")
          } finally {
            setLoading(false);
          }
        },
      });
    } catch (error) {
      alert("Error in delete handler !");
    }
  };

  const handleEdit = (fee) => {
    navigate("/edit_fee", { state: { fee } });
  };
  useEffect(() => {
    fetchFees();
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
                    <button className="btn-details delete-icon" onClick={() => handleDelete(fee._id)} ><CloseOutlined /></button>
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