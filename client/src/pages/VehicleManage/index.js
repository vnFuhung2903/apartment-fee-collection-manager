import React, { useState, useEffect, useMemo } from 'react';
import "./style.css"
import { Form, Select, Col, Row, Modal, Input } from 'antd';
import { CloseOutlined } from "@ant-design/icons";
import AddVehicle from "./AddVehicle"

function VehicleMange(){
  const dataList = [
    {
      name: "Nguyễn Văn An",
      vehicle: [
        {
          type: "Xe máy",
          plate: "99-AF-02276"
        },
        {
          type: "Xe máy",
          plate: "29-AF-02234"
        },
        {
          type: "Ô tô",
          plate: "30G-43234"
        }
      ]
    },
    {
      name: "Trần Thị Bích",
      vehicle: [
        {
          type: "Ô tô",
          plate: "88B-12345"
        },
        {
          type: "Xe máy",
          plate: "90B-56789"
        }
      ]
    },
  ];

  const householdName = [
    { value: "", label: "None" },
      ...dataList.map(item => ({
      value: item.name,
      label: item.name,
    })),
  ];

  const [filters, setFilters] = useState({
      householdName: null, 
      plate: null   
    });

    const filteredData = useMemo(() => {
      return dataList
        .map(owner => ({
          ...owner,
          vehicle: owner.vehicle.filter(vehicle => {
            // Lọc theo biển kiểm soát
            if (filters.plate && !vehicle.plate.toLowerCase().startsWith(filters.plate.toLowerCase())) {
              return false;
            }
            return true;
          })
        }))
        .filter(owner => {
          // Lọc theo tên chủ hộ
          if (filters.householdName && !owner.name.toLowerCase().includes(filters.householdName.toLowerCase())) {
            return false;
          }
          // Loại bỏ chủ hộ không có phương tiện sau khi lọc
          return owner.vehicle.length > 0;
        });
    }, [dataList, filters]);
  
    const handleDelete = async (id) => {
        // Hiển thị modal xác nhận trước khi xóa
        Modal.confirm({
          title: "Xác nhận xóa",
          content: "Bạn có chắc chắn muốn xóa loại phí này không?",
          okText: "Xóa",
          okType: "danger",
          cancelText: "Hủy",
    })};
  
  return(
    <>
    <div className="details__vehicle">
        <div className="recentCt">
          <div className="cardHeader">
              <h2>Quản lý phương tiện</h2>
              <div className="all-button">
                <AddVehicle/>
              </div>
          </div>
          <div className="filter_options">
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
                    <Col className="gutter-row" span={12}>
                      <Form.Item label="Tên chủ hộ">
                        <Select 
                          placeholder="Chọn chủ hộ" 
                          options={householdName}
                          onChange={(value) => setFilters((prev) => ({ ...prev, householdName: value }))}
                          style={{width: '200%'}}
                        >
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
                    <Form.Item label="Biển số xe:">
                      <Input 
                        placeholder="Nhập biển số" 
                        value={filters.plate} 
                        onChange={(e) => setFilters({ ...filters, plate: e.target.value })} 
                        style={{width: '200%'}}
                      />
                    </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>

          <table className='overall'>
            <thead>
              <tr>
                <td>Tên chủ hộ</td>
                <td>Số lượng</td>
                <td>Tên phương tiện</td>
                <td>Biển số xe</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((owner, ownerIndex) => (
                owner.vehicle.map((vehicle, vehicleIndex) => (
                  <tr key={`${ownerIndex}-${vehicleIndex}`}>
                    <td>{vehicleIndex === 0 ? owner.name : ""}</td>
                    <td>{vehicleIndex === 0 ? owner.vehicle.length : ""}</td>
                    <td>{vehicle.type}</td>
                    <td>{vehicle.plate}</td>
                    <td>
                      <button className="btn-details delete-icon" onClick={() => handleDelete(vehicle.plate)}><CloseOutlined /></button>
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
    </div>
    </>
  )
}

export default VehicleMange;