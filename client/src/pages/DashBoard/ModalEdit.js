import React, { useState } from "react";
import {
  Modal,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Flex,
  Grid,
  Row,
  Col
} from "antd";

function ModalEdit(props){
   const {  RangePicker } = DatePicker;
    const [form] = Form.useForm();
    const {isModalEdit,setModalEdit,updateInfor,personInfo} = props;
    form.setFieldsValue(personInfo); 
    const handleOk = async () => {
        const values = await form.validateFields();
        updateInfor(values);
        setModalEdit(false);
    }

    
    return (
        <Modal
        title="Chỉnh sửa thông tin"
        open={isModalEdit}
        //onOk={handleOk}
       // onCancel={()=>{setModalEdit(false)}}
        okText="Lưu"
        cancelText="Hủy"
        width={900}
        >
       <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        style={{ width: 800}}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Họ và tên" name="name">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="SĐT" name="phone">
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
              <DatePicker />
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
              <InputNumber />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Số nhà" name="apartmentNumber">
              <InputNumber />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Trạng thái">
              <Radio.Group style={{ display: 'flex', gap: '16px' }}>
                <Radio value="Thường trú" >Thường trú</Radio>
                <Radio value="Tạm trú" style={{position:"absolute",right:10}}>Tạm trú</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Thời gian">
              <RangePicker />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
    )
}

export default ModalEdit;