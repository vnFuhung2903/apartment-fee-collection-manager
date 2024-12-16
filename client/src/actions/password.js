export const changePassword = (oldPassword, newPassword, navigate) => {
  return async (dispatch) => {
    dispatch({ type: "CHANGE_PASSWORD_REQUEST" });

    try {
      const response = await fetch("http://localhost:8386/auth/api/v1/changePassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: localStorage.getItem("user"),
          oldPassword: oldPassword,
          newPassword: newPassword
        })
      });

      const data = await response.json();

      if (data.message === "Password updated") {
        dispatch({ type: "CHANGE_PASSWORD_SUCCESS", payload: data });
        navigate("/dashboard");
      } else {
        dispatch({ type: "CHANGE_PASSWORD_FAILURE", error: data.message });
        alert(data.message);
      }
    } catch (error) {
      dispatch({ type: "CHANGE_PASSWORD_FAILURE", error: "Có lỗi xảy ra khi thay đổi mật khẩu" });
      alert("Có lỗi xảy ra khi thay đổi mật khẩu");
    }
  };
};
