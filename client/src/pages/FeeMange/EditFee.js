import { Input, Form, Button, InputNumber, Select, DatePicker, notification } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";

function EditFee() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const fee = state ? state.fee : null;

  const [householdsOptions, setHouseholdsOptions] = useState([]);
  const [loadingHouseholds, setLoadingHouseholds] = useState(true);

  useEffect(() => {
    const fetchHouseholds = async () => {
      try {
        const response = await axios.get("http://localhost:8386/household/api/v1/all");
        const options = response.data.map((household) => ({
          household_id:household.id,
          value: household.numbers[0],
          label: `Hộ ${household.head}`,
        }));
        setHouseholdsOptions(options);
        setLoadingHouseholds(false);
      } catch (error) {
        console.error("Error fetching household options:", error);
        setLoadingHouseholds(false);
      }
    };

    fetchHouseholds();
  }, []);

  const [isMandatory, setIsMandatory] = useState(true);
  const handleStatusChange = (value) => {
    setIsMandatory(value === "required");
  };

  const [checkedList, setCheckedList] = useState([]);
  const handleChange = (list) => {
    setCheckedList(list);
  };

  const sharedProps = {
    mode: "multiple",
    style: {
      width: "100%",
    },
    placeholder: "Chọn hộ gia đình...",
    maxTagCount: "responsive",
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
        payload.status = values.status === "required" ? "Bắt buộc" : "Không bắt buộc";
      }
      if(values.households) {
        payload.households = values.status === "required" ? "Tất cả" : values.households;
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
      openNotification("error", "Lỗi", "Có lỗi xảy ra khi gửi yêu cầu !!!");
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
              {loadingHouseholds ? (
                <p>Đang tải danh sách hộ gia đình...</p>
              ) : (
                <Select
                  {...sharedProps}
                  placeholder={isMandatory ? "Tất cả hộ gia đình" : "Chọn hộ gia đình"}
                  disabled={isMandatory}
                  value={checkedList}
                  onChange={handleChange}
                >
                  {householdsOptions.map((option) => (
                    <Select.Option key={option.value} value={option.household_id}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              )}
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
