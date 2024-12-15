import axios from "axios";

export const setTotalPayments = (totalPayments) => ({
  type: "SET_TOTAL_PAYMENTS",
  payload: totalPayments
});
export const setTotalPayment = (totalPayment) => ({
  type: "SET_TOTAL_PAYMENT",
  payload: totalPayment
});

export const fetchTotalPayments = () => {
  return (dispatch) => {
    axios.get("http://localhost:8386/payments/api/v1/payments")
      .then((response) => {
        dispatch(setTotalPayments(response.data)); // Dữ liệu từ response.data
      });
  };
};

export const fetchTotalPayment = () => {
  return (dispatch) => {
    axios.get("http://localhost:8386/payments/api/v1/totalPayment")
      .then((response) => {
        dispatch(setTotalPayment(response.data.data)); // Dữ liệu từ response.data.data
      });
  };
};
