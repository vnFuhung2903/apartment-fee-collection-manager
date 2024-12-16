import React, { useEffect, useState } from 'react';  
import { Card, Descriptions, Button, Modal,Table } from "antd";
import { Space , Tag} from 'antd';
import { EditOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import DescriptionPerson from './DescriptionPerson';
import "./style.css"
import ModalEdit from './ModalEdit';



const HouseholdInfo = () => {
  const [isModalEdit, setModalEdit] = useState(false)
  const [editedOwnerInfo, setEditedOwnerInfo] = useState({
    name: "Nguyễn Văn A",
    floornumber: "2",
    apartmentNumber: "202",
    phone: "0987654321",
    cic: "123456789012",
    dob: "1979-05-12",
    nationality: "Việt Nam",
    gender: "Nam",
    occupation: "Kỹ sư",
    hometown: "Hà Nội",
    ethnic: "Kinh",
    status: "Thường trú",
    movingIn: "2020-10-20"
  });


  {/*=========================Xử lí bảng thông tin người ở trong căn hộ =======================>*/}
     
  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "name",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
    },
    {
      title: "Quan hệ",
      dataIndex: "relation_to_owner",
      filters: [],
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      render: (status) => {
        let color = status === "Thường trú" ? "orange" : " red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Mở rộng",
      key: "action",
      sorter: true,
      render: () => (
        <Space size="middle">
          <Button color="default" icon={<EditOutlined />} />
        </Space>
      ),
    },
  ];

  const residents = [
    {
      key: "1",
      name: "Nguyễn Văn A",
      phone: "0987654321",
      cic: "123456789012",
      dob: "1979-05-12",
      relationship: "Chủ nhà",
      nationality: "Việt Nam",
      gender: "Nam",
      occupation: "Kỹ sư",
      hometown: "Hà Nội",
      ethnic: "Kinh",
      status: "Thường trú",
    },
    {
      key: "2",
      name: "Nguyễn Thị B",
      phone: "0981234567",
      cic: "123456789013",
      dob: "1981-03-25",
      relationship: "Vợ",
      nationality: "Việt Nam",
      gender: "Nữ",
      occupation: "Giáo viên",
      hometown: "Hải Phòng",
      ethnic: "Kinh",
      status: "Thường trú",
    },
    {
      key: "3",
      name: "Nguyễn Văn C",
      phone: "0976543210",
      cic: "123456789014",
      dob: "2004-07-10",
      relationship: "Con trai",
      nationality: "Việt Nam",
      gender: "Nam",
      occupation: "Sinh viên",
      hometown: "Hà Nội",
      ethnic: "Kinh",
      status: "Thường trú",
    },
    {
      key: "4",
      name: "Nguyễn Thị D",
      phone: "0976123456",
      cic: "123456789015",
      dob: "2006-01-15",
      relationship: "Con gái",
      nationality: "Việt Nam",
      gender: "Nữ",
      occupation: "Học sinh",
      hometown: "Hà Nội",
      ethnic: "Kinh",
      status: "Thường trú",
    },
  ];

  const [data, setData] = useState(
    residents.map((record) => {
      return {
        key: record.key,
        name: record.name,
        dob: record.dob,
        relation_to_owner: record.relationship,
        phone: record.phone,
        status: record.status,
        description: record,
      };
    })
  );

  const defaultExpandable = {
    expandedRowRender: (record) => (
      <DescriptionPerson person={{ ...record.description }} />
    ),
  };

  const [expandable, setExpandable] = useState(defaultExpandable);
  const [selectedRows, setSelectedRows] = useState([]);
  const [top, setTop] = useState("none");
  const [bottom, setBottom] = useState("bottomRight");
  const [appearDelete, setAppearDelete] = useState(false);
  const [isDeleted,setIsDeleted] = useState(false);

  useEffect(()=>{
      if(isDeleted){
        setData(data.filter((item) => !selectedRows.includes(item)));
        console.log(data);
        setIsDeleted(false);
        setAppearDelete(false);
      }
  },[selectedRows,isDeleted]);

  const handleExpandChange = (enable) => {
    setExpandable(enable ? defaultExpandable : undefined);
  };
  const handleRowSelectionChange = (keys, rows) => {
      setAppearDelete(rows.length === 0 ? false: true);
      setSelectedRows(rows);
  }; 
  const handleDelete = () => {
      setIsDeleted(true);
  };

  const handleConfirm = () => {
      Modal.confirm({
          title : "Confirm",
          icon : <ExclamationCircleOutlined />,
          content: "Xác nhận xóa?",
          okText:"Xác nhận",
          cancelText:"Hủy",
          centered: true,
          onOk: handleDelete,
      });
  };

  const tableColumns = columns;

  const tableProps = {
    rowSelection: {
      onChange: handleRowSelectionChange,
    },
    expandable,
  };

  return (
   <> 
    <div style={{ padding: 24 }}>
      {/* Thông tin chủ hộ */}
      <Card
        title="Thông tin chủ hộ"
        bordered={false}
        style={{ marginBottom: 24 }}
        extra={<Button type="primary" onClick={() => {setModalEdit(true)}}>Sửa</Button>}
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
      
      {/* Modal sửa thông tin cá nhân */}
      <ModalEdit isModalEdit={isModalEdit} setModalEdit={setModalEdit} personInfo={editedOwnerInfo} updateInfor={setEditedOwnerInfo} />

      {/* Danh sách người ở trong căn hộ */}
      <Card title="Danh sách người ở trong căn hộ" bordered={false} extra= {appearDelete? <Button onClick={handleConfirm} color="danger" variant="filled">Xóa</Button> : null}>
      <Table
        {...tableProps}
        pagination={{
          position: [top, bottom],
        }}
        columns={tableColumns}
        dataSource={/*hasData ?*/ data}
      />
      </Card>
    </div>
    </>
  );
};

export default HouseholdInfo;
