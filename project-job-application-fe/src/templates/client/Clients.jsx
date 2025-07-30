import { useFetchMyProfile } from "@/hooks";
import { Footer, Header } from "@/layouts";
import React from "react";
import { Outlet } from "react-router";

function Clients() {
  const userProfile = useFetchMyProfile();

  return (
    <div className="mainTemplate bg-page">
      <Header userProfile={userProfile} />
      <div style={{ flex: 1 }}>
        <Outlet
          context={{
            userProfile,
          }}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Clients;
