import React from "react";
import { Form, Input, Select, Radio } from "antd";
import Row from "../../../../ComponentsUI/Row.jsx";
import Col from "../../../../ComponentsUI/Col.jsx"; 
import Button from "../../../../ComponentsUI/Button.jsx";
import { CreditCardOutlined, UserOutlined } from "@ant-design/icons";

const { Option } = Select;

const meses = Array.from({ length: 12 }, (_, i) => 
  (i + 1).toString().padStart(2, '0')
);

const anios = Array.from({ length: 10 }, (_, i) =>
  (new Date().getFullYear() + i).toString().slice(-2)
);

const PaymentForm = ({ form, onFinish }) => (
  <Form form={form} onFinish={onFinish}>
    <Form.Item
      name="metodoPago"
      rules={[{ required: true, message: "Selecciona un método de pago" }]}
    >
      <Radio.Group style={{ width: '100%' }}>
        <Radio value="tarjeta" style={{ display: 'block', marginBottom: 12 }}>
          <CreditCardOutlined style={{ marginRight: 8 }} />
          Tarjeta de Crédito/Débito
        </Radio>
      </Radio.Group>
    </Form.Item>

    <Form.Item
      noStyle
      shouldUpdate={(prevValues, currentValues) =>
        prevValues.metodoPago !== currentValues.metodoPago
      }
    >
      {({ getFieldValue }) =>
        getFieldValue("metodoPago") === "tarjeta" ? (
          <>
            <Form.Item
              name="titularTarjeta"
              label="Titular de la tarjeta"
              rules={[{ required: true, message: "Ingresa el nombre del titular" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Nombre como aparece en la tarjeta"
              />
            </Form.Item>

            <Form.Item
              name="numeroTarjeta"
              label="Número de tarjeta"
              rules={[
                { required: true, message: "Ingresa el número de tarjeta" },
                { pattern: /^\d{16}$/, message: "El número de tarjeta debe tener 16 dígitos" }
              ]}
            >
              <Input placeholder="1234 5678 9012 3456" maxLength={16} />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="mesExpiracion"
                  label="Mes"
                  rules={[{ required: true, message: "Selecciona el mes" }]}
                >
                  <Select placeholder="Mes">
                    {meses.map(mes => (
                      <Option key={mes} value={mes}>{mes}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="anioExpiracion"
                  label="Año"
                  rules={[{ required: true, message: "Selecciona el año" }]}
                >
                  <Select placeholder="Año">
                    {anios.map(anio => (
                      <Option key={anio} value={anio}>{anio}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="cvv"
              label="CVV"
              rules={[
                { required: true, message: "CVV" },
                { pattern: /^\d{3,4}$/, message: "3 o 4 dígitos" }
              ]}
            >
              <Input placeholder="123" maxLength={4} />
            </Form.Item>
          </>
        ) : null
      }
    </Form.Item>

    <Form.Item style={{ marginTop: 24 }}>
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        style={{ width: '100%' }}
      >
        Confirmar Pago
      </Button>
    </Form.Item>
  </Form>
);

export default PaymentForm;