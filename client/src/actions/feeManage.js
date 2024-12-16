import axios from "axios";

export const setTotalPayments = (totalPayments) => ({
  type: "SET_TOTAL_PAYMENTS",
  payload: totalPayments
});

export const fetchTotalPayments = () => {
  return (dispatch) => {
    axios.get("http://localhost:8386/payments/api/v1/totalPayment")
      .then((response) => {
        dispatch(setTotalPayments(response.data.data)); // Dữ liệu từ response.data.data
      });
  };
};
