import React from 'react';
import { Form, Input, message } from 'antd'
import { Link } from 'react-router-dom';
import './style.css'

export default function PersonalProfile() {
  const data = {
    name: "Nguyễn Văn A",
    email: "ANV@gmail.com",
    birth: "31/10/2004",
    phone: "0987654321",
    address: "Hai Bà Trưng, Hà Nội"
  }

  const handleClick = () => {
    message.success("Cập nhật thông tin thành công");
  }
  return (
    <>
    <div className="container">
      <div className="main-body">
        <h2>Hồ sơ cá nhân</h2>
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card-profile">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150"/>
                  <div className="mt-3">
                    <h4>Admin</h4>
                    <p>{data.name}</p>
                    <p>Quản trị viên</p>
                    <Link to="/password" className="btn">Đổi mật khẩu</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <Form layout='vertical'>
              <div className="card mb-3">
                <div className="card-body">
                  <Form.Item label="Họ và tên:">
                    <div className="row">
                      <Input value={data.name}/>
                    </div>
                  </Form.Item>
                  <hr/>
                  <Form.Item label="Email:">
                    <div className="row">
                      <Input value={data.email}/>
                    </div>
                  </Form.Item>
                  <hr/>
                  <Form.Item label="Ngày sinh:">
                    <div className="row">
                      <Input value={data.birth}/>
                    </div>
                  </Form.Item>
                  <hr/>
                  <Form.Item label="Số điện thoại:">
                    <div className="row">
                      <Input value={data.phone}/>
                    </div>
                  </Form.Item>
                  <hr/>
                  <Form.Item label="Địa chỉ:">
                    <div className="row">
                      <Input value={data.address}/>
                    </div>
                  </Form.Item>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-12">
                      <button className="btn" onClick={handleClick}>Cập nhật</button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
        </div>
        </div>
      </div>
    </div>
    </>
  );
}