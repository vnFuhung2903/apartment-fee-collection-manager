import { Input, Form, Button, InputNumber, Select, DatePicker } from "antd";
import { Link, useLocation } from "react-router-dom";
import dayjs from "dayjs";

function EditFee() {
  const { state } = useLocation();
  const fee = state ? state.fee : null;

  const handleSubmit = (values) => {
    console.log(values);
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
              STT: fee ? fee.id : undefined,
              feeName: fee ? fee.name : '',
              price: fee ? fee.price : undefined,
              deadline: fee ? dayjs(fee.dueDate) : undefined,
              status: fee ? fee.mandatory : '',
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
              name="feeName"
              rules={[{ required: true, message: 'Bắt buộc!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Giá/đơn vị"
              name="price"
              rules={[{ required: true, message: 'Bắt buộc!' }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Hạn nộp"
              name="deadline"
              rules={[{ required: true, message: 'Bắt buộc!' }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label="Trạng thái"
              name="status"
              rules={[{ required: true, message: 'Bắt buộc!' }]}
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
