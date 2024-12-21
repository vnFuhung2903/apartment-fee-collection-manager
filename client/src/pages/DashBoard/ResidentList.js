import { Link } from "react-router-dom"
import { useEffect,useMemo, useState } from "react"
import { Form,Select,Row,Col} from "antd";
import {ExportOutlined } from '@ant-design/icons';
import "./style.css";
import axios from "axios";
function ResidentList(){
    const [residents, setResidents] = useState([]);
    const [personNames, setPersonNames] = useState([]);
    const [floorNumbers, setFloorNumbers] = useState([]);
    const [roomNumbers, setRoomNumbers] = useState([]);
    useEffect(() => {
        const fetchResidents = async () => {
            try {
                const response = await axios.get("http://localhost:8386/person/api/v1/all"); 
                setResidents(response.data.array);
            } catch (error) {
                console.error("Error fetching residents data:", error);
            }
        };

        fetchResidents();
    }, []);

    useEffect(() => {
        const people = new Set(residents.map(resident => resident.name));
        const fl = new Set(residents.map(resident => resident.floors[0]));
        const rm = new Set(residents.map(resident => resident.numbers[0]))
        setPersonNames([
            {value: "",label: "Tất cả"},
            ...[...people].map(personName => ({
                value:personName,
                label:personName,
            })),
        ]);

        setFloorNumbers([
            {value: "",label: "Tất cả"},
            ...[...fl].map(floorNumber => ({
                value:floorNumber,
                label:floorNumber,
            })),
        ]);

        setRoomNumbers([
            {value: "",label: "Tất cả"},
            ...[...rm].map(roomNumber => ({
                value:roomNumber,
                label:roomNumber,
            })),
        ]);
    }, [residents])
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
                            <tr key={resident._id}>
                                <td>{resident.cic}</td>
                                <td> { resident.name } </td>
                                <td> { resident.contact_phone } </td>
                                <td> { resident.floors } </td>
                                <td> { resident.numbers } </td>
                                <td> { resident.status } </td>
                                <td><span className="status"><Link to={`/household_infor?household_id=${resident.householdId}`}><ExportOutlined /></Link></span></td>
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