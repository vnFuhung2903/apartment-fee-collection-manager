import { Input, Form, Button, InputNumber, Select, DatePicker, notification } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import dayjs from "dayjs";
import axios from "axios";

function EditFee() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const fee = state ? state.fee : null;

  const householdsOptions = [
    { value: "101", label: "Hộ 101" },
    { value: "102", label: "Hộ 102" },
    { value: "103", label: "Hộ 103" },
  ];
  const [isMandatory, setIsMandatory] = useState(true);
  const handleStatusChange = (value) => {
    setIsMandatory(value === "required");
  };

  const [checkedList, setCheckedList] = useState(householdsOptions);

  const handleChange = (list) => {
    console.log("Checked List:", checkedList);
    setCheckedList(list);
  };
  const sharedProps = {
    mode: 'multiple',
    style: {
      width: '100%',
    },
    placeholder: 'Chọn hộ gia đình...',
    maxTagCount: 'responsive',
  };

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
      placement: "topRight",
      duration: 2,
      pauseOnHover: true,
    });
  };

  const handleSubmit = async (values) => {
    try {
      const payload = {};
      if (values.id) {
        payload.id = values.id;
      } else {
        openNotification("error", "Lỗi", "ID thiếu hoặc không hợp lệ!");
        return;
      }
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

      const response = await axios.post("http://localhost:8386/fees/api/v1/change", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        openNotification("success", "Thành công", "Cập nhật thành công!");
        setTimeout(() => {
          navigate("/fee_list");
        }, 2000);
      } else {
        openNotification("error", "Thất bại", "Cập nhật thất bại!");
      }
    } catch (error) {
      alert("Có lỗi xảy ra khi gửi yêu cầu !!!");
    }
  };

  const { Option } = Select;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  return (
    <>
      <div className="details__fee">
        <div className="recentCt">
          <div className="cardHeader">
            <h2>{fee ? "Cập nhật loại phí" : "Thêm loại phí"}</h2>
            <Link to="/fee_list" className="btn">
              Quay lại
            </Link>
          </div>
          <Form
            {...formItemLayout}
            layout="vertical"
            name="create-fee"
            onFinish={handleSubmit}
            initialValues={{
              id: fee ? fee._id : undefined,
              STT: undefined,
              name: fee ? fee.name : "",
              amount: fee ? fee.amount : undefined,
              due: fee ? dayjs(fee.due) : undefined,
              status: fee ? (fee.status ? "Bắt buộc" : "Không bắt buộc") : "",
            }}
          >
            <Form.Item name="id" style={{ display: "none" }}>
              <Input />
            </Form.Item>
            <Form.Item label="Tên loại phí" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Giá/đơn vị" name="amount">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Hạn nộp" name="due">
              <DatePicker />
            </Form.Item>
            <Form.Item label="Trạng thái" name="status">
              <Select placeholder="Chọn trạng thái" onChange={handleStatusChange}>
                <Option value="required">Bắt buộc</Option>
                <Option value="unrequired">Không bắt buộc</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Hộ gia đình"
              name="households"
              rules={!isMandatory ? [{ required: true }] : []}
            >
              <Select
                {...sharedProps}
                placeholder={isMandatory ? "Tất cả hộ gia đình" : "Chọn hộ gia đình"}
                disabled={isMandatory}
                value={checkedList}
                onChange={handleChange}
              >
                {householdsOptions.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
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
