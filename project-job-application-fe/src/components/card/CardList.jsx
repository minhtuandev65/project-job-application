import React, { useState } from "react";
import { Image, Select } from "antd";
import { Link } from "react-router-dom";
const { Option } = Select;
function CardList({ data }) {
  const [selectedPositions, setSelectedPositions] = useState({});
  return (
    <div className="pt-24 pb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((company) => (
        <div key={company._id} className="px-2">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col max-w-sm md:max-w-md mx-auto h-full">
            <div className="text-center mt-6">
              <Image
                src={company?.logoUrl}
                width={120}
                height={120}
                alt="Company Logo"
                className="mx-auto object-cover rounded-full"
              />
            </div>

            <div className="p-4 flex flex-col gap-2">
              <div className="text-xl font-semibold text-blue-700 text-center sm:text-left">
                {company.companyName}
              </div>
              <div className="text-sm text-gray-500 truncate text-center sm:text-left">
                {company.address}
              </div>

              <div className="mt-2">
                <h3 className="text-base font-semibold mb-1">
                  Position recruitment:
                </h3>

                {company.positions && company.positions.length > 0 && (
                  <div className="mt-2">
                    <Select
                      defaultValue={company.positions[0].title}
                      style={{ width: "100%", marginBottom: "8px" }}
                      onChange={(value) => {
                        setSelectedPositions((prev) => ({
                          ...prev,
                          [company._id]: value,
                        }));
                      }}
                    >
                      {company.positions.map((pos, index) => (
                        <Option key={index} value={pos.title}>
                          {pos.title}
                        </Option>
                      ))}
                    </Select>

                    {company.positions
                      .filter(
                        (pos) =>
                          pos.title ===
                          (selectedPositions?.[company._id] ||
                            company.positions[0].title)
                      )
                      .map((pos, index) => (
                        <div key={index} className="space-y-1">
                          <div className="text-sm font-medium text-gray-700">
                            Quantity: {pos.quantity}
                          </div>
                          <div className="text-sm text-green-600 font-semibold">
                            Basic Salary:{" "}
                            {pos.basicSalary.toLocaleString("vi-VN")}₫
                          </div>
                          <div className="text-sm font-medium text-gray-700">
                            Working Type: {pos.workingType}
                          </div>
                          <div className="text-sm font-medium text-gray-700">
                            Working Hours: {pos.workingHours}
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                <div className="flex justify-end mt-3">
                  <Link
                    className="text-blue-500 hover:underline text-sm"
                    to={`/home/company/${company._id}/detail`}
                  >
                    View Detail
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardList;
