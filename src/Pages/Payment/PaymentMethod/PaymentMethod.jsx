import React from "react";
import { useNavigate } from "react-router-dom";
import { message, Form } from "antd";
import Card from "../../../ComponentsUI/Card.jsx";
import Row from "../../../ComponentsUI/Row.jsx";
import Col from "../../../ComponentsUI/Col.jsx";
import Layout, { Content } from "../../../ComponentsUI/Layout.jsx";
import Typography, { Title } from "../../../ComponentsUI/Typography.jsx";
import { FileTextOutlined } from "@ant-design/icons";
import { createOrder } from "../../../services/productService.js";
import { useCart } from "../../../../context/CartContext.jsx";
import AddressForm from "./Components/AddressForm";
import PaymentForm from "./Components/PaymentForm";
import OrderSummary from "./Components/OrderSummary";
import CartItemsTable from "./Components/CartItemsTable";

const PaymentMethod = () => {
  const [form] = Form.useForm();
  const { cartItems, shippingCost, total, subtotal } = useCart();
  const navigate = useNavigate();
  
  const handleSubmit = async (values) => {
    try {
      const fechaExpiracion = values.mesExpiracion && values.anioExpiracion
        ? `${values.mesExpiracion}/${values.anioExpiracion}`
        : null;

      const orderData = {
        paymentMethod: values.metodoPago,
        cardDetails: values.metodoPago === "tarjeta" ? {
          titular: values.titularTarjeta,
          numeroTarjeta: values.numeroTarjeta,
          fechaExpiracion: fechaExpiracion,
          cvv: values.cvv
        } : null,
        shippingInfo: {
          calle: values.calle,
          numeroExterior: values.numeroExterior,
          numeroInterior: values.numeroInterior,
          colonia: values.colonia,
          codigoPostal: values.codigoPostal,
          municipio: values.municipio,
          estado: values.estado
        },
        items: cartItems,
        subtotal: subtotal,
        shippingCost: shippingCost,
        total: total
      };

      const response = await createOrder(orderData);
      navigate("/order-confirmation", { 
        state: { orderId: response.orderId } 
      });

    } catch (error) {
      console.error("Error al procesar el pago:", error);
      message.error("Ocurrió un error al procesar tu pedido. Por favor intenta nuevamente.");
    }
  };

  return (
    <Layout style={{ backgroundColor: "#f5f5f5" }}>
      <Content style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <Card
          style={{
            marginBottom: 24,
            borderLeft: "4px solid #1890ff"
          }}
        >
          <Title level={2} style={{ display: 'flex', alignItems: 'center' }}>
            <FileTextOutlined style={{ marginRight: 12, color: '#1890ff' }} />
            Detalles de la Factura
          </Title>
        </Card>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={16}>
            <CartItemsTable cartItems={cartItems} />
            <AddressForm form={form} />
          </Col>

          <Col xs={24} md={8}>
            <OrderSummary 
              subtotal={subtotal} 
              shippingCost={shippingCost} 
              total={total} 
            />
            <PaymentForm form={form} onFinish={handleSubmit} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default PaymentMethod;