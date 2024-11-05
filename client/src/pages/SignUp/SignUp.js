import "./asset/fonts/material-icon/css/material-design-iconic-font.min.css"
import "./asset/css/style.css"
import signupImg from "./asset/images/signup-image.jpg"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";

function SignUp(){
  const [account, setAccount] = useState({});
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3002/accounts")
      .then(res => res.json())
      .then(data => {
        setData(data);
        const maxId = data.reduce((max, item) => (max = (max >= item.id) ? max : item.id), 1);
        setAccount({
          id: maxId + 1
        })
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

  const findAccount = data.find(item => item.email === account.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (findAccount){
      alert("Tài khoản đã tồn tại");
      navigate("/login");
    }
    else{
      fetch("http://localhost:3002/accounts", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify(account)
      })
        .then(res => res.json())
        .then(account => {
          if (account){
            navigate("/dashboard");
          }
        })
    }
  }
  return (
    <>
      <div className="main">
        <section className="signup">
          <div className="container">
            <div className="signup-content">
                <div className="signup-form">
                    <h2 className="form-title">Sign up</h2>
                    <form onSubmit={handleSubmit} className="register-form" id="register-form">
                        <div className="form-group">
                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                            <input type="text" name="name" id="name" placeholder="Your Name" onChange={handleChange}/>
                        </div> 
                        <div className="form-group">
                            <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                            <input type="email" name="email" id="email" placeholder="Your Email" onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
                            <input type="password" name="pass" id="pass" placeholder="Password" onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
                            <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password"/>
                        </div>
                        <div className="form-group">
                            <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                            <label htmlFor="agree-term" className="label-agree-term"><span><span></span></span>I agree all statements in  <a href="https://www.enzuzo.com/blog/terms-and-conditions-examples" className="term-service">Terms of service</a></label>
                        </div>
                        <div className="form-group form-button">
                            <input type="submit" name="signup" id="signup" className="form-submit" value="Register"/>
                        </div>
                    </form>
                </div>
                <div className="signup-image">
                    <figure><img src={signupImg} alt="sign up" /></figure>
                    <Link to="login" className="signup-image-link">I am already member</Link>
                </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default SignUp