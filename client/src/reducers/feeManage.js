const initialState = {
  totalPayments: [], // Khởi tạo state rỗng
};

const feeManageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TOTAL_PAYMENTS":
      return {
        ...state,
        totalPayments: action.payload, // Cập nhật totalPayments
      };
    default:
      return state;
  }
};

export default feeManageReducer;