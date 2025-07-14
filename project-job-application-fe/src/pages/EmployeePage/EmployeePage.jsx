import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListPostAction } from "../../redux/actions/CompanyActions/CompanyActions";
import HomePage from "./home/HomePage";

function EmployeePage() {
  const dispatch = useDispatch();

  const { listCompany } = useSelector((state) => state.CompanyReducer);
  useEffect(() => {
    dispatch(getListPostAction());
  }, [dispatch]);
  return <HomePage listCompany={listCompany} />;
}

export default EmployeePage;
