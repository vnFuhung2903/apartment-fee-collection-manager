import { checkAuth } from "./checkAuth";
import { changePassword } from "./password";
import { setPayments, fetchPayments } from "./chart";
import { setFees, setHouseholdDetail, fetchFees, fetchHouseholdDetail } from "./feeDetail";
import { setTotalPayments, fetchTotalPayments } from "./feeManage";
import { fetchDashboardData, fetchHouseholds, setDashboardData, setHouseholds } from "./page1";

export {
    checkAuth,
    changePassword,
    fetchDashboardData,
    setDashboardData,
    fetchFees,
    setFees,
    fetchHouseholdDetail,
    setHouseholdDetail,
    fetchHouseholds,
    setHouseholds,
    fetchPayments,
    setPayments,
    fetchTotalPayments,
    setTotalPayments
}