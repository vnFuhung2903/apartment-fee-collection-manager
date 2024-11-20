import axios from "axios";

export const setPayments = (payments) => ({
  type: "SET_PAYMENTS",
  payload: payments
});

export const setTotalPayment = (totalPayment) => ({
  type: "SET_TOTAL_PAYMENT",
  payload: totalPayment
});

export const fetchPayments = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:8386/payments/api/v1/payments?limit=3&status=done")
      .then((response) => {
        dispatch(setPayments(response.data));
      })
      .catch((error) => {
        console.error("Error fetching fees data:", error);
      });
  };
};

export const fetchTotalPayment = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:8386/payments/api/v1/totalPayment")
      .then((response) => {
        const data = response.data.data;
        if (Array.isArray(data))
        dispatch(setTotalPayment(response.data.data));
        else {
          console.error("Dữ liệu không phải là mảng:", data);
        }
      });
  };
};