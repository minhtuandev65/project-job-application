import React from "react";
import { Form, Input, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

function SkillList({ name }) {
  return (
    <Form.List name={[name, "skills"]}>
      {(skillFields, { add, remove }) => (
        <>
          <label>Skills</label>
          {skillFields.map(({ key, name: skillName, ...skillRest }) => (
            <Space key={key} style={{ display: "flex", marginBottom: 8 }}>
              <Form.Item {...skillRest} name={skillName}>
                <Input
                  placeholder="Ex: Giao tiếp - Tốt"
                  validateTrigger="onFocus"
                  rules={[
                    {
                      required: true,
                      message: "Skill is required !",
                    },
                  ]}
                />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(skillName)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
              Add Skill
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
}

export default SkillList;
