import "./stats.scss"
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalPayment } from "../../actions/chart"

function Table(){
  const dispatch = useDispatch();
  const {totalPaymentData } = useSelector((state) => state.chartReducer);
  const [showAll, setShowAll] = useState(false);

  const visibleData = totalPaymentData;

  useEffect(() => {
    dispatch(fetchTotalPayment());
  }, [dispatch]);
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
                      <th>Tổng phải nộp (VNĐ)</th>
                      <th>Tổng thu (VNĐ)</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                    <tbody>
                      {
                        visibleData.map((item, index) => (
                          <tr key={index}>
                            <td>{item.headName}</td>
                            <td>{item.totalAmount}</td>
                            <td>{item.payed}</td>
                            <td>{Math.floor((item.payed / item.totalAmount) * 100)}%</td>
                            <td>
                              <Link to="/detail" className="primary">Chi tiết</Link>
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