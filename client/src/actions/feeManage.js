import axios from "axios"

// Actions
export const setAllPayments = (totalPayments) => ({
  type: "SET_ALL_PAYMENTS",
  payload: totalPayments
});

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

export const fetchTotalPayments = (page) => async (dispatch) => {
  try {
      // const queryString = new URLSearchParams(params).toString();
      // console.log(queryString);
      // console.log(params);
      const response = await axios.get(`http://localhost:8386/payments/api/v1/payments?page=${page}`);
        dispatch(setTotalPayments({
        totalPayments: response.data.array,
        limitItem: response.data.limitItem,
        totalItems: response.data.totalItems,
        currentPage: response.data.currentPage
      })); 
  } catch (error) {
      console.error('Error fetching payments:', error);
  }
};

export const fetchAllPayments = () => {
  return async (dispatch) => {
    const response = await axios.get(`http://localhost:8386/payments/api/v1/payments`);
    const limitItem = response.data.limitItem;  
    const totalItems = response.data.totalItems;  
    const totalPages = Math.ceil(totalItems / limitItem); // Tính số trang cần lấy

    let allPaymentsData = [];

    for (let page = 1; page <= totalPages; page++) {
      try {
        const response = await axios.get(`http://localhost:8386/payments/api/v1/payments?page=${page}`);
        allPaymentsData = [...allPaymentsData, ...response.data.array];  // Gộp dữ liệu vào array
      } catch (error) {
        console.error("Error fetching payments on page", page, error);
        break;
      }
    }
    dispatch(setAllPayments({
      totalPayments: allPaymentsData,
      limitItem: limitItem,
      totalItems: totalItems
    }));
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
