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
      <Link to="/admin/manageCandidateProfile">Manage Candidate Profile</Link>
    ),
  },
  {
    key: "3",
    label: <Link to="/admin/manageCompany">Manage Company</Link>,
  },
];
