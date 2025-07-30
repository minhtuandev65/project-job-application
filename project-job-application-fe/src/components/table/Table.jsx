import React from "react";
import { Table as AntTable } from "antd";
function Table({ title, columns, data }) {
  
  return (
    <div className="containerPage">
      <h2 style={{ fontSize: 24, marginBottom: 16, margin: 15 }}>{title}</h2>
      <AntTable
        columns={columns}
        dataSource={data}
        rowKey="_id"
        pagination={{ pageSize: 12 }}
        scroll={{ x: 1200 }}
      />
    </div>
  );
}

export default Table;
