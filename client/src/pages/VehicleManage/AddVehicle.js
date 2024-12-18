import { Input, Form, Button, InputNumber, Select, DatePicker, notification, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function AddVehicle(){
  //Modal cập nhật
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Hàm mở Modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Hàm đóng Modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (e) => {
    console.log(e);
  }
  return(
    <>
      <button className="btn" onClick={() => showModal()}>Thêm phương tiện</button>
      <Modal
        title="Thêm phương tiện:"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null} 
      >
        <Form layout="horizontal" name="create-fee" onFinish={handleSubmit}>
          <Form.Item
            label="Tên chủ hộ"
            name="householdName"
            rules={[{ required: true, message: "Bắt buộc!" }]}
          >
            <Input style={{ width: '400px' }}/>
          </Form.Item>

          <Form.Item
            label="Loại phương tiện"
            name="type"
            rules={[{ required: true, message: "Bắt buộc!" }]}
          >
            <Input style={{ width: '400px' }}/>
          </Form.Item>

          <Form.Item
            label="Biển số xe"
            name="plate"
            rules={[{ required: true, message: "Bắt buộc!" }]}
          >
            <Input style={{ width: '400px' }}/>
          </Form.Item>
          <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div>
              <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                Hủy
              </Button>
              <Button type="primary" htmlType="submit">
                Tạo mới
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default AddVehicle;