export const setHouseholds = (households) => ({
  type: "SET_HOUSEHOLDS",
  payload: households
});

export const setDashboardData = (data) => ({
  type: "SET_DASHBOARD_DATA",
  payload: data
});

export const fetchHouseholds = (page) => {
  return (dispatch) => {
    fetch(`http://localhost:8386/household/api/v1/all?page=${page}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.status === 200) return res.json();
      })
      .then((data) => {
        dispatch(setHouseholds({
          households: data.array, 
          totalItems: data.totalItems, 
          limitItem: data.limitItem,
        }));
      });
  };
};

export const fetchDashboardData = () => {
  return (dispatch) => {
    fetch("http://localhost:8386/api/v1/dashboard", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.status === 200) return res.json();
      })
      .then((data) => {
        dispatch(setDashboardData(data));
      });
  };
};
