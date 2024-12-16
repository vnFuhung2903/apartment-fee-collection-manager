import React, { useState, useEffect } from "react";
import { Modal,  DatePicker, Form, Input, InputNumber, Radio, Select, Row, Col } from "antd";
import "./style.css";
import moment from "moment";

function ModalEdit(props) {
  const [form] = Form.useForm();
  const {isModalEdit, setModalEdit, updateInfor, personInfo } = props;
  const [isMovingOut, setIsMovingOut] = useState(personInfo.status === "Tạm trú"? true: false);
  const isOwner = personInfo.relationship === "Chủ Nhà" ? true : false;

 //chỉnh sửa form khi personInfor thay đổi
  useEffect(() => {
    if (personInfo) {
      form.setFieldsValue({
        ...personInfo,
        dob: personInfo.dob ? moment(personInfo.dob, "YYYY-MM-DD") : null,
        movingIn: personInfo.movingIn ? moment(personInfo.movingIn, "YYYY-MM-DD") : null,
        movingOut: personInfo.movingOut ?  moment(personInfo.movingOut, "YYYY-MM-DD") :null,
      });
    }
  }, [personInfo, form]);

  const handleChangeStatus = (e) => {
        const {value} = e.target;
        if(value === "Tạm trú"){
          setIsMovingOut(true);
        }
        else{
          setIsMovingOut(false);
        }
  };
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      
      // Safely handle date fields to ensure they exist before formatting
      const formattedValues = {
        key: personInfo.key,
        ...values,
        dob: values.dob ? values.dob.format("YYYY-MM-DD") : null, // Check if dob exists
        movingIn: values.movingIn ? values.movingIn.format("YYYY-MM-DD") : null, // Check if movingIn exists
        movingOut: isMovingOut && values.movingOut ? values.movingOut.format("YYYY-MM-DD") : null, // Only format movingOut if it's available
      };
      console.log(formattedValues);
      updateInfor(formattedValues);
      setModalEdit(false);
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };
  return (
    <>
    <Modal
      title="Chỉnh sửa thông tin"
      open={isModalEdit}
      onOk={handleOk}
      onCancel={() => setModalEdit(false)}
      okText="Lưu"
      cancelText="Hủy"
      width={900}
    >
      <Form
        form={form}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        style={{ width: 800 }}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Họ và tên" name="name" rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="SĐT" name="phone" rules={[{ required: true, message: "Vui lòng nhập SĐT" }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="CCCD" name="cic">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Ngày sinh" name="dob">
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Giới tính" name="gender">
              <Select>
                <Select.Option value="Nam">Nam</Select.Option>
                <Select.Option value="Nữ">Nữ</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Nghề nghiệp" name="occupation">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Quốc tịch" name="nationality">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Quê quán" name="hometown">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Dân tộc" name="ethnic">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Số tầng" name="floornumber">
              <InputNumber min={0} disabled/>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Số nhà" name="apartmentNumber">
              <InputNumber min={0} disabled/>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Trạng thái" name="status">
              <Radio.Group onChange={handleChangeStatus}>
                <Radio value="Thường trú">Thường trú</Radio>
                <Radio value="Tạm trú">Tạm trú</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Thời gian đến" name="movingIn">
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Thời gian đi" name="movingOut">
              <DatePicker format="YYYY-MM-DD" disabled = {!isMovingOut}/>
            </Form.Item>
          </Col>
          {!isOwner && <Col span={12}>
            <Form.Item label="Quan hệ" name="relationship">
            <Select>
                <Select.Option value="Con cái">Con cái</Select.Option>
                <Select.Option value="Vợ chồng">Vợ chồng</Select.Option>
                <Select.Option value="Bố mẹ">Bố mẹ</Select.Option>
                <Select.Option value="Họ hàng">Họ hàng</Select.Option>
              </Select>
            </Form.Item>
          </Col>}
        </Row>
      </Form>
    </Modal>
    </>
  );
}

export default ModalEdit;
