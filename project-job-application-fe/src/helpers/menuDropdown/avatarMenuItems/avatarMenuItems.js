import { handleLogout } from "@/utils";

export const avatarMenuItems = ({ navigate, dispatch, role }) => {
  return [
    {
      key: "1",
      label: <Link to="/home/me">My Profile</Link>,
    },
    role?.includes("EMPLOYEE") && {
      key: "3",
      label: <Link to="/home/candidateProfile">Candidate Profile</Link>,
    },
    {
      key: "2",
      label: (
        <span onClick={() => handleLogout(navigate, dispatch)}>Logout</span>
      ),
    },
  ].filter(Boolean); // loại bỏ item false khi role không match
};
