import { useState, useEffect } from 'react';  
import { Card, Descriptions, Table ,Button, Modal, Form, Input, message } from "antd";
import { EditOutlined ,DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Space , Tag} from 'antd';
import DescriptionPerson from './DescriptionPerson';
import "./style.css"
import ModalEdit from './ModalEdit';
import { useSearchParams } from 'react-router-dom';



const HouseholdInfo = () => {
  const [isModalEdit, setModalEdit] = useState(false)
  const [searchParams] = useSearchParams();
  const householdId = searchParams.get("household_id");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const [editedOwnerInfo, setEditedOwnerInfo] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8386/household/api/v1/detail?householdId=${householdId}`, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    })
    .then((res) => {
      return res.json();
    })
    .then(res => {
      if(res.message === "Success") {
        console.log('household', res);
        const household = res.household;
        setData(handleMembers(household.members));
        const apartments = handleApartment(household.apartments);
        setEditedOwnerInfo({...household.head, floors: apartments.floors, numbers: apartments.numbers });
      }
      else if(res.message)
        alert(res.message);
    })
  }, [householdId]);

  const handleApartment = (apartments) => {
    const numbers = apartments.map(apartment => apartment.number);
    const floors = apartments.map(apartment => (Number(apartment.number) / 100).toFixed(0));
    return {
      floors: floors,
      numbers: numbers
    }
  }

  const handleMembers = (members) => {
    return members.map(member => ({
      name: member.name,
      dob: (new Date(member.dob)).toLocaleDateString('vi-VN'),
      relation_to_head: member.relation_to_head,
      contact_phone: member.contact_phone,
      status: member.status,
    }))
  }


  {/*=========================Xử lí bảng thông tin người ở trong căn hộ =======================>*/}
     
  const tableColumns = [
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
      dataIndex: "relation_to_head",
      filters: [],
    },
    {
      title: "Số điện thoại",
      dataIndex: "contact_phone",
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
          <Button color="default" icon={<EditOutlined />} onClick={setIsModalVisible(true)} />
        </Space>
      ),
    },
  ];

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
      if(data && isDeleted) {
        setData(data.filter((item) => !selectedRows.includes(item)));
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
            {editedOwnerInfo?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Số tầng">
            {editedOwnerInfo?.floors}
          </Descriptions.Item>
          <Descriptions.Item label="Số căn hộ">
            {editedOwnerInfo?.numbers}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {editedOwnerInfo?.contact_phone}
          </Descriptions.Item>
          <Descriptions.Item label="CCCD">
            {editedOwnerInfo?.cic}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">
            {(new Date(editedOwnerInfo?.dob)).toLocaleDateString('vi-VN')}
          </Descriptions.Item>
          <Descriptions.Item label="Quốc tịch">
            {editedOwnerInfo?.nation}
          </Descriptions.Item>
          <Descriptions.Item label="Giới tính">
            {editedOwnerInfo?.gender}
          </Descriptions.Item>
          <Descriptions.Item label="Nghề Nghiệp">
            {editedOwnerInfo?.occupation}
          </Descriptions.Item>
          <Descriptions.Item label="Quê quán">
            {editedOwnerInfo?.hometown}
          </Descriptions.Item>
          <Descriptions.Item label="Dân tộc">
            {editedOwnerInfo?.ethnicity}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng Thái">
            {editedOwnerInfo?.status}
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
        dataSource={data}
      />
      </Card>
    </div>
    </>
  );
};

export default HouseholdInfo;
