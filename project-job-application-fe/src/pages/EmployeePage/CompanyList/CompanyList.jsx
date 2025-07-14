import React, { useEffect } from "react";
import CardList from "../../../components/Card/CardList";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterCompaniesAction } from "../../../redux/actions/Users/search/searchAction";
import { Select, InputNumber, Button } from "antd";
const { Option } = Select;
function CompanyList() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { filterData } = useSelector((state) => state.searchReducer);
  const category = searchParams.get("category");
  const address = searchParams.get("address");
  const workingType = searchParams.get("workingType");
  const minSalary = searchParams.get("minSalary");

  useEffect(() => {
    const filters = {};
    if (category) filters.category = category;
    if (address) filters.address = address;
    if (workingType) filters.workingType = workingType;
    if (minSalary) filters.minSalary = minSalary;

    dispatch(filterCompaniesAction(filters));
  }, [dispatch, category, address, workingType, minSalary]);
  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };
  return (
    <div className="bg-page containerPage">
      {/* Bộ lọc */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-6">
        <Select
          placeholder="Category"
          allowClear
          onChange={(value) => handleFilterChange("category", value)}
          defaultValue={category || undefined}
        >
          <Option value="restaurant">Restaurant</Option>
          <Option value="Store">Store</Option>
          <Option value="technology">Technology</Option>
          <Option value="other">Other</Option>
        </Select>

        <Select
          placeholder="Working Type"
          allowClear
          onChange={(value) => handleFilterChange("workingType", value)}
          defaultValue={workingType || undefined}
        >
          <Option value="fulltime">Full Time</Option>
          <Option value="parttime">Part Time</Option>
        </Select>

        <Select
          placeholder="City"
          allowClear
          onChange={(value) => handleFilterChange("address", value)}
          defaultValue={address || undefined}
        >
          <Option value="Hanoi">Hà Nội</Option>
          <Option value="HCM">TP. HCM</Option>
          <Option value="Danang">Đà Nẵng</Option>
        </Select>

        <InputNumber
          placeholder="Min Salary"
          style={{ width: "100%" }}
          onChange={(value) => handleFilterChange("minSalary", value)}
          defaultValue={minSalary ? Number(minSalary) : undefined}
          min={0}
        />
      </div>

      {/* Danh sách công ty */}
      <CardList data={filterData} />
    </div>
  );
}

export default CompanyList;
