import { useFetchAllCandidateProfileAdmin, useFetchMyProfile } from "@/hooks";
import { Footer, Header } from "@/layouts";
import React from "react";
import { Outlet } from "react-router";

function Admin() {
  const userProfile = useFetchMyProfile();
  const { candidateProfileList } = useFetchAllCandidateProfileAdmin();
  return (
    <div className="mainTemplate bg-page">
      <Header userProfile={userProfile} />
      <div style={{ flex: 1 }}>
        <Outlet
          context={{
            candidateProfileList,
          }}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Admin;
