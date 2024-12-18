import { checkAuth } from "./checkAuth";
import { changePassword } from "./password";
import { setPayments, fetchPayments } from "./chart";
import { setFees, setHouseholdDetail, fetchFees, fetchHouseholdDetail,fetchDoneFees,setDoneFees } from "./feeDetail";
import { setTotalPayments, fetchTotalPayments,setTotalPayment, fetchTotalPayment } from "./feeManage";
import { fetchDashboardData, fetchHouseholds, setDashboardData, setHouseholds } from "./page1";

export {
    checkAuth,
    changePassword,
    fetchDashboardData,
    setDashboardData,
    fetchFees,
    setFees,
    fetchHouseholdDetail,
    setDoneFees,
    fetchDoneFees,
    setHouseholdDetail,
    fetchHouseholds,
    setHouseholds,
    fetchPayments,
    setPayments,
    fetchTotalPayments,
    setTotalPayments,
    fetchTotalPayment,
    setTotalPayment
}