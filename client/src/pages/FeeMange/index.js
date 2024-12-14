import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom"
import "./style.css"
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalPayments } from "../../actions/feeManage";
import { Form, Select, Col, Row, DatePicker, Modal, Input, InputNumber } from 'antd';
import dayjs from 'dayjs';

function FeeMange(){

  const dispatch = useDispatch();
  const totalPayment = useSelector((state) => state.feeManageReducer.totalPayments);

  useEffect(() => {
    dispatch(fetchTotalPayments());
  }, [dispatch]);

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
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [filters, setFilters] = useState({
    paymentName: null, 
    householdName: null, 
    fromDate: null,      
    toDate: null      
  });
  const filteredPayments = useMemo(() => {
    return totalPayment.filter((payment) => {
      // Lọc theo tên khoản thu
      // if (filters.paymentName && payment.paymentName !== filters.paymentName) {
      //   return false;
      // }
      if (filters.paymentName && filters.paymentName !== "Phí chung cư") {
        return false;
      }
      // Lọc theo tên chủ hộ
      if (filters.householdName && payment.headName !== filters.householdName) {
        return false;
      }
      // Lọc theo ngày
      const paymentDate = dayjs(payment.date); // Giả sử `payment.date` chứa ngày
      if (filters.fromDate && paymentDate.isBefore(dayjs(filters.fromDate))) {
        return false;
      }
      if (filters.toDate && paymentDate.isAfter(dayjs(filters.toDate))) {
        return false;
      }
      return true;
    });
  }, [totalPayment, filters]);


  // Hàm mở Modal
  const showModal = (Tpayment) => {
    setIsModalVisible(true);
    setSelectedPayment(Tpayment);
    //console.log(Tpayment);
  };

  // Hàm đóng Modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
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

          <table>
            <thead>
              <tr>
                <td>ID hoá đơn</td>
                <td>Hạn nộp</td>
                <td>Tên hộ dân cư</td>
                <td>Tên khoản thu</td>
                <td>Số tiền cần thu</td>
                <td>Trạng thái</td>
                <td>Cập nhật</td>
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
                    <button className="btn-details" onClick={() => showModal(Tpayment)}>Cập nhật</button>
                    <Modal
                      title="Chỉnh sửa thông tin"
                      open={isModalVisible}
                      onCancel={handleCancel}
                      okText="Lưu"
                      cancelText="Hủy"
                    >
                      <Form
                        {...formItemLayout}
                        layout="horizontal"
                        name="create-fee"
                        initialValues={{
                          id: Tpayment.payment_id,  // Sử dụng payment_id từ dữ liệu
                          due: dayjs(Tpayment.payment_date),  // Đặt ngày nộp là ngày thanh toán
                          householdName: Tpayment.householdHead,  // Tên chủ hộ
                          paymentName: Tpayment.feeName,  // Tên khoản thu
                          needPay: Tpayment.amount,  // Số tiền cần thu
                          payed: Tpayment.status === "Đã thanh toán" ? Tpayment.amount : 0,  // Kiểm tra trạng thái để điền số tiền đã thu
                        }}
                      >
                        <Form.Item label="ID hoá đơn" name="id">
                          <Input disabled/>
                        </Form.Item>
                        <Form.Item label="Ngày nộp" name="due">
                          <DatePicker />
                        </Form.Item>
                        <Form.Item label="Tên chủ hộ" name="householdName">
                          <Input disabled/>
                        </Form.Item>
                        <Form.Item label="Tên khoản thu" name="paymentName">
                          <Input disabled />
                        </Form.Item>
                        <Form.Item label="Số tiền cần thu" name="needPay">
                          <InputNumber 
                            disabled
                            style={{ width: '100%' }}
                            formatter={(value) => `${Number(value).toLocaleString("vi-VN")}`} 
                            parser={(value) => value.replace(/\D/g, '')}
                          />
                        </Form.Item>
                        <Form.Item label="Số tiền đã thu" name="payed">
                          <InputNumber 
                            style={{ width: '100%' }}
                            formatter={(value) => `${Number(value).toLocaleString("vi-VN")}`} 
                            parser={(value) => value.replace(/\D/g, '')}
                          /> 
                        </Form.Item>
                      </Form>
                    </Modal>
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