import "./stats.scss"
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

function Table(){
  const [data, setData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [visibleData, setVisibleData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/customer_costs")
      .then(res => res.json())
      .then(data => {
        setData(data);
        setVisibleData(showAll == false ? data.slice(0, 2) : data);
      })
  }, [showAll])
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
                            <td>{item.name}</td>
                            <td>{item.total}</td>
                            <td>{item.payed}</td>
                            <td>{Math.floor((item.payed / item.total) * 100)}%</td>
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