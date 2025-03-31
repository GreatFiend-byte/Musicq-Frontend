import React from "react";
import Row from "../../../../ComponentsUI/Row";
import Col from "../../../../ComponentsUI/Col";
import { Form, Input, Select } from "antd";

const { Option } = Select;

const UserForm = ({ form, initialValues }) => (
  <Form form={form} layout="vertical" initialValues={initialValues}>
    <Row gutter={24}>
      <Col span={12}>
        <Form.Item
          name="nombre"
          label="Nombre"
          rules={[{ 
            required: true, 
            message: "Por favor ingrese el nombre",
            whitespace: true
          }]}
        >
          <Input size="large" placeholder="Ej: Juan" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="apellido"
          label="Apellido"
          rules={[{ 
            required: true, 
            message: "Por favor ingrese el apellido",
            whitespace: true
          }]}
        >
          <Input size="large" placeholder="Ej: Pérez" />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={24}>
      <Col span={12}>
        <Form.Item
          name="username"
          label="Nombre de Usuario"
          rules={[{ 
            required: true, 
            message: "Por favor ingrese el nombre de usuario",
            whitespace: true
          }]}
        >
          <Input size="large" placeholder="Ej: juanperez" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="email"
          label="Correo Electrónico"
          rules={[
            { 
              required: true, 
              message: "Por favor ingrese el correo electrónico"
            },
            {
              type: 'email',
              message: 'Ingrese un correo electrónico válido'
            }
          ]}
        >
          <Input size="large" placeholder="Ej: ejemplo@dominio.com" />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={24}>
      <Col span={12}>
        <Form.Item
          name="password"
          label="Nueva Contraseña"
          rules={[
            { 
              min: 6,
              message: "La contraseña debe tener al menos 6 caracteres"
            }
          ]}
          help="Dejar en blanco para mantener la contraseña actual"
        >
          <Input.Password size="large" placeholder="••••••" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="rol"
          label="Rol"
          rules={[{ 
            required: true, 
            message: "Por favor seleccione el rol" 
          }]}
        >
          <Select size="large" placeholder="Seleccione un rol">
            <Option value="admin">Administrador</Option>
            <Option value="vendedor">Vendedor</Option>
            <Option value="user">Usuario</Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>
  </Form>
);

export default UserForm;