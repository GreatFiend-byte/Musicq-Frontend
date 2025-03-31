import React from "react";
import { Form, Input, Select } from "antd";
import Card from "../../../../ComponentsUI/Card.jsx";
import Row from "../../../../ComponentsUI/Row.jsx";
import Col from "../../../../ComponentsUI/Col.jsx"; 
import { EnvironmentOutlined } from "@ant-design/icons";

const { Option } = Select;

const estadosMexicanos = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche",
  "Chiapas", "Chihuahua", "Ciudad de México", "Coahuila", "Colima", "Durango",
  "Estado de México", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Michoacán",
  "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro",
  "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas",
  "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"
];

const AddressForm = ({ form }) => (
  <Card
    title={
      <span>
        <EnvironmentOutlined style={{ marginRight: 8 }} />
        Dirección de Envío
      </span>
    }
  >
    <Form form={form} layout="vertical">
      <Row gutter={16}>
        <Col span={16}>
          <Form.Item
            name="calle"
            label="Calle"
            rules={[{ required: true, message: 'Ingresa la calle' }]}
          >
            <Input placeholder="Nombre de la calle" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            name="numeroExterior"
            label="Número ext"
            rules={[
              { required: true, message: 'Ingresa el número exterior' },
              { pattern: /^[0-9]+$/, message: 'Solo se permiten números' },
              { max: 10, message: 'Máximo 10 caracteres' }
            ]}
          >
            <Input placeholder="Núm. ext." maxLength={10} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            name="numeroInterior"
            label="Número int"
            rules={[
              { pattern: /^[0-9]*$/, message: 'Solo se permiten números' },
              { max: 10, message: 'Máximo 10 caracteres' }
            ]}
          >
            <Input placeholder="Núm. int." maxLength={10} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="colonia"
            label="Colonia"
            rules={[{ required: true, message: 'Ingresa la colonia' }]}
          >
            <Input placeholder="Colonia" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="codigoPostal"
            label="Código Postal"
            rules={[
              { required: true, message: 'Ingresa el código postal' },
              { pattern: /^\d{5}$/, message: 'Código postal debe tener 5 dígitos' }
            ]}
          >
            <Input placeholder="C.P." maxLength={5} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="municipio"
            label="Municipio/Alcaldía"
            rules={[{ required: true, message: 'Ingresa el municipio' }]}
          >
            <Input placeholder="Municipio o Alcaldía" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="estado"
            label="Estado"
            rules={[{ required: true, message: 'Selecciona tu estado' }]}
          >
            <Select placeholder="Selecciona tu estado">
              {estadosMexicanos.map(estado => (
                <Option key={estado} value={estado}>{estado}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </Card>
);

export default AddressForm;