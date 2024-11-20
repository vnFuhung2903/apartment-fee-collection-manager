import axios from 'axios';

export const setFees = (fees) => ({
  type: "SET_FEES",
  payload: fees,
});

export const fetchFees = () => {
  return (dispatch) => {
    axios.get('http://localhost:8386/fees/api/v1/fees')  
          .then(response => {
            setFees(dispatch(setFees(response.data)));
          })
          .catch(error => {
            console.error("Error fetching fees data:", error);
          });
  };
};

