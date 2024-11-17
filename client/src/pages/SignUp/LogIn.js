import "./asset/fonts/material-icon/css/material-design-iconic-font.min.css"
import "./asset/css/style.css"
import signInImg from "./asset/images/signin-image.jpg"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LogIn() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemeber] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8386/auth/api/v1/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username: name, password: password, remember: remember})
    })
    .then((res) => {
        return res.json();
    })
    .then(data => {
      if (data.message === "Login success") {
        navigate("/dashboard");
      }
      else{
        console.log(data);
        alert(data.message);
      }
    })
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
                          <input type="text" name="your_name" id="your_name" placeholder="Your Email" onChange={e => setName(e.target.value)}/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="your_pass"><i className="zmdi zmdi-lock"></i></label>
                          <input type="password" name="your_pass" id="your_pass" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                      </div>
                      <div className="form-group">
                          <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" onChange={e => setRemeber(e.target.checked)}/>
                          <label htmlFor="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                      </div>
                      <div className="form-group form-button">
                          <input type="submit" name="signin" id="signin" className="form-submit" value="Log in"/>
                      </div>
                  </form>
                  {/* <div className="social-login">
                      <span className="social-label">Or login with</span>
                      <ul className="socials">
                          <li><a onClick={facebookSignIn}><i className="display-flex-center zmdi zmdi-facebook"></i></a></li>
                          <li><a onClick={xSignIn}><i className="display-flex-center zmdi zmdi-twitter"></i></a></li>
                          <li><a onClick={googleSignIn}><i className="display-flex-center zmdi zmdi-google"></i></a></li>
                      </ul>
                  </div> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default LogIn