import { Table } from "@/components";
import { menuColumnsCandidateProfileAdmin } from "@/helpers";

import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useOutletContext } from "react-router";

function ManageCandidateProfileListAdminPage() {
  const { candidateProfileList } = useOutletContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  return (
    <Table
      title={"Manage Candidate Profile"}
      columns={menuColumnsCandidateProfileAdmin(dispatch, navigate)}
      data={candidateProfileList}
    />
  );
}

export default ManageCandidateProfileListAdminPage;
