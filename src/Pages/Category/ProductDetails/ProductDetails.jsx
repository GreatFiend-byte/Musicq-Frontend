import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { getInstrumentoById } from "../../../services/productService.js";
import { message, Skeleton, Empty } from 'antd';
import Card from '../../../ComponentsUI/Card.jsx';
import Row from '../../../ComponentsUI/Row.jsx';
import Col from '../../../ComponentsUI/Col.jsx';
import Layout, { Content } from "../../../ComponentsUI/Layout.jsx";
import ProductImages from "./Components/ProductImages";
import ProductInfo from "./Components/ProductInfo";
import ProductActions from "./Components/ProductActions";
import ProductSpecs from "./Components/ProductSpecs";

const ProductDetailsPage = () => {
    const { categoryId, instrumentId } = useParams();
    const [instrumento, setInstrumento] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInstrumento = async () => {
            try {
                setLoading(true);
                const data = await getInstrumentoById(categoryId, instrumentId);
                setInstrumento(data);
            } catch (error) {
                console.error("Error obteniendo el instrumento:", error);
                message.error("Error al cargar el producto");
            } finally {
                setLoading(false);
            }
        };

        fetchInstrumento();
    }, [categoryId, instrumentId]);

    const handleQuantityChange = (value) => {
        const newValue = Math.max(1, Math.min(10, value));
        setQuantity(newValue);
        if (newValue !== value) {
            message.info("La cantidad debe estar entre 1 y 10 unidades");
        }
    };

    if (loading) {
        return (
            <Layout style={{ backgroundColor: "#f8f8f8" }}>
                <Content style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}>
                    <Card>
                        <Row gutter={[48, 24]}>
                            <Col xs={24} md={12}>
                                <Skeleton.Image active style={{ width: '100%', height: '400px' }} />
                            </Col>
                            <Col xs={24} md={12}>
                                <Skeleton active paragraph={{ rows: 6 }} />
                            </Col>
                        </Row>
                    </Card>
                </Content>
            </Layout>
        );
    }

    if (!instrumento) {
        return (
            <Layout style={{ backgroundColor: "#f8f8f8" }}>
                <Content style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
                    <Empty description="No se encontró el instrumento solicitado" />
                    <Button 
                        type="primary" 
                        style={{ marginTop: "16px" }}
                        onClick={() => navigate(-1)}
                    >
                        Volver atrás
                    </Button>
                </Content>
            </Layout>
        );
    }

    return (
        <Layout style={{ backgroundColor: "#f8f8f8" }}>
            <Content style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}>
                <Card style={{ marginBottom: "40px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                    <Row gutter={[48, 24]}>
                        <Col xs={24} md={12}>
                            <ProductImages instrumento={instrumento} />
                        </Col>
                        <Col xs={24} md={12}>
                            <ProductInfo instrumento={instrumento} />
                            <ProductActions 
                                instrumento={instrumento} 
                                quantity={quantity} 
                                onQuantityChange={handleQuantityChange}
                                navigate={navigate}
                            />
                        </Col>
                    </Row>
                </Card>
                
                <ProductSpecs instrumento={instrumento} />
            </Content>
        </Layout>
    );
};

export default ProductDetailsPage;