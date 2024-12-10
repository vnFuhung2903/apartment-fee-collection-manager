import { useState } from 'react';  
import { Card, Descriptions, Table ,Button, Modal, Form, Input, message } from "antd";
import { Space } from 'antd';
import { EditOutlined ,DeleteOutlined } from '@ant-design/icons';




const HouseholdInfo = () => {
  // Dữ liệu mẫu

  // const residents = [
  //   {
  //     key: "1",
  //     name: "Nguyễn Văn A",
  //     age: 45,
  //     relationship: "Chủ hộ",
  //     phone: "0987654321",
  //   },
  //   {
  //     key: "2",
  //     name: "Nguyễn Thị B",
  //     age: 43,
  //     relationship: "Vợ",
  //     phone: "0981234567",
  //   },
  //   {
  //     key: "3",
  //     name: "Nguyễn Văn C",
  //     age: 20,
  //     relationship: "Con trai",
  //     phone: "0976543210",
  //   },
  //   {
  //     key: "4",
  //     name: "Nguyễn Thị D",
  //     age: 18,
  //     relationship: "Con gái",
  //     phone: "0976123456",
  //   },
  // ];

  // Cột của bảng danh sách cư dân
  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tuổi",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Quan hệ",
      dataIndex: "relationship",
      key: "relationship",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title:"Mở rộng",
      key: "expand",
      render: (_, record) => (
      <Space size="middle">
        <Button><EditOutlined /></Button>
        <Button><DeleteOutlined /></Button>
      </Space>
      ),
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editedOwnerInfo, setEditedOwnerInfo] = useState({
    name: "Nguyễn Văn A",
    floornumber: "10",
    apartmentNumber: "202",
    phone: "0987654321",
    cic: "123456789012",
    dob: "1979-05-12",
    nationality: "Việt Nam",
    gender: "Nam",
    occupation: "Kỹ sư",
    hometown: "Hà Nội",
    ethnic: "Kinh",
    status: "Thường trú"
  });

  // Hàm mở Modal
  const showModal = () => {
    form.setFieldsValue(editedOwnerInfo); 
    setIsModalVisible(true);
  };

  // Hàm đóng Modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

 
  const handleOk = async () => {
    const values = await form.validateFields();
    setEditedOwnerInfo(values); 
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: 24 }}>
      {/* Thông tin chủ hộ */}
      <Card
        title="Thông tin chủ hộ"
        bordered={false}
        style={{ marginBottom: 24 }}
        extra={<Button type="primary" onClick={showModal}>Sửa</Button>}
      >
        <Descriptions column={3}>
          <Descriptions.Item label="Họ và tên">
            {editedOwnerInfo.name}
          </Descriptions.Item>
          <Descriptions.Item label="Số tầng">
            {editedOwnerInfo.floornumber}
          </Descriptions.Item>
          <Descriptions.Item label="Số căn hộ">
            {editedOwnerInfo.apartmentNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {editedOwnerInfo.phone}
          </Descriptions.Item>
          <Descriptions.Item label="CCCD">
            {editedOwnerInfo.cic}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">
            {editedOwnerInfo.dob}
          </Descriptions.Item>
          <Descriptions.Item label="Quốc tịch">
            {editedOwnerInfo.nationality}
          </Descriptions.Item>
          <Descriptions.Item label="Giới tính">
            {editedOwnerInfo.gender}
          </Descriptions.Item>
          <Descriptions.Item label="Nghề Nghiệp">
            {editedOwnerInfo.occupation}
          </Descriptions.Item>
          <Descriptions.Item label="Quê quán">
            {editedOwnerInfo.hometown}
          </Descriptions.Item>
          <Descriptions.Item label="Dân tộc">
            {editedOwnerInfo.ethnic}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng Thái">
            {editedOwnerInfo.status}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Modal chỉnh sửa thông tin */}
      <Modal
        title="Chỉnh sửa thông tin"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="horizontal" initialValues={editedOwnerInfo}>

          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số tầng"
            name="floornumber"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số căn hộ"
            name="apartmentNumber"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="CCCD"
            name="cic"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ngày sinh"
            name="dob"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Quốc tịch"
            name="nationality"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Nghề Nghiệp"
            name="occupation"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Quê quán"
            name="hometown"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Dân tộc"
            name="ethnic"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Trạng Thái"
            name="status"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Danh sách người ở trong căn hộ */}
      <Card title="Danh sách người ở trong căn hộ" bordered={false}>
        <Table
          dataSource={residents}
          columns={columns}
          pagination={false}
          bordered="Mở rộng"
        />
      </Card>
    </div>
  );
};

export default HouseholdInfo;
