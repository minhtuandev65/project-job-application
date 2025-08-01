import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import loadingImage from "@/assets/img/loading/loading.webp";
function Loading() {
  const { isLoading } = useSelector((state) => state.loadingReducer);

  return (
    <Fragment>
      {isLoading ? (
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            height: "100%",
            width: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99,
          }}
        >
          <img src={loadingImage} style={{ width: "15%" }} alt="Loading..." />
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}
export default Loading;
