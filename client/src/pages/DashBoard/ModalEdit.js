import React ,{useState,useEffect} from "react";
import { Modal, DatePicker, Form, Input, InputNumber, Radio, Select, Row, Col } from "antd";
import "./style.css";
import moment from "moment";
import { useSearchParams } from "react-router-dom";

function ModalEdit (props){
    const [form] = Form.useForm();
    const {householdId, isModalEdit, onCancel, updateInfor, personInfo ={}} = props;
    const [isMovingOut, setIsMovingOut] = useState(personInfo?.status === "Thường trú" ? false : true);
    const isOwner = personInfo?.relation_to_head ? false : true;
    useEffect(() => {
      if (personInfo) {
        form.setFieldsValue({
          ...personInfo,
          dob: personInfo.dob ? moment(personInfo.dob, "YYYY-MM-DD") : null,
          movingIn: personInfo.movingIn ? moment(personInfo.movingIn, "YYYY-MM-DD") : null,
          endTemporary: personInfo.endTemporary && isMovingOut ? moment(personInfo.endTemporary, "YYYY-MM-DD") : null,
        });
      }
    }, [personInfo, form]);
    const handleOk = async (e) => {
      const values = await form.validateFields();
      updateInfor(values);
      onCancel();
      e.preventDefault();
      let res = await fetch(`http://localhost:8386/person/api/v1/edit?id=${personInfo._id}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({...values, householdId: householdId})
      });
      const data = await res.json();
      if(data.message && data.message !== "Success")
        alert(data.message);
      if(!isOwner) {
        await fetch(`http://localhost:8386/household/api/v1/editMember?id=${householdId}`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({ member_id: personInfo._id, relation_to_head: values.relation_to_head })
        });
        const data = await res.json();
        if(data.message && data.message !== "Success")
          alert(data.message);
      }
    }
    const handleChangeStatus = (e) => {
      const {value} = e.target;
      if(value === "Thường trú"){
        setIsMovingOut(false);
      }
      else{
        setIsMovingOut(true);
      }
    };


    return (
        <Modal
        title="Chỉnh sửa thông tin"
        open={isModalEdit}
        onOk={handleOk}
        onCancel={() => {
          onCancel();
        }}
        okText="Lưu"
        cancelText="Hủy"
        width={900}
        >
       <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        style={{ width: 800}}
        initialValues={{
          ...personInfo, 
          dob: personInfo.dob ? moment(personInfo.dob, "YYYY-MM-DD") : null,
          movingIn: personInfo.movingIn ? moment(personInfo.movingIn, "YYYY-MM-DD") : null,
          endTemporary: personInfo.endTemporary ? moment(personInfo.endTemporary, "YYYY-MM-DD") : null
        }}
      >
        <Row gutter={24}>
          <Col span={10}>
            <Form.Item label="Họ và tên" name="name" rules={[{  message: "Vui lòng nhập họ và tên" }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="SĐT" name="contact_phone">
              <Input />
            </Form.Item>
          </Col>

          <Col span={10}>
            <Form.Item label="CCCD" name="cic">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Ngày sinh" name="dob">
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
          </Col>

          <Col span={10}>
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

          <Col span={10}>
            <Form.Item label="Quốc tịch" name="nation">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Quê quán" name="hometown">
              <Input />
            </Form.Item>
          </Col>

          <Col span={10}>
            <Form.Item label="Dân tộc" name="ethnicity">
              <Input />
            </Form.Item>
          </Col>
          {isOwner && <Col span={12}>
            <Form.Item label="Số tầng" name="floors">
              <InputNumber />
            </Form.Item>
          </Col>}
          {isOwner && <Col span={10}>
            <Form.Item label="Số căn hộ" name="numbers">
              <InputNumber />
            </Form.Item>
          </Col>}
          <Col span={12}>
            <Form.Item label="Trạng thái" name="status">
              <Radio.Group onChange={handleChangeStatus}>
                <Radio value="Thường trú">Thường trú</Radio>
                <Radio value="Tạm trú">Tạm trú</Radio>
                <Radio value="Tạm vắng" >Tạm vắng</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="Thời gian đến" name="movingIn">
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Thời gian đi" name="endTemporary">
              <DatePicker format="YYYY-MM-DD" disabled = {!isMovingOut}/>
            </Form.Item>
          </Col>
          {!isOwner && <Col span={10}>
            <Form.Item label="Quan hệ" name="relation_to_head">
            <Select>
                <Select.Option value="Con cái">Con cái</Select.Option>
                <Select.Option value="Vợ chồng">Vợ chồng</Select.Option>
                <Select.Option value="Bố mẹ">Bố mẹ</Select.Option>
                <Select.Option value="Họ hàng">Họ hàng</Select.Option>
                <Select.Option value="Anh em">Anh em</Select.Option>
              </Select>
            </Form.Item>
          </Col>}
        </Row>
      </Form>
    </Modal>
  );
}

export default ModalEdit;
