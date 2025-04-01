import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout, { Content } from "../../ComponentsUI/Layout.jsx";
import Card from "../../ComponentsUI/Card.jsx";
import Row from "../../ComponentsUI/Row.jsx";
import Col from "../../ComponentsUI/Col.jsx";
import Button from "../../ComponentsUI/Button.jsx";
import Typography, { Title, Paragraph } from "../../ComponentsUI/Typography.jsx";
import { getCategorias } from "../../services/productService";


const Home = () => {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            const data = await getCategorias();
            setCategorias(data);
        };

        fetchCategorias();
    }, []);

    return (
        <Layout style={{ 
            backgroundColor: "#f8f8f8",
            minHeight: "100vh"
        }}>
            <div style={{ 
                maxWidth: "1400px", 
                margin: "0 auto",
                backgroundColor: "#fff",
                boxShadow: "0 0 20px rgba(0,0,0,0.1)"
            }}>
                <Content style={{ 
                    padding: "60px 80px",
                    margin: "0 auto"
                }}>
                    <Card
                        bordered={false}
                        cover={
                            <img 
                                src="/banner1.jpg" 
                                style={{ 
                                    height: "400px", 
                                    objectFit: "cover",
                                    objectPosition: "center"
                                }} 
                                alt="Catálogo de instrumentos"
                            />
                        }
                        style={{ 
                            marginBottom: "48px",
                            borderRadius: "12px",
                            overflow: "hidden"
                        }}
                        bodyStyle={{ 
                            padding: "24px",
                            textAlign: "center"
                        }}
                    >
                        <Title level={2} style={{ marginBottom: "16px" }}>
                            Catálogo de Instrumentos Musicales
                        </Title>
                        <Paragraph style={{ 
                            color: "#666",
                            fontSize: "16px",
                            maxWidth: "800px",
                            margin: "0 auto 24px"
                        }}>
                            Descubre nuestra amplia selección de instrumentos de las mejores marcas para músicos profesionales y aficionados.
                        </Paragraph>
                        <Link to="/catalog">
                            <Button 
                                type="primary" 
                                size="large"
                                style={{ 
                                    backgroundColor: "#ff3b3b", 
                                    borderColor: "#ff3b3b",
                                    height: "48px",
                                    padding: "0 40px",
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 12px rgba(255, 59, 59, 0.3)"
                                }}
                            >
                                Explorar Catálogo
                            </Button>
                        </Link>
                    </Card>

                    <div style={{ marginBottom: "60px" }}>
                        <Title level={3} style={{ 
                            textAlign: "center", 
                            marginBottom: "40px",
                            fontSize: "28px"
                        }}>
                            Nuestras Categorías
                        </Title>
                        
                        <Row gutter={[32, 32]}>
                            {categorias.map((categoria) => (
                                <Col key={categoria.id} xs={24} sm={12} md={8} lg={6}>
                                    <Card
                                        bordered={false}
                                        hoverable
                                        cover={
                                            <img 
                                                src={categoria.imagen} 
                                                style={{ 
                                                    height: "200px", 
                                                    objectFit: "cover",
                                                    borderTopLeftRadius: "12px",
                                                    borderTopRightRadius: "12px"
                                                }} 
                                                alt={categoria.nombre}
                                            />
                                        }
                                        style={{ 
                                            borderRadius: "12px",
                                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                            transition: "transform 0.3s, box-shadow 0.3s",
                                            height: "100%"
                                        }}
                                        bodyStyle={{ padding: "20px" }}
                                    >
                                        <Title level={4} style={{ marginBottom: "8px" }}>
                                            {categoria.nombre}
                                        </Title>
                                        <Paragraph style={{ 
                                            color: "#666",
                                            marginBottom: "20px",
                                            minHeight: "48px"
                                        }}>
                                            Instrumentos de {categoria.nombre.toLowerCase()}.
                                        </Paragraph>
                                        <Link to={`/category/${categoria.id}`}>
                                            <Button 
                                                type="primary" 
                                                block
                                                style={{ 
                                                    backgroundColor: "#ff3b3b", 
                                                    borderColor: "#ff3b3b",
                                                    height: "40px",
                                                    borderRadius: "8px",
                                                    fontWeight: "500",
                                                    boxShadow: "0 2px 8px rgba(255, 59, 59, 0.3)",
                                                    transition: "all 0.3s"
                                                }}
                                            >
                                                Ver Productos
                                            </Button>
                                        </Link>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>

                    <Row gutter={[40, 40]} style={{ marginTop: "60px" }}>
                        <Col xs={24} md={12}>
                            <Card
                                bordered={false}
                                hoverable
                                cover={
                                    <img
                                        src="/piano.jpg"
                                        style={{ 
                                            height: "280px", 
                                            objectFit: "cover",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px"
                                        }}
                                        alt="Acerca de nosotros"
                                    />
                                }
                                style={{ 
                                    borderRadius: "12px",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                    height: "100%"
                                }}
                                bodyStyle={{ padding: "24px" }}
                            >
                                <Title level={3} style={{ marginBottom: "16px" }}>
                                    Acerca de Nosotros
                                </Title>
                                <Paragraph style={{ 
                                    color: "#666",
                                    marginBottom: "24px",
                                    fontSize: "15px"
                                }}>
                                    MusicQ nace en 2021 con la visión de crear un negocio diferente dentro del mercado de instrumentos musicales en México, ofreciendo productos de calidad y un servicio excepcional.
                                </Paragraph>
                                <Link to="/aboutus">
                                    <Button 
                                        type="primary" 
                                        size="large"
                                        style={{ 
                                            backgroundColor: "#ff3b3b", 
                                            borderColor: "#ff3b3b",
                                            height: "48px",
                                            padding: "0 32px",
                                            borderRadius: "8px",
                                            fontWeight: "500",
                                            boxShadow: "0 4px 12px rgba(255, 59, 59, 0.3)"
                                        }}
                                    >
                                        Conoce Nuestra Historia
                                    </Button>
                                </Link>
                            </Card>
                        </Col>
                        <Col xs={24} md={12}>
                            <Card
                                bordered={false}
                                hoverable
                                cover={
                                    <img
                                        src="/novedades.jpg"
                                        style={{ 
                                            height: "280px", 
                                            objectFit: "cover",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px"
                                        }}
                                        alt="Novedades"
                                    />
                                }
                                style={{ 
                                    borderRadius: "12px",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                    height: "100%"
                                }}
                                bodyStyle={{ padding: "24px" }}
                            >
                                <Title level={3} style={{ marginBottom: "16px" }}>
                                    Novedades y Promociones
                                </Title>
                                <Paragraph style={{ 
                                    color: "#666",
                                    marginBottom: "24px",
                                    fontSize: "15px"
                                }}>
                                    Mantente informado sobre nuestros nuevos productos, ofertas exclusivas y promociones especiales para nuestros clientes.
                                </Paragraph>
                                <Link to="/news">
                                    <Button 
                                        type="primary" 
                                        size="large"
                                        style={{ 
                                            backgroundColor: "#ff3b3b", 
                                            borderColor: "#ff3b3b",
                                            height: "48px",
                                            padding: "0 32px",
                                            borderRadius: "8px",
                                            fontWeight: "500",
                                            boxShadow: "0 4px 12px rgba(255, 59, 59, 0.3)"
                                        }}
                                    >
                                        Ver Últimas Novedades
                                    </Button>
                                </Link>
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </div>
        </Layout>
    );
};

export default Home;
