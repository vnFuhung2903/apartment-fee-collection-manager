import "./style.css"
import customer01 from "../Layout/assets/imgs/customer01.jpg"
import { Link , useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

function Page1(){
    const [households, setHouseholds] = useState([]);
    const [recentCustomers, setRecentCustomers] = useState([]);
    const [numApartment, setNumApartment] = useState(0);
    const [numPerson, setNumPerson] = useState(0);
    const [numTemporary, setNumTemporary] = useState(0);
    const [numAbsence, setNumAbsence] = useState(0);

        useEffect(() => {
        fetch("http://localhost:8386/household/api/v1/all", {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        })
        .then(res => {
            if(res.status === 200)
                return res.json();
        })
        .then(data => {
            setHouseholds(data);
        });

        fetch("http://localhost:8386/api/v1/dashboard", {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        })
        .then(res => {
            if(res.status === 200)
                return res.json();
        })
        .then(data => {
            setNumApartment(data.numApartment);
            setNumPerson(data.numPerson);
            setNumTemporary(data.numTemporary);
            setNumAbsence(data.numAbsence);
            setRecentCustomers(data.recentCustomers);
        });
    }, [])


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
             <h2>Quản lí căn hộ</h2>
             <Link to="/register_resident" className="btn">Thêm hộ dân</Link>
         </div>
             <table>
                  <thead>
                       <tr>
                         <td>Tên chủ căn hộ</td>
                           <td>Liên hệ</td>
                           <td>Tầng</td>
                           <td>Số căn hộ</td>
                           <td>Trạng thái</td>
                           <td>Chi tiết</td>
                        </tr>
                  </thead>

                  <tbody>
                      { households.map(household =>
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
                                { 
                                /*
                                <tr>
                                    <td>Dell Laptop</td>
                                    <td>0192361309</td>
                                    <td>9</td>
                                    <td>902</td>
                                    <td>
                                    <span className="permanent_residence-status">
                                    permanent_residence
                                     </span> 
                                    </td>
                                    <td><span className="status"><Link to="/household_infor">Mở rộng</Link></span></td>
                                </tr>
                                
                                <tr>
                                    <td>Apple Watch</td>
                                    <td>5</td>
                                    <td>502</td>
                                    <td><span className="status">Mở rộng</span></td>
                                </tr>

                                <tr>
                                    <td>Addidas Shoes</td>
                                    <td>3</td>
                                    <td>305</td>
                                    <td><span className="status">Mở rộng</span></td>
                                </tr>

                                <tr>
                                    <td>Star Refrigerator</td>
                                    <td>6</td>
                                    <td>607</td>
                                    <td><span className="status">Mở rộng</span></td>
                                </tr>

                                <tr>
                                    <td>Dell Laptop</td>
                                    <td>3</td>
                                    <td>308</td>
                                    <td><span className="status">Mở rộng</span></td>
                                </tr>

                                <tr>
                                    <td>Apple Watch</td>
                                    <td>6</td>
                                    <td>605</td>
                                    <td><span className="status">Mở rộng</span></td>
                                </tr>

                                <tr>
                                    <td>Addidas Shoes</td>
                                    <td>4</td>
                                    <td>405</td>
                                    <td><span className="status">Mở rộng</span></td>
                                </tr> */}
                    </tbody>
               </table>
        </div>

        <div className="recentCustomers">
        <div className="cardHeader">
            <h2>Recent Customers</h2>
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

            {/* <tr>
                <td width="60px">
                    <div className="imgBx"><img src={customer01} alt=""/></div>
                </td>
                <td>
                    <h4>David <br/> <span>Italy</span></h4>
                </td>
            </tr>

            <tr>
                <td width="60px">
                    <div className="imgBx"><img src={customer01} alt=""/></div>
                </td>
                <td>
                    <h4>Amit <br/> <span>India</span></h4>
                </td>
            </tr>

            <tr>
                <td width="60px">
                    <div className="imgBx"><img src={customer01} alt=""/></div>
                </td>
                <td>
                    <h4>David <br/> <span>Italy</span></h4>
                </td>
            </tr>

            <tr>
                <td width="60px">
                    <div className="imgBx"><img src={customer01} alt=""/></div>
                </td>
                <td>
                    <h4>Amit <br/> <span>India</span></h4>
                </td>
            </tr>

            <tr>
                <td width="60px">
                    <div className="imgBx"><img src={customer01} alt=""/></div>
                </td>
                <td>
                    <h4>David <br/> <span>Italy</span></h4>
                </td>
            </tr>

            <tr>
                <td width="60px">
                    <div className="imgBx"><img src={customer01} alt=""/></div>
                </td>
                <td>
                    <h4>Amit <br/> <span>India</span></h4>
                </td>
            </tr>

            <tr>
                <td width="60px">
                    <div className="imgBx"><img src={customer01} alt=""/></div>
                </td>
                <td>
                    <h4>David <br/> <span>Italy</span></h4>
                </td>
            </tr>

            <tr>
                <td width="60px">
                    <div className="imgBx"><img src={customer01} alt=""/></div>
                </td>
                <td>
                    <h4>Amit <br/> <span>India</span></h4>
                </td>
            </tr> */}
        </table>
        </div>
    </div>
    </>
  )
}

export default Page1