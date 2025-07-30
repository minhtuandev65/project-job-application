import { Link } from "react-router-dom";

export const menuManageItems = [
  {
    key: "1",
    label: (
      <Link to="/admin/manageUser" className="w-80">
        Manage User
      </Link>
    ),
  },
  {
    key: "2",
    label: (
      <Link to="/admin/managecandidateprofile">Manage Candidate Profile</Link>
    ),
  },
  {
    key: "3",
    label: <Link to="/admin/managecompany">Manage Company</Link>,
  },
];
