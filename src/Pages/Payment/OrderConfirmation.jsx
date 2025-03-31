import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Descriptions, Divider, Result } from "antd";
import Row from "../../ComponentsUI/Row.jsx";
import Col from "../../ComponentsUI/Col.jsx";
import Card from "../../ComponentsUI/Card.jsx";
import Button from "../../ComponentsUI/Button.jsx";
import Typography, { Title, Text } from "../../ComponentsUI/Typography.jsx";
import { ShoppingOutlined, EnvironmentOutlined, CreditCardOutlined } from "@ant-design/icons";
import Layout from "../../ComponentsUI/Layout.jsx";
import { getOrderById } from "../../services/productService";
import { useCart } from "../../../context/CartContext";


const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { clearCart } = useCart();
    const orderId = location.state?.orderId || new URLSearchParams(location.search).get('orderId');

    useEffect(() => {
        if (!orderId) {
            setError("No se encontró información de la orden");
            setLoading(false);
            return;
        }

        const fetchOrder = async () => {
            try {
                const orderData = await getOrderById(orderId);
                setOrder(orderData);
                clearCart();
            } catch (err) {
                console.error("Error fetching order:", err);
                setError("Error al cargar los detalles de la orden");
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId, clearCart]);

    if (loading) {
        return (
            <Layout>
                <Card style={{ textAlign: "center", padding: "40px" }}>
                    <Title level={3}>Cargando detalles de tu orden...</Title>
                </Card>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <Card style={{ textAlign: "center", padding: "40px" }}>
                    <Result
                        status="error"
                        title="Error al procesar tu orden"
                        subTitle={error}
                        extra={[
                            <Button type="primary" key="home" onClick={() => navigate("/")}>
                                Volver al inicio
                            </Button>,
                        ]}
                    />
                </Card>
            </Layout>
        );
    }

    if (!order) {
        return (
            <Layout>
                <Card style={{ textAlign: "center", padding: "40px" }}>
                    <Result
                        status="404"
                        title="Orden no encontrada"
                        subTitle="Lo sentimos, no pudimos encontrar los detalles de tu orden."
                        extra={[
                            <Button type="primary" key="home" onClick={() => navigate("/")}>
                                Volver al inicio
                            </Button>,
                        ]}
                    />
                </Card>
            </Layout>
        );
    }

    return (
        <Layout>
            <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
                <Card
                    style={{
                        marginBottom: 24,
                        borderLeft: "4px solid #52c41a",
                        textAlign: "center"
                    }}
                >
                    <Result
                        status="success"
                        title="¡Compra realizada con éxito!"
                        subTitle={`Número de orden: ${orderId}`}
                    />
                </Card>

                <Row gutter={[24, 24]}>
                    {/* Detalles de los artículos */}
                    <Col xs={24} md={16}>
                        <Card
                            title={
                                <span>
                                    <ShoppingOutlined style={{ marginRight: 8 }} />
                                    Artículos en tu pedido
                                </span>
                            }
                            style={{ marginBottom: 24 }}
                        >
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: '#fafafa' }}>
                                            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #f0f0f0' }}>Producto</th>
                                            <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #f0f0f0' }}>Precio Unitario</th>
                                            <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #f0f0f0' }}>Cantidad</th>
                                            <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #f0f0f0' }}>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.items.map((item, index) => (
                                            <tr key={index} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                                <td style={{ padding: '12px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            style={{ width: '40px', height: '40px', marginRight: '12px' }}
                                                        />
                                                        {item.name}
                                                    </div>
                                                </td>
                                                <td style={{ padding: '12px', textAlign: 'right' }}>
                                                    ${item.price.toFixed(2)}
                                                </td>
                                                <td style={{ padding: '12px', textAlign: 'center' }}>
                                                    {item.quantity}
                                                </td>
                                                <td style={{ padding: '12px', textAlign: 'right' }}>
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>

                        {/* Dirección de envío */}
                        <Card
                            title={
                                <span>
                                    <EnvironmentOutlined style={{ marginRight: 8 }} />
                                    Dirección de Envío
                                </span>
                            }
                        >
                            <Descriptions bordered column={1}>
                                <Descriptions.Item label="Calle y número">
                                    {order.shippingInfo.calle} {order.shippingInfo.numeroExterior}
                                    {order.shippingInfo.numeroInterior && ` Int. ${order.shippingInfo.numeroInterior}`}
                                </Descriptions.Item>
                                <Descriptions.Item label="Colonia">
                                    {order.shippingInfo.colonia}
                                </Descriptions.Item>
                                <Descriptions.Item label="Código Postal">
                                    {order.shippingInfo.codigoPostal}
                                </Descriptions.Item>
                                <Descriptions.Item label="Municipio/Alcaldía">
                                    {order.shippingInfo.municipio}
                                </Descriptions.Item>
                                <Descriptions.Item label="Estado">
                                    {order.shippingInfo.estado}
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>

                    {/* Resumen de pago */}
                    <Col xs={24} md={8}>
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
                                    ${order.subtotal?.toFixed(2) || '0.00'}
                                </Descriptions.Item>
                                <Descriptions.Item label="Envío">
                                    ${order.shippingCost?.toFixed(2) || '0.00'}
                                </Descriptions.Item>
                                <Descriptions.Item label="Total" style={{ fontWeight: 'bold', fontSize: '1.1em' }}>
                                    ${order.total.toFixed(2)}
                                </Descriptions.Item>
                            </Descriptions>

                            <Divider />

                            <Descriptions column={1} title="Método de Pago">
                                <Descriptions.Item label="Método">
                                    {order.paymentMethod === "tarjeta" ? "Tarjeta de Crédito/Débito" : "Otro método"}
                                </Descriptions.Item>
                                {order.paymentMethod === "tarjeta" && order.cardDetails && (
                                    <>
                                        <Descriptions.Item label="Titular">
                                            {order.cardDetails.titular}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Terminación de tarjeta">
                                            **** **** **** {order.cardDetails.numeroTarjeta?.slice(-4)}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Fecha de expiración">
                                            {order.cardDetails.fechaExpiracion}
                                        </Descriptions.Item>
                                    </>
                                )}
                            </Descriptions>

                            <Divider />

                            <Button 
                                type="primary" 
                                block 
                                onClick={() => navigate("/")}
                            >
                                Volver al inicio
                            </Button>

                            <Button 
                                type="default" 
                                block 
                                style={{ marginTop: 16 }}
                                onClick={() => window.print()}
                            >
                                Imprimir comprobante
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Layout>
    );
};

export default OrderConfirmation;