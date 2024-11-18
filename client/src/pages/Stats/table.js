import "./stats.scss"
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

function Table(){
  const [data, setData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [visibleData, setVisibleData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8386/payments/api/v1/totalPayment")
      .then(res => res.json())
      .then(response => {
        const data = response.data; // Trích xuất mảng data từ kết quả trả về
        setData(data);
        setVisibleData(showAll === false ? data.slice(0, 2) : data); // Xử lý hiển thị tùy thuộc vào showAll
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, [showAll]);
  return (
    <>
      <div className="container__body">
        <main>
          <div className="recent_order">
              <h2>Thống kê các khoản thu</h2>
              <table> 
                  <thead>
                    <tr>
                      <th>Tên chủ căn hộ</th>
                      <th>Tổng phải nộp</th>
                      <th>Tổng thu</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                    <tbody>
                      {
                        visibleData.map(item => (
                          <tr>
                            <td>{item.headName}</td>
                            <td>{item.totalAmount}</td>
                            <td>{item.payed}</td>
                            <td>{Math.floor((item.payed / item.totalAmount) * 100)}%</td>
                            <td>
                              <Link to="*" className="primary">Chi tiết</Link>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
              </table>
              <a href="#" onClick={() => setShowAll(!showAll)}>Show All</a>
            </div>
        </main>
        </div>
    </>
  )
}

export default Table