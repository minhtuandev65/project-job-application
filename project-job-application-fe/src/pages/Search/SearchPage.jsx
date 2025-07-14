import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchElasticAction } from "../../redux/actions/Users/search/searchAction";
import { useSearchParams } from "react-router-dom";
import { Image, Select, Typography, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Option } = Select;

function SearchPage() {
  const dispatch = useDispatch();
  const [keyword, setSearchKeyword] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);
  const { searchData } = useSelector((state) => state.searchReducer);
  const [selectedPositions, setSelectedPositions] = useState({});

  useEffect(() => {
    const keyword = searchParams.get("keyword");
    if (keyword) {
      setSearchKeyword(keyword);
      dispatch(searchElasticAction(keyword));
    }
  }, [dispatch, searchParams]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      { threshold: 1 }
    );
    if (loader.current) obs.observe(loader.current);
    return () => loader.current && obs.unobserve(loader.current);
  }, []);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + 6);
  }, []);

  useEffect(() => {
    if (searchData.length > 0) setLoading(false);
  }, [searchData]);
  console.log("searchData", searchData);
  return (
    <div className="containerPage pt-24 pb-24">
      <Typography.Title level={3} className="custom-title !mb-10">
        Search results
      </Typography.Title>

      {loading ? (
        <div style={{ textAlign: "center" }}>
          <LoadingOutlined style={{ fontSize: "40px" }} spin />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchData.slice(0, visibleCount).map((result) => {
            const item = result.rest || [];
            return (
              <div>
                <div key={item._id} className="company-card">
                  <div className="text-center mt-10">
                    <Image
                      src={item?.logoUrl}
                      width={160}
                      height={160}
                      alt="Company Logo"
                      style={{ objectFit: "cover", borderRadius: "50%" }}
                    />
                  </div>
                  <div className="company-info">
                    <div className="company-name">{item.companyName}</div>
                    <div className="text-sm text-gray-500 truncate">
                      {item.address}
                    </div>
                    <div className="mt-2">
                      <h3 className="text-lg font-semibold mb-1">
                        Position recruitment:
                      </h3>
                      {item.positions && item.positions.length > 0 && (
                        <div className="mt-2">
                          <Select
                            defaultValue={item.positions[0].title}
                            style={{ width: "100%", marginBottom: "8px" }}
                            onChange={(value) => {
                              setSelectedPositions((prev) => ({
                                ...prev,
                                [item._id]: value,
                              }));
                            }}
                          >
                            {item.positions.map((pos, index) => (
                              <Option key={index} value={pos.title}>
                                {pos.title}
                              </Option>
                            ))}
                          </Select>

                          {item.positions
                            .filter(
                              (pos) =>
                                pos.title ===
                                (selectedPositions?.[item._id] ||
                                  item.positions[0].title)
                            )
                            .map((pos, index) => (
                              <div key={index}>
                                <div className="job-title">
                                  Quantity: {pos.quantity}
                                </div>
                                <div className="salary">
                                  Basic Salary:{" "}
                                  {pos.basicSalary.toLocaleString("vi-VN")}₫
                                </div>
                                <div className="job-title">
                                  Working Type: {pos.workingType}
                                </div>
                                <div className="job-title">
                                  Working Hours: {pos.workingHours}
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                      <div className="flex justify-end mt-2">
                        <Link
                          className="text-blue-500 hover:underline"
                          to={`/home/company/${result.id}/detail`}
                        >
                          View Detail
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {searchData.length > visibleCount && (
        <div ref={loader} style={{ textAlign: "center", marginTop: 20 }}>
          <Button type="primary" onClick={loadMore}>
            View More
          </Button>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
