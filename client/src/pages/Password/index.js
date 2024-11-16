import "./asset/css/material-design-iconic-font.min.css"
import "./asset/css/style.css"
import { useState, useRef } from "react";
import { FcOk } from "react-icons/fc";

function Password(){
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [newClass, setNewClass] = useState("");

  //Process old password; 
  const validatePassword = (password) => {
    return password === "123456" ? true : false;
  }
  const handleOldPassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
    setIsValid(validatePassword(e.target.value));
    if (e.target.value !== "")
    setNewClass(validatePassword(e.target.value) ? "correct" : "incorrect");
  }

  //Process new password;
  const minLength = /.{8,}/; 
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/; 
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
  const hasNumber = /\d/;

  const [isMinLengthValid, setMinLengthValid] = useState(false);
  const [isHasUpperCase, setIsHasUpperCase] = useState(false);
  const [isHasLowerCase, setIsHasLowerCase] = useState(false);
  const [isHasSpecialChar, setIsHasSpecialChar] = useState(false);
  const [isHasNumber, setIsHasNumber] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [isNewValid, setIsNewValid] = useState(false);
  const [checkClass, setCheckClass] = useState(false);

  const validateNewPassword = (password) => {
    setMinLengthValid(minLength.test(password));
    setIsHasUpperCase(hasUpperCase.test(password));
    setIsHasLowerCase(hasLowerCase.test(password));
    setIsHasSpecialChar(hasSpecialChar.test(password));
    setIsHasNumber(hasNumber.test(password));

    return minLength.test(password) &&
    hasUpperCase.test(password) &&
    hasLowerCase.test(password) &&
    hasSpecialChar.test(password) &&
    hasNumber.test(password);
  }
  
  const handleNewPassword = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setNewPassword(value);
    setIsNewValid(validateNewPassword(value));
    setCheckClass(validateNewPassword(value) ? "correct" : "incorrect");
  }

  //Process Confirmed Password
  const [check, setCheck] = useState(false);

  const handleConfirmedPassword = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value === newPassword){
      setCheck(true);
    }
    console.log(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid && isNewValid && check)
    alert("Thay đổi mật khẩu thành công");
    else alert ("Chưa thoả mãn yêu cầu");
  }

  return(
    <>
      <div className="password-main">
        <section className="change-password">
          <div className="password-container">
            <div className="password-content">
              <div className="password-form">
                  <h2 className="form-title">Change Password</h2>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <div className="password-input-field old-password">
                          <label htmlFor="old-password">Old Password</label>
                          {
                            isValid && <FcOk/>
                          }
                          <input type="password" name="old-password" id="old-password" placeholder="Old Password" onChange={handleOldPassword} className={`${newClass}`}/>
                        </div>
                        <div className="password-input-field">
                          <label htmlFor="new-password">New Password</label>
                          {
                            isNewValid && <FcOk/>
                          }
                          <input type="password" name="new-password" id="new-password" placeholder="New Password" onChange={handleNewPassword} className={`${checkClass}`}/>
                        </div> 
                        <div className="password-require">
                          <p>Please add all necessary characters to create safe password</p>
                          <ul>
                            <li className={isMinLengthValid ? "valid" : "invalid"}>Minimum characters 8</li>
                            <li className={isHasUpperCase ? "valid" : "invalid"}>One uppercase character</li>
                            <li className={isHasLowerCase ? "valid" : "invalid"}>One lowercase character</li>
                            <li className={isHasSpecialChar ? "valid" : "invalid"}>One special character</li>
                            <li className={isHasNumber ? "valid" : "invalid"}>One number</li>
                          </ul>
                        </div>
                        <div className="password-input-field">
                          <label htmlFor="confirm-password">Confirm New Password</label>
                          {
                            check && <FcOk/>
                          }
                          <input type="password" name="confirm-password" id="confirm-password" placeholder="Enter your confirm new password" onChange={handleConfirmedPassword} className={check ? "correct" : "incorrect"}/>
                        </div> 
                        <div className="form-group form-button">
                            <input type="submit" name="change-password" id="change-password" className="form-submit" value="Change Password"/>
                        </div>
                      </div>
                    </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Password;