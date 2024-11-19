import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import "./style.css"
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalPayments } from "../../actions/feeManage";

function FeeMange(){
  const dispatch = useDispatch();

  const totalPayment = useSelector((state) => state.feeManageReducer.totalPayments);

  useEffect(() => {
    dispatch(fetchTotalPayments());
  }, [dispatch]);
  return (
    <>
      <div className="details__fee">
                <div className="recentCt">
                    <div className="cardHeader">
                        <h2>Quản lý thu phí chung cư</h2>
                        <button className="btn">Thêm khoản phí mới</button>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <td>Tên hộ gia đình</td>
                                <td>Tổng phí</td>
                                <td>Trạng thái</td>
                                <td>Chi tiết</td>
                            </tr>
                        </thead>
                        <tbody>
                            {totalPayment.map((Tpayment,index) => (
                              <tr key={index}>
                                <td>{Tpayment.headName}</td>
                                <td>{Tpayment.totalAmount - Tpayment.payed}</td>
                                <td>
                                  <span className={Tpayment.totalAmount === 0 ? "status-paid" : "status-unpaid"}>
                                    {Tpayment.totalAmount === 0 ? "Đã thanh toán" : "Chưa thanh toán"}
                                  </span>
                                </td>
                                <td>
                                  <Link to="/detail">
                                    <button className="btn-details">Xem</button>
                                  </Link>
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
export default FeeMange