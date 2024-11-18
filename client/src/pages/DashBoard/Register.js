import "./style_register.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(){
    const navigate = useNavigate();
    const [remain, setRemain] = useState([]);
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
        status: "Thường trú"
    })

    const [householdInfor, setHouseholdInfor] = useState({
    number: "",
    // floor: ""
    });

    useEffect(() => {
        fetch("http://localhost:3180/apartments/api/v1/remains", {
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
        fetch("http://localhost:3180/person/api/v1/create", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: personalInfor
        })
        .then((res) => {
            return res.json();
        })
        .then(data => {
            fetch("http://localhost:3180/household/api/v1/create", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ headId: data, apartmentNumber: householdInfor.number, contact: personalInfor.phone })
            })
            .then(res => {
                return res.json()
            })
            .then(data => {
                if(data.message === 'Success')
                    navigate("/dashboard");
                else alert(data.message);
            })
        })
    }

    return(
    <>
    <div className = "details">
        <div className = "recentCt page2">
        <div className="cardHeader">
            <h2>Đăng kí</h2>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="form first">
                <span id = "title">Thông tin chủ hộ</span>
                
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
                <span id = "title">Thông tin hộ khẩu</span>
                
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
                        <label htmlFor="">Số nhà</label>
                        <input id="houseNumber" name="number" type="number" placeholder="" onChange={handleHouseholdChange} required />
                    </div>
                    {/* <div className="input-fields">
                        <label htmlFor="">Số tầng</label>
                        <input id="floorNumber" name="floor" type="number" placeholder="" onChange={handleHouseholdChange} required />
                    </div> */}
                    <div className="input-fields">
                        <label htmlFor="">Trạng thái</label>
                        <select id="residenceType" name="status" onChange={handlePersonalChange}>
                            <option value="permanent_residence">Thường trú</option>
                            <option value="temporary_residence">Tạm trú</option>
                        </select>
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