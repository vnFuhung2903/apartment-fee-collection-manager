import "./stats.scss";
import profile from "./images/profile-1.jpg";
import { useState, useEffect } from "react";
import axios from "axios";

function Chart() {
  const [data, getTotalHousehold] = useState([]);
  const [payFull, setPayFull] = useState(0);
  const [payment, setPayment] = useState(0);
  const [total, setTotal] = useState(0);
  const [payments, getPayments] = useState([]);
  const r = 30;

  useEffect(() => {
    // Gọi API khi component Detail được load
    axios
      .get("http://localhost:3180/payments/api/v1/payments?limit=3&status=done")
      .then((response) => {
        getPayments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching fees data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3180/payments/api/v1/totalPayment")
      .then((response) => {
        const data = response.data.data;
        if (Array.isArray(data)) {
          setPayFull(
            data.reduce(
              (payFull, item) =>
                (payFull =
                  item.payed === item.totalAmount ? payFull + 1 : payFull),
              0
            )
          );

          setPayment(data.reduce((sum, item) => sum + item.payed, 0));

          setTotal(data.reduce((sum, item) => sum + item.totalAmount, 0));
          getTotalHousehold(data);
        } else {
          console.error("Dữ liệu không phải là mảng:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching fees data:", error);
      });
  }, []);

  return (
    <>
      {/* Insights Part */}
      <div className="container__header">
        <main>
          <h2>Biểu đồ</h2>
          <div className="insights">
            <div div className="pay-full">
              <span className="material-symbols-sharp">trending_up</span>
              <div className="middle">
                <div className="left">
                  <h3>Số hộ đã nộp đủ</h3>
                  <h1>
                    {payFull}/{data.length}
                  </h1>
                </div>
                <div className="progress">
                  <svg>
                    <circle
                      r={r}
                      cy="40"
                      cx="40"
                      strokeDasharray={2 * Math.PI * r}
                      strokeDashoffset={
                        2 * Math.PI * r * (1 - payFull / data.length)
                      }
                      transform={`rotate(-90, 40, 40)`}
                    ></circle>
                  </svg>
                  <div className="number">
                    <p>{Math.floor((payFull / data.length) * 100)}%</p>
                  </div>
                </div>
              </div>
              <small>24h gần nhất</small>
            </div>

            <div className="payment">
              <span className="material-symbols-sharp">local_mall</span>
              <div className="middle">
                <div className="left">
                  <h3>Tổng thu</h3>
                  <h1>
                    ${payment} / ${total}
                  </h1>
                </div>
                <div className="progress">
                  <svg>
                    <circle
                      r={r}
                      cy="40"
                      cx="40"
                      strokeDasharray={2 * Math.PI * r}
                      strokeDashoffset={2 * Math.PI * r * (1 - payment / total)}
                      transform={`rotate(-90, 40, 40)`}
                    ></circle>
                  </svg>
                  <div className="number">
                    <p>{Math.floor((payment / total) * 100)}%</p>
                  </div>
                </div>
              </div>
              <small>24h gần nhất</small>
            </div>
          </div>
        </main>
        {/* <!------------------
         end main Insights
        ------------------->

      <!----------------
        start right main 
      ----------------------> */}
        <div className="right">
          <div className="recent_updates">
            <h2>Cập nhật gần đây</h2>
            <div className="updates">
              {payments.map((payment, index) => (
                <div className="update">
                  <img src={profile} alt="" />
                  <div className="message">
                    <p>
                      <b>{payment.householdHead}</b> Đã đóng {payment.amount}{" "}
                      VND {payment.feeName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chart;
