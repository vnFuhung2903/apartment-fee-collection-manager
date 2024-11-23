import { Input, Form, Button, InputNumber, Select, DatePicker } from "antd";
import { Link, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";

function EditFee() {
  const { state } = useLocation();
  const fee = state ? state.fee : null;

  const handleSubmit = async (values) => {
    try {
      const payload = { _id: values.id };
      if (values.name) {
        payload.name = values.name;
      }
      if (values.amount !== undefined) {
        payload.amount = values.amount;
      }
      if (values.due) {
        payload.due = values.due.format("YYYY-MM-DD");
      }
      if (values.status) {
        payload.status = values.status;
      }
      // console.log(payload);
      const response = await axios.post("http://localhost:8386/fees/api/v1/change", payload);
      if (response.status === 201) {
        alert("Cập nhật thành công!");
      } else {
        alert("Cập nhật thất bại!");
      }
    } catch (error) {
      alert("Có lỗi xảy ra khi gửi yêu cầu !!!");
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
            <h2>{fee ? "Cập nhật loại phí" : "Thêm loại phí"}</h2>
            <Link to="/fee_list" className="btn">Quay lại</Link>
          </div>
          <Form 
            {...formItemLayout}
            layout="vertical" 
            name="create-fee" 
            onFinish={handleSubmit}
            initialValues={{
              id:fee._id,
              STT:  undefined,
              name: fee ? fee.name : '',
              amount: fee ? fee.amount : undefined,
              due: fee ? dayjs(fee.due) : undefined,
              status: fee ? (fee.status ? "Bắt buộc" : "Không bắt buộc") : '',
            }}
          >
            <Form.Item
              label="STT"
              name="STT"
            >
              <InputNumber min={1} disabled={fee ? true : false} />
            </Form.Item>
            <Form.Item
              label="Tên loại phí"
              name="name"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Giá/đơn vị"
              name="amount"
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Hạn nộp"
              name="due"
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label="Trạng thái"
              name="status"
            >
              <Select placeholder="Chọn trạng thái">
                <Option value="Bắt buộc">Bắt buộc</Option>
                <Option value="Không bắt buộc">Không bắt buộc</Option>
              </Select>
            </Form.Item>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                {fee ? "Cập nhật" : "Tạo mới"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default EditFee;
