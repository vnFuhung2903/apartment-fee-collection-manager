import axios from 'axios';

export const setFees = (fees) => ({
  type: "SET_FEES",
  payload: fees,
});
export const getHousehold = (households) => ({
  type: "SET_HOUSEHOLD",
  payload: households,
});

export const fetchFees = (household_id) => {
  return (dispatch) => {
    axios.get(`http://localhost:8386/payments/api/v1/payments?household_id=${household_id}`)  
          .then(response => {
            setFees(dispatch(setFees(response.data)));
          })
          .catch(error => {
            console.error("Error fetching fees data:", error);
          });
  };
};

export const fetchHouseholdDetails = (household_id) => {
  return (dispatch) => {
    return axios.get(`http://localhost:8386/household/api/v1/all?id=${household_id}`)
      .then(response => {
        dispatch(getHousehold(response.data));
      })
      .catch(error => {
        console.error("Error fetching household details:", error);
      });
  };
};
