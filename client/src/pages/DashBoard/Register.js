import "./style_register.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(){
    const navigate = useNavigate();
    const [remain, setRemain] = useState([]);
    //test
     const remains = [
        { floor: 1, room: 103 },
        { floor: 1, room: 104 },
        { floor: 2, room: 201 },
        { floor: 2, room: 202 },
        { floor: 3, room: 301 },
        { floor: 3, room: 302 },
    ];
    const [personalInfor, setPersonalInfor] = useState({
        name: "",
        cic: "",
        dob: "",
        nationality: "",
        occupation: "",
        gender: "Nam",
        hometown: "",
        ethnic: "",
        phone: "",
        status: "Thường trú",
        start:"",
        end:""
    })

    const [householdInfor, setHouseholdInfor] = useState({
    number: "",
    floor: ""
    });

    useEffect(() => {
        fetch("http://localhost:8386/apartments/api/v1/remains", {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        })
        .then(res => {
            if(res.status === 200)
                return res.json();
        })
        .then(data => {
            setRemain(data);
        });
    })

    const handlePersonalChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setPersonalInfor({
            ...personalInfor, 
            [name]: value
        });
    }

    const handleHouseholdChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setHouseholdInfor({
            ...householdInfor, 
            [name]: value 
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8386/person/api/v1/create", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: personalInfor
        })
        .then((res) => {
            return res.json();
        })
        .then(data => {
            fetch("http://localhost:8386/household/api/v1/create", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ headId: data, apartmentNumber: householdInfor.number, contact: personalInfor.phone })
            })
            .then(res => {
                return res.json()
            })
            .then(data => {
                if(data.message === 'Success')
                    navigate(`/household_infor/:${data.household}`);
                else alert(data.message);
            })
        })
    }

    const availableFloors = [...new Set(remains.map(item => item.floor))];
    const availableRooms = remains.filter(item => item.floor === parseInt(householdInfor.floor, 10));
    const [status,setStatus] = useState("Thường trú");
    useEffect(()=>{
        setStatus(personalInfor.status);
    },[personalInfor])


    return(
    <>
    <div className = "details">
        <div className = "recentCt page2">
        <div className="cardHeader">
            <h2>Đăng kí cư dân</h2>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="form first">
                <span id = "title">Thông tin cá nhân</span>
                
                <div className="fields">
                    <div className="input-fields">
                        <label htmlFor="name">Họ và tên</label>
                        <input id="name" name="name" type="text" placeholder="" onChange={handlePersonalChange} required />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="">CCCD</label>
                        <input id="cic" name="cic" type="text" placeholder="" onChange={handlePersonalChange} required />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="">Ngày sinh</label>
                        <input id="dob" name="dob" type="date" placeholder="" onChange={handlePersonalChange} required />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="">Quốc tịch</label>
                        <input id="nationality" name="nationality" type="text" placeholder="" onChange={handlePersonalChange} required /> 
                    </div>
                    <div className="input-fields">
                        <label htmlFor="">Nghề nghiệp</label>
                        <input id="occupation" name="occupation" type="text" placeholder="" onChange={handlePersonalChange} required />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="">Giới tính</label>
                        <select name="gender" id="gender" onChange={handlePersonalChange}>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </div>
                    <div className="input-fields">
                        <label htmlFor="">Quê quán</label>
                        <input id="hometown" name="hometown" type="text" placeholder="" onChange={handlePersonalChange} required />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="">Dân tộc</label>
                        <input id="ethnic" name="ethnic" type="text" placeholder="" onChange={handlePersonalChange} required />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="">Số điện thoại</label>
                        <input id="phone" name="phone" type="number" placeholder="" onChange={handlePersonalChange} required />
                    </div>
                </div>
            </div>
            <hr/>
            <div className="form second">
                <span id = "title">Thông tin căn hộ</span>
                
                <div className="fields">
                    {/* <div className="input-fields">
                        <label htmlFor="">Tên chủ hộ</label>
                        <input id="householdName" name="householdName" type="text" placeholder="" onChange={handleHouseholdChange} required />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="">CCCD</label>
                        <input id="householdCCCD" name="householdCCCD" type="text" placeholder="" onChange={handleHouseholdChange} required />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="">Ngày sinh</label>
                        <input id="householdDOB" name="householdDOB" type="date" placeholder="" onChange={handleHouseholdChange} required />
                    </div> */}
                    <div className="input-fields">
                         <label htmlFor="floor">Chọn tầng</label>
                          <select id="floor" name="floor" onChange={handleHouseholdChange} required>
                             <option value="">Chọn tầng</option>
                                {availableFloors.map(floor => (
                                <option key={floor} value={floor}>{floor}</option>
                                ))}
                          </select>
                    </div>
                    <div className="input-fields">
                          <label htmlFor="room">Chọn phòng</label>
                          <select id="room" name="room" onChange={handleHouseholdChange} required>
                          <option value="">Chọn phòng</option>
                            {availableRooms.map(room => (
                            <option key={room.room} value={room.room}>{room.room}</option>
                             ))}
                          </select>
                    </div>
                    <div className="input-fields">
                        <label htmlFor="relationToOwner">Quan hệ với chủ hộ</label>
                        <select id="relationToOwner" name="relationToOwner" onChange={handlePersonalChange}>
                            <option value="Chủ nhà">Chủ nhà</option>
                            <option value="Con cái">Con cái</option>
                            <option value="Vợ chồng">Vợ chồng</option>
                            <option value="Bố mẹ">Bố mẹ</option>
                            <option value="Họ hàng">Họ hàng</option>
                            <option value="Anh em">Anh em</option>
                        </select>
                    </div> 
                    <div className="input-fields">
                        <label htmlFor="">Trạng thái</label>
                        <select id="residenceType" name="status" onChange={handlePersonalChange}>
                            <option value="Thường trú">Thường trú</option>
                            <option value="Tạm trú">Tạm trú</option>
                            <option value="Tạm vắng">Tạm vắng</option>
                        </select>
                    </div>
                    <div className="input-fields">
                        <label htmlFor="">Từ ngày</label>
                        <input id="start" name="start" type="date" placeholder="Ngày bắt đầu tạm trú" onChange={handlePersonalChange} disabled={status === "Thường trú"} required/>
                    </div>
                    <div className="input-fields">
                        <label htmlFor="">Đến ngày</label>
                        <input id="end" name="end" type="date" placeholder="Ngày kết thúc tạm trú" onChange={handlePersonalChange} disabled={status === "Thường trú"} required/>
                    </div>
                </div>
            </div>
            <div className ="buttons">
                <button className = "submitBtn">
                    <span className = "buttonSm">Submit</span>
                </button>
            </div>
        </form>
                    
        </div>
    </div>
    </>
)}
export default Register