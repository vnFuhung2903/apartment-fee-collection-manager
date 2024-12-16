import "./style.css"
import customer01 from "../Layout/assets/imgs/customer01.jpg"
import { Link } from "react-router-dom"
import  React,{ useEffect,useMemo, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { fetchDashboardData, fetchHouseholds } from "../../actions";
import { Form,Select,Row,Col} from "antd";

function Page1(){
    const dispatch = useDispatch();
    const {
        households,
        recentCustomers,
        numApartment,
        numPerson,
        numTemporary,
        numAbsence,
    } = useSelector((state) => state.page1Reducer);
  
    useEffect(() => {
        dispatch(fetchHouseholds());
        dispatch(fetchDashboardData());
    }, [dispatch]);
    const ownerNames = [
        {value: "",label: "None"},
        ...[...new Set(households.map(household => household.head))].map(ownerName => ({
            value:ownerName,
            label:ownerName,
        })),
    ];
    const floorNumbers = [
        {value: "",label: "None"},
        ...[...new Set(
            households.reduce((floors, household) => [...floors, ...household.floors], []))].map(floorNumber => ({
            value:floorNumber,
            label:floorNumber,
        })),
    ];
    const roomNumbers = [
        {value: "",label: "None"},
        ...[...new Set(households.reduce((rooms, household) => [...rooms, ...household.numbers], []))].map(roomNumber => ({
            value:roomNumber,
            label:roomNumber,
        })),
    ];
    const [filters,setFilters] = useState({
        ownerName: null,
        roomNumber:null,
        floorNumber:null
    });
    const filteredHousehold = useMemo(() => {
            return households.filter((household) => {
                if(filters.ownerName && filters.ownerName !== household.head)
                    return false;
                if(filters.floorNumber && !household.floors.includes(filters.floorNumber))
                    return false;
                if(filters.roomNumber &&  !household.numbers.includes(filters.roomNumber))
                    return false;
                return true;
            });
        },[households,filters]);

    return (
    <>
    {/* Card box */}
    <div className="cardBox">
        <div className="card">
            <div>
                <div className="numbers"> { numApartment } </div>
                <div className="cardName">Căn hộ</div>
            </div>

            <div className="iconBx">
                <ion-icon name="storefront-outline"></ion-icon>
            </div>
        </div>

        <div className="card">
            <div>
                <div className="numbers"> { numPerson } </div>
                <div className="cardName">Dân cư</div>
            </div>

            <div className="iconBx">
                <ion-icon name="people-circle-outline"></ion-icon>
            </div>
        </div>

        <div className="card">
            <div>
                <div className="numbers"> { numTemporary } </div>
                <div className="cardName">Tạm trú</div>
            </div>

            <div className="iconBx">
                <ion-icon name="person-add-outline"></ion-icon>
            </div>
        </div>

        <div className="card">
            <div>
                <div className="numbers"> { numAbsence } </div>
                <div className="cardName">Tạm vắng</div>
            </div>

            <div className="iconBx">
                <ion-icon name="person-remove-outline"></ion-icon>
            </div>
        </div>
    </div>

    {/*  */}

    <div className="details">
        <div className="recentCt">
        <div className="cardHeader">
             <h2>Quản lí hộ dân</h2>
             <Link to="/register_resident" className="btn">Đăng kí</Link>
         </div>
         <div className="household">
                    <Form
                        layout="horizontal"
                    >
                        <Row
                            gutter={{
                            xs: 8,
                            sm: 16,
                            md: 24,
                            lg: 32,
                        }}
                        >
                            <Col className="gutter-row" span={10}>
                                <Form.Item label="Tên chủ hộ">
                                    <Select
                                        showSearch
                                        placeholder="Điền họ tên" 
                                        filterOption={(input, option) => 
                                        (option.label).includes(input)
                                        }
                                        options={ownerNames}
                                        onChange={(value) => setFilters((prev) => ({ ...prev, ownerName: value }))}
                                    ></Select>
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <Form.Item label="Tầng">
                                <Select 
                                  placeholder="Chọn tầng" 
                                  options={floorNumbers}
                                  onChange={(value) => setFilters((prev) => ({ ...prev, floorNumber: value }))}
                                ></Select>
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={6}>
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
                         <td>Tên chủ hộ</td>
                           <td>Liên hệ</td>
                           <td>Tầng</td>
                           <td>Số căn hộ</td>
                           <td>Trạng thái</td>
                           <td>Chi tiết</td>
                        </tr>
                  </thead>

                  <tbody>
                      { filteredHousehold.map(household =>
                         <tr>
                            <td> { household.head } </td>
                            <td> { household.contact } </td>
                            <td> { household.floors } </td>
                            <td> { household.numbers } </td>
                            <td>
                            <span className={household.status + "-status"}>
                                    {household.status}
                                  </span> 
                            </td>
                            <td><span className="status"><Link to="/household_infor"  onClick={() => {localStorage.setItem("id",household.numbers);}}>Mở rộng</Link></span></td>
                         </tr>
                      )}
                    </tbody>
               </table>
        </div>

        <div className="recentCustomers">
        <div className="cardHeader">
            <h2>Danh sách dân cư</h2>
            <Link to="/view_all" className="btn">Mở rộng</Link>
        </div>

        <table>
            { recentCustomers.map(customer =>
                <tr>
                    <td width="60px">
                        <div className="imgBx"><img src={customer01} alt=""/></div>
                    </td>
                    <td>
                        <h4> { customer.name } <br/> <span> { customer.nation } </span></h4>
                    </td>
                </tr>
            )}
        </table>
        </div>
    </div>
    </>
  )
}

export default Page1