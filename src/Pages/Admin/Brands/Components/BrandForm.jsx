import React from "react";
import { Form, Input } from "antd";

const BrandForm = ({ form }) => (
  <Form form={form} layout="vertical">
    <Form.Item
      name="nombre"
      label="Nombre"
      rules={[{ required: true, message: "Por favor ingrese el nombre de la marca" }]}
    >
      <Input placeholder="Ej: Fender" />
    </Form.Item>
    <Form.Item
      name="descripcion"
      label="Descripción"
      rules={[{ required: true, message: "Por favor ingrese la descripción" }]}
    >
      <Input.TextArea rows={4} placeholder="Descripción de la marca" />
    </Form.Item>
  </Form>
);

export default BrandForm;