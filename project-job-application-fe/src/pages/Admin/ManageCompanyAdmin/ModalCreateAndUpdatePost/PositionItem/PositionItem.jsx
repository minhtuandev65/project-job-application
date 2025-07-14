import React from "react";
import { regexPattern } from "../../../../../utils/Validators/regex";
import SkillList from "../SkillList/SkillList";
import ButtonCustom from "../../../../../components/ButtonCustom/ButtonCustom";
import { Form, Input, InputNumber, Select, Button, Space } from "antd";
const { Option } = Select;
function PositionItem({ name, restField, remove }) {
  return (
    <div className="border p-2 mb-2 rounded">
      <Space direction="vertical" style={{ width: "100%" }}>
        <Form.Item
          {...restField}
          name={[name, "title"]}
          label="Position Title"
          validateTrigger="onFocus"
          rules={[
            { required: true, message: "Title is required !" },
            {
              pattern: regexPattern,
              message:
                "Only enter letters or numbers, 3 to 100 characters long",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...restField}
          name={[name, "quantity"]}
          label="Quantity"
          validateTrigger="onFocus"
          rules={[
            { required: true, message: "Quantity is required !" },
            {
              type: "number",
              min: 1,
              message: "Quantity must be at least 1",
            },
          ]}
        >
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          {...restField}
          name={[name, "description"]}
          label="Description"
          validateTrigger="onFocus"
          rules={[{ required: true, message: "Desciption is required !" }]}
        >
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item
          {...restField}
          name={[name, "basicSalary"]}
          label="Basic Salary"
          validateTrigger="onFocus"
          rules={[
            {
              required: true,
              message: "Basic Salary is required !",
            },
            {
              type: "number",
              min: 1,
              message: "Quantity must be at least 1",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          {...restField}
          name={[name, "workingType"]}
          label="Working Type"
          validateTrigger="onFocus"
          rules={[
            {
              required: true,
              message: "Working Type is required !",
            },
          ]}
        >
          <Select>
            <Option value="FULLTIME">Full-time</Option>
            <Option value="PARTTIME">Part-time</Option>
          </Select>
        </Form.Item>
        <Form.Item
          {...restField}
          name={[name, "workingHours"]}
          label="Working Hours"
          validateTrigger="onFocus"
          rules={[
            {
              required: true,
              message: "Working Hours is required !",
            },
          ]}
        >
          <Input placeholder="e.g., 08:00 - 17:00" />
        </Form.Item>
        <SkillList name={name} />
        <Button danger onClick={() => remove(name)}>
          Remove Position
        </Button>
      </Space>
    </div>
  );
}

export default PositionItem;
