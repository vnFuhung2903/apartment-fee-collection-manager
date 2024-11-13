import "./style_register.css"

function Register(){
  return(
  <>
    <div class = "details">
      <div class = "recentCt page2">
        <div className="cardHeader">
            <h2>Đăng kí</h2>
        </div>
        <form action="#">
            <div className="form first">
                <span id = "title">Thông tin chủ hộ</span>
                
                <div className="fields">
                    <div className="input-fields">
                        <label htmlFor="name">Họ và tên</label>
                        <input id="name" type="text" placeholder="" required />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="">CCCD</label>
                        <input type="text" placeholder="" required />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="">Ngày sinh</label>
                        <input type="date" placeholder="" required />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="">Quốc tịch</label>
                        <input type="text" placeholder="" required /> 
                    </div>
                    <div className="input-fields">
                        <label htmlFor="">Nghề nghiệp</label>
                        <input type="text" placeholder="" required />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="">Giới tính</label>
                        <select name="sex" id="sex">
                            <option value="">Nam</option>
                            <option value="">Nữ</option>
                            <option value="">Khác</option>
                        </select>
                    </div>
                    <div className="input-fields">
                        <label htmlFor="">Quê quán</label>
                        <input type="text" placeholder="" required />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="">Dân tộc</label>
                        <input type="text" placeholder="" required />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="">Số điện thoại</label>
                        <input type="number" placeholder="" required />
                    </div>
                </div>
            </div>
            <hr/>
            <div className="form second">
                <span id = "title">Thông tin hộ khẩu</span>
                
                <div className="fields">
                    <div className="input-fields">
                        <label htmlFor="">Tên chủ hộ</label>
                        <input type="text" placeholder="" required />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="">CCCD</label>
                        <input type="text" placeholder="" required />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="">Ngày sinh</label>
                        <input type="date" placeholder="" required />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="">Số nhà</label>
                        <input type="number" placeholder="" required />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="">Số tầng</label>
                        <input type="number" placeholder="" required />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="">Loại số</label>
                        <select name="sex" id="sex">
                            <option value="">Thường trú</option>
                            <option value="">Tạm trú</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class ="buttons">
                <button class = "submitBtn">
                    <span class = "buttonSm">Submit</span>
                </button>
            </div>
        </form>
                    
      </div>
    </div>
  </>
  )
}
export default Register