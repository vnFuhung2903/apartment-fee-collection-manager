import axios from "axios";

// Actions
export const setTotalPayments = (totalPayments) => ({
  type: "SET_TOTAL_PAYMENTS",
  payload: totalPayments
});

export const setTotalPayment = (totalPayment) => ({
  type: "SET_TOTAL_PAYMENT",
  payload: totalPayment
});

export const setError = (error) => ({
  type: "SET_ERROR",
  payload: error
});

// Fetch actions with error handling
export const fetchTotalPayments = (page) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:8386/payments/api/v1/payments?page=${page}`);
      dispatch(setTotalPayments({
        totalPayments: response.data.array,
        limitItem: response.data.limitItem,
        totalItems: response.data.totalItems,
        currentPage: response.data.currentPage
      })); 
    } catch (error) {
      dispatch(setError("Failed to fetch total payments"));
      console.error("Error fetching total payments:", error);
    }
  };
};

export const fetchTotalPayment = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:8386/payments/api/v1/totalPayment");
      dispatch(setTotalPayment(response.data.data)); 
    } catch (error) {
      dispatch(setError("Failed to fetch total payment"));
      console.error("Error fetching total payment:", error);
    }
  };
};
