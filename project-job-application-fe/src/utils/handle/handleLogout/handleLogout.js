export const handleLogout = async (navigate, dispatch) => {
  await dispatch(logoutAction());
  navigate("/login");
};
