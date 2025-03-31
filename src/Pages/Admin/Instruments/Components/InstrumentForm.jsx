import React from "react";
import Button from "../../../../ComponentsUI/Button.jsx";
import { Form, Input, Select, Upload} from "antd";
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const InstrumentForm = ({ form, brands, subcategories, onImageUpload, isAdding }) => (
  <Form form={form} layout="vertical">
    <Form.Item name="nombre" label="Nombre" rules={[{ required: true, message: "Ingrese el nombre del instrumento" }]}>
      <Input />
    </Form.Item>
    <Form.Item name="descripcion" label="Descripción" rules={[{ required: true, message: "Ingrese la descripción" }]}>
      <Input.TextArea rows={4} />
    </Form.Item>
    <Form.Item name="marca" label="Marca" rules={[{ required: true, message: "Seleccione la marca" }]}>
      <Select placeholder="Seleccione una marca" showSearch optionFilterProp="children">
        {brands.map(brand => (
          <Option key={brand.id} value={brand.nombre}>
            {brand.nombre}
          </Option>
        ))}
      </Select>
    </Form.Item>
    <Form.Item name="precio" label="Precio" rules={[{ required: true, message: "Ingrese el precio" }]}>
      <Input type="number" min={0} step={0.01} />
    </Form.Item>
    <Form.Item name="subcategoria" label="Subcategoría" rules={[{ required: true, message: "Seleccione la subcategoría" }]}>
      <Select placeholder="Seleccione una subcategoría" showSearch optionFilterProp="children">
        {subcategories.map(subcategory => (
          <Option key={subcategory.id} value={subcategory.nombre}>
            {subcategory.nombre}
          </Option>
        ))}
      </Select>
    </Form.Item>
    <Form.Item name="existencias" label="Existencias" rules={[{ required: true, message: "Ingrese el número de existencias" }]}>
      <Input type="number" min={0} />
    </Form.Item>
    <Form.Item name="imagen" label="Imagen">
      <Upload
        customRequest={({ file, onSuccess }) => {
          onImageUpload(file);
          onSuccess("ok");
        }}
        showUploadList={false}
        accept="image/*"
      >
        <Button icon={<UploadOutlined />}>Subir Imagen</Button>
      </Upload>
    </Form.Item>
  </Form>
);

export default InstrumentForm;