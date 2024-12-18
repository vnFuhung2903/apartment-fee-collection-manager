import React, { useState, useEffect, useMemo } from 'react';
import { Link } from "react-router-dom"
import "./style.css"
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalPayments } from "../../actions/feeManage";
import { Form, Select, Col, Row, DatePicker, Modal, Input, Checkbox, InputNumber } from 'antd';
import dayjs from 'dayjs';
import axios from "axios";
import { message } from "antd";

function FeeMange(){

  const dispatch = useDispatch();
  const totalPayment = useSelector((state) => state.feeManageReducer.totalPayments);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    dispatch(fetchTotalPayments());
  }, [dispatch, reload]);

  //Dữ liệu để lọc
  const householdName = [
    { value: "", label: "None" },
    ...[...new Set(totalPayment.map(Tpayment => Tpayment.householdHead))].map(householdHead => ({
      value: householdHead,
      label: householdHead,
    })),
  ];
  
  const paymentName = [
    { value: "", label: "None" },
    ...[...new Set(totalPayment.map(Tpayment => Tpayment.feeName))].map(feeName => ({
      value: feeName,
      label: feeName,
    })),
  ]

  //Modal cập nhật
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [checkedPayments, setCheckedPayments] = useState([]);
  const [transactionID, setTransactionID] = useState("");
  const [transactionTime, setTransactionTime] = useState(dayjs());
  const [filters, setFilters] = useState({
    paymentName: null, 
    householdName: null, 
    fromDate: null,      
    toDate: null      
  });
  const filteredPayments = useMemo(() => {
    return totalPayment.filter((payment) => {
      if (filters.paymentName && filters.paymentName !== payment.feeName) {
        return false;
      }
      // Lọc theo tên chủ hộ
      if (filters.householdName && filters.householdName !== payment.householdHead) {
        return false;
      }
      // Lọc theo ngày
      const paymentDate = dayjs(payment.payment_date); // Giả sử `payment.date` chứa ngày
      if (filters.fromDate && paymentDate.isBefore(dayjs(filters.fromDate))) {
        return false;
      }
      if (filters.toDate && paymentDate.isAfter(dayjs(filters.toDate))) {
        return false;
      }
      return true;
    });
  }, [totalPayment, filters]);

  const handleCheck = (paymentId) => {
    setCheckedPayments((prev) => {
      if (prev.includes(paymentId)) {
        return prev.filter((id) => id !== paymentId);
      } else {
        return [...prev, paymentId];
      }
    });
  };

  // Hàm mở Modal
  const showModal = () => {
    setIsModalVisible(true);
    //Tạo ID giao dịch
    const generateTransactionID = () => {
      const now = new Date().getTime();
      const hash = now.toString(36);
      return hash.slice(-8); // Lấy 8 ký tự cuối
    };
    const transactionTime = dayjs().format('DD/MM/YYYY HH:mm:ss');
    const transactionID = generateTransactionID();
    setTransactionID(transactionID);
    setTransactionTime(transactionTime);
  };

  // Hàm đóng Modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const selectedPayments = useMemo(() => {
    return totalPayment.filter(payment => checkedPayments.includes(payment.payment_id));
  }, [totalPayment, checkedPayments]);

  const totalAmount = selectedPayments.reduce(
    (sum, item) =>
      sum += item.amount,
    0
  ) || 0;

  const handlePayment = async () => {
    try {
      // Gửi danh sách payment_id đến API
      const response = await axios.post("http://localhost:8386/payments/api/v1/changes", {
        payment_ids: selectedPayments.map((payment) => payment.payment_id),
        bill_id:transactionID,
        bill_time: dayjs().toISOString(),
      });
  
      // Kiểm tra phản hồi từ API
      if (response.status === 200) {
        message.success(response.data.message); // Hiển thị thông báo thành công
        await setReload(!reload);
        await fetchTotalPayments();
        handleCancel(); // Đóng modal
        // Reset danh sách các hóa đơn đã được check
        setCheckedPayments([]); 
      } else {
        message.error("Có lỗi xảy ra khi thanh toán hóa đơn.");
      }
    } catch (error) {
      console.error("Error while updating payments:", error);
      message.error("Lỗi máy chủ. Vui lòng thử lại sau.");
    }
  };

  return (
    <>
      <div className="details__fee">
        <div className="recentCt">
          <div className="cardHeader">
              <h2>Quản lý thu phí chung cư</h2>
              <Link to="/fee_list">
                <button className="btn">Danh sách các loại phí</button>
              </Link>
          </div>
          <div className="filter_fee">
            <Form
              layout="vertical"
            >
              <Row
                gutter={{
                  xs: 8,
                  sm: 16,
                  md: 24,
                  lg: 32,
                }}
              >
                <Col className="gutter-row" span={6}>
                  <Form.Item label="Tên khoản thu">
                    <Select 
                      placeholder="Chọn khoản thu" 
                      options={paymentName}
                      onChange={(value) => setFilters((prev) => ({ ...prev, paymentName: value }))}
                    >
                    </Select>
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={6}>
                  <Form.Item label="Tên chủ hộ">
                    <Select 
                      showSearch
                      placeholder="Chọn chủ hộ" 
                      filterOption={(input, option) => 
                        (option.label).includes(input)
                      }
                      options={householdName}
                      onChange={(value) => setFilters((prev) => ({ ...prev, householdName: value }))}
                    ></Select>
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={6}>
                  <Form.Item label="Từ ngày">
                    <DatePicker 
                      onChange={(date, dateString) => setFilters((prev) => ({ ...prev, fromDate: dateString }))}
                    />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={6}>
                  <Form.Item label="Đến ngày">
                    <DatePicker 
                      onChange={(date, dateString) => setFilters((prev) => ({ ...prev, toDate: dateString }))}
                    />
                  </Form.Item>
                </Col>
              </Row>
              
            </Form>
          </div>

          <table className='overall'>
            <thead>
              <tr>
                <td>ID hoá đơn</td>
                <td>Hạn nộp</td>
                <td>Tên hộ dân cư</td>
                <td>Tên khoản thu</td>
                <td>Số tiền cần thu</td>
                <td>Trạng thái</td>
                <td><button className="btn-details" onClick={showModal}>Cập nhật</button></td>
              </tr>
            </thead>
            <tbody>
            {filteredPayments.map((Tpayment, index) => (
                <tr key={index}>
                  <td>{Tpayment.payment_id}</td> {/* Hiển thị payment_id */}
                  <td>{dayjs(Tpayment.payment_date).format('DD/MM/YYYY')}</td> {/* Định dạng ngày nộp */}
                  <td>{Tpayment.householdHead}</td>
                  <td>{Tpayment.feeName}</td> {/* Hiển thị tên khoản thu */}
                  <td>{Number(Tpayment.amount).toLocaleString("vi-VN")} VNĐ</td> {/* Định dạng số tiền */}
                  <td>{Tpayment.status}</td> {/* Hiển thị tên khoản thu */}
                  <td>
                    <Checkbox 
                      className='checkbox-btn'
                      checked={checkedPayments.includes(Tpayment.payment_id)} 
                      onChange={() => handleCheck(Tpayment.payment_id)}
                      disabled={Tpayment.status === "Đã thanh toán"}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Modal
            title={`Thanh toán hoá đơn cho hộ: `}
            open={isModalVisible}
            onCancel={handleCancel}
            okText="Thanh toán"
            cancelText="Hủy"
            onOk={handlePayment}
          >
            <Form layout="horizontal">
              <Form.Item label="ID giao dịch">
                <Input value={transactionID} readOnly />
              </Form.Item>
              <hr/>
              <table className="payment">
                <thead>
                  <td>ID hoá đơn</td>
                  <td>Loại phí</td>
                  <td>Giá (VNĐ)</td>
                  <td>Hạn nộp</td>
                </thead>
                <tbody>
                  {selectedPayments.map((Tpayment, index) => (
                    <tr key={index}>
                      <td>{Tpayment.payment_id}</td>
                      <td>{Tpayment.feeName}</td> 
                      <td>{Number(Tpayment.amount).toLocaleString('vi-VN')}</td>
                      <td>{dayjs(Tpayment.payment_date).format('DD/MM/YYYY')}</td>
                  </tr>
                  ))}
                  </tbody>
              </table>
              <hr/>
              <Form.Item>
                <Row
                  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                  }}
                >
                  <Col className="gutter-row" span={12}>
                    <Form.Item label="Ngày thanh toán">
                      <Input value={dayjs().format('DD/MM/YYYY')} readOnly/>
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" span={12}>
                    <Form.Item 
                      label="Tổng (VNĐ):" 
                      labelCol={{ span: 16 }}
                      wrapperCol={{ span: 8 }} 
                      labelAlign='right'
                      textAlign='right'
                    >
                      <InputNumber 
                        value={totalAmount} 
                        readOnly
                        formatter={(value) => `${Number(value).toLocaleString("vi-VN")}`} 
                        parser={(value) => value.replace(/\D/g, '')}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Modal>

        </div>
    </div>
    </>
  )
}
export default FeeMange