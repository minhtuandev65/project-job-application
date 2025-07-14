import React from "react";
import PositionItem from "../PositionItem/PositionItem";
import { Form, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function PositionListFields() {
  return (
    <Form.List name="positions">
      {(fields, { add, remove }) => (
        <>
          <label>Positions</label>
          {fields.map(({ key, name, ...restField }) => (
            <PositionItem
              key={key}
              name={name}
              restField={restField}
              remove={remove}
            />
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
              Add Position
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
}

export default PositionListFields;
