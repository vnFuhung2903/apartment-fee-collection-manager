import { Input, Form, Button, InputNumber, Select, DatePicker } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

function CreateFee(){ 
  const handleSubmit = async (values) => {
    try {
      const payload = {
        name:values.feeName,
        amount:values.price,
        due:values.deadline ? values.deadline.format("YYYY-MM-DD") : null,
        status:values.status === "required" ? "Bắt buộc" : "Không bắt buộc"
      };
      if(!payload.name || !payload.amount || !payload.due) {
        alert("Vui lòng điền đủ thông tin bắt buộc !");
        return;
      }
      const response = await axios.post(
        "http://localhost:8386/fees/api/v1/post",
        payload,
        {
          headers: {
            "Content-Type":"application/json",
          },
        }
      );
      if (response.status === 201) {
        alert("Tạo mới thành công! ");
      } else{
        alert("Tạo mới thất bại!");
      }
    } catch (error) {
      alert("Có lỗi xảy ra khi gửi yêu cầu ! !!");
    }
  };
  const { Option } = Select;
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };
  return (
    <>
      <div className="details__fee">
        <div className="recentCt">
          <div className="cardHeader">
            <h2>Thêm loại phí</h2>
            <Link to="/fee_list" className="btn">Quay lại</Link>
          </div>
          <Form 
            {...formItemLayout}
            layout="vertical" 
            name="create-fee" 
            onFinish={handleSubmit}
          >
            <Form.Item
              label="STT"
              name="STT"
            >
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item
              label="Tên loại phí"
              name="feeName"
              rules={[
                {
                  required: true,
                  message: 'Bắt buộc!',
                }
              ]
              }
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Giá/đơn vị"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Bắt buộc!',
                }
              ]
              }
            >
              <InputNumber/>
            </Form.Item>
            <Form.Item
              label="Hạn nộp"
              name="deadline"
              rules={[
                {
                  required: true,
                  message: 'Bắt buộc!',
                }
              ]
              }
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label="Trạng thái"
              name="status"
              rules={[
                {
                  required: true,
                  message: 'Bắt buộc!',
                }
              ]
              }
            >
              <Select
                placeholder="Chọn trạng thái"
              >
                <Option value="required">Bắt buộc</Option>
                <Option value="not_required">Không bắt buộc</Option>
              </Select>
            </Form.Item>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Tạo mới
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      
    </>
  )
}

export default CreateFee;