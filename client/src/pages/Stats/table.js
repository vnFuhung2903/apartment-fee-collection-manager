import "./stats.scss"
import { useState, useEffect } from 'react'

function Table(){
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/customer_costs")
      .then(res => res.json())
      .then(data => {
        setData(data);
      })
  }, [])
  return (
    <>
      <div class="container__body">
        <main>
          <div class="recent_order">
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
                      {/* <tr>
                        <td>Mini USB</td>
                        <td>4563</td>
                        <td>Due</td>
                        <td class="warning">Pending</td>
                        <td class="primary">Details</td>
                      </tr> */}
                      {
                        data.map(item => (
                          <tr>
                            <td>{item.name}</td>
                            <td>{item.total}</td>
                            <td>{item.payed}</td>
                            <td>{Math.floor((item.payed / item.total) * 100)}%</td>
                          </tr>
                        ))
                      }
                    </tbody>
              </table>
              <a href="#">Show All</a>
            </div>
        </main>
        </div>
    </>
  )
}

export default Table