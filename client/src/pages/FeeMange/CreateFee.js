import { Input, Form, Button, InputNumber, Select, DatePicker, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from "react";

function CreateFee() {
  const [households, setHouseholdsOptions] = useState([]);
  const [loadingHouseholds, setLoadingHouseholds] = useState(true);

  useEffect(() => {
    const fetchHouseholds = async () => {
      try {
        const response = await axios.get("http://localhost:8386/household/api/v1/all");
        const options = response.data.map((household) => ({
          id:household.id,
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
  const navigate = useNavigate();

  const handleStatusChange = (value) => {
    setIsMandatory(value === "required");
  };

  const [checkedList, setCheckedList] = useState(households);

  const handleChange = (list) => {
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
      const payload = {
        name: values.feeName,
        amount: values.price,
        due: values.deadline ? values.deadline.format("YYYY-MM-DD") : null,
        status: values.status === "required" ? "Bắt buộc" : "Không bắt buộc",
        households: values.status === "required" ? "Tất cả" : values.households,
      };

      if (!payload.name || !payload.amount || !payload.due) {
        openNotification("error", "Thất bại", "Vui lòng điền đủ thông tin bắt buộc!");
        return;
      }
      const response = await axios.post(
        "http://localhost:8386/fees/api/v1/post",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        openNotification("success", "Thành công", "Thêm mới thành công!");
        navigate("/fee_list");
      } else {
        openNotification("error", "Thất bại", "Thêm mới thất bại!");
      }
    } catch (error) {
      openNotification("error", "Thất bại", "Có lỗi xảy ra khi gửi yêu cầu!");
    }
  };

  return (
    <>
      <div className="details__fee">
        <div className="recentCt">
          <div className="cardHeader">
            <h2>Thêm loại phí</h2>
            <Link to="/fee_list" className="btn">
              Quay lại
            </Link>
          </div>
          <Form layout="vertical" name="create-fee" onFinish={handleSubmit}>
            <Form.Item
              label="Tên loại phí"
              name="feeName"
              rules={[{ required: true, message: "Bắt buộc!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Giá/đơn vị"
              name="price"
              rules={[{ required: true, message: "Bắt buộc!" }]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              label="Hạn nộp"
              name="deadline"
              rules={[{ required: true, message: "Bắt buộc!" }]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              label="Trạng thái"
              name="status"
              rules={[{ required: true, message: "Bắt buộc!" }]}
            >
              <Select placeholder="Chọn trạng thái" onChange={handleStatusChange}>
                <Select.Option value="required">Bắt buộc</Select.Option>
                <Select.Option value="not_required">Không bắt buộc</Select.Option>
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
                  {households.map((option) => (
                    <Select.Option key={option.value} value={option.id}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Tạo mới
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default CreateFee;