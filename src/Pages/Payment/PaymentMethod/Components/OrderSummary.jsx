import React from "react";
import { Descriptions, Divider, message } from "antd";
import Card from "../../../../ComponentsUI/Card.jsx";
import { CreditCardOutlined } from "@ant-design/icons";

const OrderSummary = ({ subtotal, shippingCost, total }) => (
  <Card
    title={
      <span>
        <CreditCardOutlined style={{ marginRight: 8 }} />
        Resumen de Pago
      </span>
    }
  >
    <Descriptions column={1}>
      <Descriptions.Item label="Subtotal">
        ${subtotal.toFixed(2)}
      </Descriptions.Item>
      <Descriptions.Item label="Envío">
        ${shippingCost.toFixed(2)}
      </Descriptions.Item>
      <Descriptions.Item label="Total" style={{ fontWeight: 'bold', fontSize: '1.1em' }}>
        ${total.toFixed(2)}
      </Descriptions.Item>
    </Descriptions>
  </Card>
);

export default OrderSummary;