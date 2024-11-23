import "./style.css"
import {useState, useEffect} from "react"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { fetchFees,fetchHouseholdDetails  } from "../../actions/feeDetail";

function Detail(){
    const dispatch = useDispatch();
    const { household_id } = useParams();
    const fees = useSelector(state => state.feeDetailReducer.fees);
    const households = useSelector(state => state.householdDetailReducer.households);
    useEffect(() => {
        Promise.all([
          dispatch(fetchFees(household_id)),      // Gọi API fetchFees
          dispatch(fetchHouseholdDetails(household_id)) // Gọi API fetchHouseholdDetails
        ])
        .catch((error) => {
          console.error("Error in one or both API calls:", error);
        });
      }, [dispatch, household_id]);
      if (!fees || !households || households.length === 0) {
        return <div>Đang tải dữ liệu...</div>;
      }
    
  return (
    <>
      <div className="details__fee">
                <div className="recentCt">
                    <div className="cardHeader">
                        <h2>Chi tiết các khoản phí cho Hộ gia đình: {households[0]?.head || "Loading...."}</h2>
                        <Link to="/fee_manage" className="btn">Quay lại</Link>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <td>Loại phí</td>
                                <td>Số tiền</td>
                                <td>Ngày thu</td>
                                <td>Tình trạng</td>
                                <td>Trạng thái</td>
                            </tr>
                        </thead>
                        <tbody>
                            {fees.map((fee, index) => (
                                <tr key={index}>
                                    <td>{fee.feeName}</td>
                                    <td>{fee.amount} VNĐ</td>
                                    <td>
                                        {fee.payment_date ? new Date(fee.payment_date).toLocaleDateString('vi-VN') : 'Chưa có ngày'}                                     
                                    </td>
                                    <td>
                                        {fee.payment_date && new Date(fee.payment_date) <= new Date() ? 'Đến hạn thanh toán' : 'Chưa đến hạn thanh toán'}
                                    </td>
                                    <td>
                                        <span className={fee.status === 'Đã thanh toán' ? 'status-paid' : 'status-unpaid'}>
                                        {fee.status === 'Đã thanh toán' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
    </>
  )
}
export default Detail