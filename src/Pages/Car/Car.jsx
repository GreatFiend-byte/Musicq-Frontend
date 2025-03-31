import React, { useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Col, Table, message, Input } from 'antd';
import Card from "../../ComponentsUI/Card.jsx";
import Button from "../../ComponentsUI/Button.jsx";
import Row from '../../ComponentsUI/Row';
import Typography, { Title, Paragraph, Text } from "../../ComponentsUI/Typography.jsx";
import Layout, { Content } from "../../ComponentsUI/Layout.jsx";
import { DeleteOutlined } from '@ant-design/icons';
import { useAuth } from '../../../context/AuthContext.jsx';
import { useCart } from '../../../context/CartContext.jsx';

const apiUrl = import.meta.env.VITE_API_URL;

const Car = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const { cartItems, addToCart, removeFromCart, updateQuantity, total } = useCart();
    const { product, categoryId, instrumentId, quantity } = location.state || {};

    const productAddedRef = useRef(false);

    useEffect(() => {
        if (product && !productAddedRef.current) {
            const itemId = `${categoryId}-${instrumentId}`;

            const alreadyInCart = cartItems.some(item => item.id === itemId);

            if (!alreadyInCart) {
                const newItem = {
                    id: itemId,
                    categoryId: categoryId,
                    instrumentId: instrumentId,
                    name: product.nombre,
                    price: Number(product.precio),
                    quantity: quantity || 1,
                    image: `${apiUrl}${product.imagen}`,
                };
                addToCart(newItem);
            }

            productAddedRef.current = true;
        }
    }, [product, categoryId, instrumentId, quantity, addToCart, cartItems]);

    const handleRemoveItem = (id) => {
        removeFromCart(id);
    };

    const handleProceedToPayment = () => {
        if (!isLoggedIn) {
            message.warning('Debes iniciar sesión para continuar con el pago');
            navigate('/login', { state: { from: location.pathname } });
            return;
        }

        if (cartItems.length === 0) {
            message.warning('Tu carrito está vacío');
            return;
        }

        navigate('/payment');
    };

    const columns = [
        {
            title: 'Producto',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={record.image}
                        alt={record.name}
                        style={{ width: '50px', height: '50px', marginRight: '16px' }}
                    />
                    <Text>{text}</Text>
                </div>
            ),
        },
        {
            title: 'Precio Unitario',
            dataIndex: 'price',
            key: 'price',
            render: (price) => <Text>${Number(price).toFixed(2)}</Text>,
        },
        {
            title: 'Cantidad',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity) => <Text>{quantity}</Text>,
        },
        {
            title: 'Subtotal',
            key: 'subtotal',
            render: (_, record) => (
                <Text>${(Number(record.price) * record.quantity).toFixed(2)}</Text>
            ),
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (_, record) => (
                <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveItem(record.id)}
                />
            ),
        },
    ];

    return (
        <Layout style={{ backgroundColor: "#fff" }}>
            <Content style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}>
                <Title level={2}>Carrito de Compras</Title>
                <Row gutter={[24, 24]}>
                    <Col xs={24} md={18}>
                        <Table
                            columns={columns}
                            dataSource={cartItems}
                            pagination={false}
                            rowKey="id"
                        />
                    </Col>
                    <Col xs={24} md={6}>
                        <Card title="Resumen de la Compra" style={{ width: '100%' }}>
                            <Text strong>Total: ${Number(total).toFixed(2)}</Text>
                            <Button
                                type="primary"
                                style={{
                                    width: '100%',
                                    marginTop: '16px',
                                    backgroundColor: '#ff3b3b',
                                    borderColor: '#ff3b3b'
                                }}
                                onClick={handleProceedToPayment}
                                disabled={cartItems.length === 0}
                            >
                                Proceder al Pago
                            </Button>
                            {!isLoggedIn && (
                                <Text type="warning" style={{ display: 'block', marginTop: '8px' }}>
                                    * Debes iniciar sesión para continuar
                                </Text>
                            )}
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default Car;