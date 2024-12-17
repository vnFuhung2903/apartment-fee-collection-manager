import { Link } from "react-router-dom"
import React,{ useEffect,useMemo, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { fetchDashboardData, fetchHouseholds } from "../../actions";
import { Form,Select,Row,Col} from "antd";
import {ExportOutlined } from '@ant-design/icons';
import "./style.css";
function ResidentList(){
    const residents = [
        {
          id: "1",
          name: "Nguyễn Văn A",
          phone: "0987654321",
          cic: "123456789012",
          dob: "1979-05-12",
          floornumber: "2",
          apartmentNumber: "202",
          relationship: "Chủ nhà",
          nationality: "Việt Nam",
          gender: "Nam",
          occupation: "Kỹ sư",
          hometown: "Hà Nội",
          ethnic: "Kinh",
          status: "Thường trú",
        },
        {
          id: "2",
          name: "Nguyễn Thị B",
          phone: "0981234567",
          cic: "123456789013",
          dob: "1981-03-25",
          floornumber: "2",
          apartmentNumber: "202",
          relationship: "Vợ",
          nationality: "Việt Nam",
          gender: "Nữ",
          occupation: "Giáo viên",
          hometown: "Hải Phòng",
          ethnic: "Kinh",
          status: "Thường trú",
        },
        {
          id: "3",
          name: "Nguyễn Văn C",
          phone: "0976543210",
          cic: "123456789014",
          dob: "2004-07-10",
          floornumber: "2",
          apartmentNumber: "202",
          relationship: "Con trai",
          nationality: "Việt Nam",
          gender: "Nam",
          occupation: "Sinh viên",
          hometown: "Hà Nội",
          ethnic: "Kinh",
          status: "Thường trú",
        },
        {
          id: "4",
          name: "Nguyễn Thị D",
          phone: "0976123456",
          cic: "123456789015",
          dob: "2006-01-15",
          floornumber: "2",
          apartmentNumber: "202",
          relationship: "Con gái",
          nationality: "Việt Nam",
          gender: "Nữ",
          occupation: "Học sinh",
          hometown: "Hà Nội",
          ethnic: "Kinh",
          status: "Thường trú",
        },
      ];
    //Dữ liệu để lọc
    const personNames = [
        {value: "",label: "None"},
        ...[...new Set(residents.map(resident => resident.name))].map(personName => ({
            value:personName,
            label:personName,
        })),
    ];
    const floorNumbers = [
        {value: "",label: "None"},
        ...[...new Set(residents.map(resident => resident.floornumber))].map(floorNumber => ({
            value:floorNumber,
            label:floorNumber,
        })),
    ];
    const roomNumbers = [
        {value: "",label: "None"},
        ...[...new Set(residents.map(resident => resident.apartmentNumber))].map(roomNumber => ({
            value:roomNumber,
            label:roomNumber,
        })),
    ];
    const [filters,setFilters] = useState({
        personName: null,
        roomNumber:null,
        floorNumber:null
    });

    const filteredPeople = useMemo(() => {
        return residents.filter((resident) => {
            if(filters.personName && filters.personName !== resident.name)
                return false;
            if(filters.floorNumber && filters.floorNumber !== resident.floornumber)
                return false;
            if(filters.roomNumber && filters.roomNumber !== resident.apartmentNumber)
                return false;
            return true;
        });
    },[residents,filters]);

    return (
    <>
        <div  className="details page2">
            <div className="recentCt page2">
                <div className="cardHeader">
                    <h2>Danh sách dân cư</h2>
                    <Link to="/register_resident" className="btn">Đăng kí</Link>
                </div>
                <div className="filter-person">
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
                            <Col className="gutter-row" span={8}>
                                <Form.Item label="Họ và tên">
                                    <Select
                                        showSearch
                                        placeholder="Điền họ tên" 
                                        filterOption={(input, option) => 
                                        (option.label).includes(input)
                                        }
                                        options={personNames}
                                        onChange={(value) => setFilters((prev) => ({ ...prev, personName: value }))}
                                    ></Select>
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={8}>
                                <Form.Item label="Tầng">
                                <Select 
                                  placeholder="Chọn tầng" 
                                  options={floorNumbers}
                                  onChange={(value) => setFilters((prev) => ({ ...prev, floorNumber: value }))}
                                ></Select>
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={8}>
                                <Form.Item label="Số căn hộ">
                                <Select 
                                  placeholder="Chọn số căn hộ" 
                                  options={roomNumbers}
                                  onChange={(value) => setFilters((prev) => ({ ...prev, roomNumber: value }))}
                                ></Select>
                                </Form.Item>
                            </Col>
                        </Row>
                     </Form>
          </div>

                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Họ tên</td>
                            <td>Số Điện Thoại</td>
                            <td>Số tầng</td>
                            <td>Số căn hộ</td>
                            <td>Trạng thái</td>
                            <td>Chi tiết</td>
                        </tr>
                    </thead>

                    <tbody>
                        { filteredPeople.map(resident => 
                            <tr key={resident.id}>
                                <td>{resident.id}</td>
                                <td> { resident.name } </td>
                                <td> { resident.phone } </td>
                                <td> { resident.floornumber } </td>
                                <td> { resident.apartmentNumber } </td>
                                <td> { resident.status } </td>
                                <td><span className="status"><Link to="/household_infor"><ExportOutlined /></Link></span></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </>
    )
}

export default ResidentList;