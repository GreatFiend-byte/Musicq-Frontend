import React from "react";
import { Form, Input } from "antd";

const SubcategoryForm = ({ form }) => (
  <Form form={form} layout="vertical">
    <Form.Item
      name="nombre"
      label="Nombre"
      rules={[{ required: true, message: "Por favor ingrese el nombre de la subcategoría" }]}
    >
      <Input placeholder="Ej: Guitarras Eléctricas" />
    </Form.Item>
    <Form.Item
      name="descripcion"
      label="Descripción"
      rules={[{ required: true, message: "Por favor ingrese la descripción" }]}
    >
      <Input.TextArea rows={4} placeholder="Descripción detallada de la subcategoría" />
    </Form.Item>
  </Form>
);

export default SubcategoryForm;