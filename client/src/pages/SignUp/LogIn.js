import "./asset/fonts/material-icon/css/material-design-iconic-font.min.css"
import "./asset/css/style.css"
import signInImg from "./asset/images/signin-image.jpg"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";

function LogIn(){
  const [account, setAccount] = useState({});
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3002/accounts")
      .then(res => res.json())
      .then(data => {
        setData(data);
      })
  }, [])

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAccount({
      ...account,
      [name] : value,
    });
  }

  const findAccount = data.find(item => item.email === account.your_name);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (findAccount){
      const checkPass = data.find(item => item.password === account.your_pass);
      if (checkPass){
        navigate("/dashboard");
      }
      else{
        alert("Sai mật khẩu");
      }
    }
    else{
      alert("Tài khoản không tồn tại");
    }
  }

  return (
    <>
      <div className="main">
        <section className="sign-in">
          <div className="container">
            <div className="signin-content">
              <div className="signin-image">
                  <figure><img src={signInImg} alt="sign in" /></figure>
                  <Link to="/" className="signup-image-link">Create an account</Link>
              </div>

              <div className="signin-form">
                  <h2 className="form-title">Sign in</h2>
                  <form onSubmit={handleSubmit} className="register-form" id="login-form">
                      <div className="form-group">
                          <label htmlFor="your_name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                          <input type="text" name="your_name" id="your_name" placeholder="Your Email" onChange={handleChange}/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="your_pass"><i className="zmdi zmdi-lock"></i></label>
                          <input type="password" name="your_pass" id="your_pass" placeholder="Password" onChange={handleChange}/>
                      </div>
                      <div className="form-group">
                          <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                          <label htmlFor="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                      </div>
                      <div className="form-group form-button">
                          <input type="submit" name="signin" id="signin" className="form-submit" value="Log in"/>
                      </div>
                  </form>
                  <div className="social-login">
                      <span className="social-label">Or login with</span>
                      <ul className="socials">
                          <li><a href="https://www.google.com.vn/?hl=vi"><i className="display-flex-center zmdi zmdi-facebook"></i></a></li>
                          <li><a href="https://www.google.com.vn/?hl=vi"><i className="display-flex-center zmdi zmdi-twitter"></i></a></li>
                          <li><a href="https://www.google.com.vn/?hl=vi"><i className="display-flex-center zmdi zmdi-google"></i></a></li>
                      </ul>
                  </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default LogIn