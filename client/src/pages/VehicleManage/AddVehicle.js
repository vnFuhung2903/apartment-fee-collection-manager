import { Input, Form, Button, Radio, Modal, message, Select } from "antd";
import { useEffect, useState, useSelector } from "react";
import { fetchHouseholds } from "../../actions";

function AddVehicle(){
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [households, setHouseholds] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8386/household/api/v1/all", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      if (res.status === 200) return res.json();
    })
    .then((data) => {
      setHouseholds(data);
    });
  }, [])

  const handleSubmit = (value) => {
    const household_id = households.filter(household => value.ownerName !== household.head).at(0)._id;
    fetch("http://localhost:8386/vehicles/api/v2/create", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({...value, household_id })
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if(data.message) {
        if(data.message === "Success") {
          message.success("Thêm phương tiện thành công");
          setIsModalVisible(false);
        }
        else alert(data.message);
      }
    })
  }
  return(
    <>
      <button className="btn" onClick={() => setIsModalVisible(true)}>Thêm phương tiện</button>
      <Modal
        title="Thêm phương tiện:"
        open={isModalVisible}
        onCancel={() => {setIsModalVisible(false)}}
        footer={null} 
      >
        <Form layout="horizontal" name="create-fee" onFinish={handleSubmit}>
          <Form.Item
            label="Tên chủ hộ"
            name="ownName"
            rules={[{ required: true, message: "Bắt buộc!" }]}
          >
            <Select style={{ width: '400px' }}> 
              {
                households.map((household) => (
                  <Select.Option value={household.head}>{household.head}</Select.Option>
                ))
              }
              </Select>
          </Form.Item>

          <Form.Item
            label="Biển số xe"
            name="plate"
            rules={[{ required: true, message: "Bắt buộc!" }]}
          >
            <Input style={{ width: '400px' }}/>
          </Form.Item>

          <Form.Item
            label="Loại phương tiện"
            name="vehicle_type"
            rules={[{ required: true, message: "Bắt buộc!" }]}
          >
            <Radio.Group>
                <Radio value="Ô tô">Ô tô</Radio>
                <Radio value="Xe máy" >Xe máy</Radio>
              </Radio.Group>
          </Form.Item>

          <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div>
              <Button onClick={() => {setIsModalVisible(false)}} style={{ marginRight: 8 }}>
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