import "./style_register.css"
import { useState } from "react";

function Register(){
  const [personalInfor, setPersonalInfor] = useState(
    {
      name: "",
      cccd: "",
      dob: "",
      nationality: "",
      occupation: "",
      sex: "Nam",
      hometown: "",
      ethnic: "",
      phone: ""
    }
  )

  const [householdInfor, setHouseholdInfor] = useState({
    householdName: "",
    householdCCCD: "",
    householdDOB: "",
    houseNumber: "",
    floorNumber: "",
    residenceType: "Thường trú"
  });

  const handlePersonalChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setPersonalInfor({ ...personalInfor, 
    [name]: value });
  }

  const handleHouseholdChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setHouseholdInfor({ ...householdInfor, 
    [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Personal_Infor:", personalInfor);
    console.log("Household Infor:", householdInfor);
    alert("Form submitted successfully!");
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
                        <input id="cccd" name="cccd" type="text" placeholder="" onChange={handlePersonalChange} required />
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
                        <select name="sex" id="sex" onChange={handlePersonalChange}>
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
                    <div className="input-fields">
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
                    </div>
                    <div className="input-fields">
                        <label htmlFor="">Số nhà</label>
                        <input id="houseNumber" name="houseNumber" type="number" placeholder="" onChange={handleHouseholdChange} required />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="">Số tầng</label>
                        <input id="floorNumber" name="floorNumber" type="number" placeholder="" onChange={handleHouseholdChange} required />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="">Loại số</label>
                        <select id="residenceType" name="residenceType" onChange={handleHouseholdChange}>
                            <option value="Thường trú">Thường trú</option>
                            <option value="Tạm trú">Tạm trú</option>
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
  )
}
export default Register