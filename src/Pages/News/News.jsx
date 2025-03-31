import React from "react";
import Layout, { Content } from "../../ComponentsUI/Layout.jsx";
import Card from "../../ComponentsUI/Card.jsx";
import Row from "../../ComponentsUI/Row.jsx";
import Col from "../../ComponentsUI/Col.jsx";
import Typography, { Title, Paragraph } from "../../ComponentsUI/Typography.jsx";


const News = () => {
    // Datos de novedades (hardcode)
    const newsItems = [
        {
            title: "Nueva Línea de Guitarras Eléctricas",
            description:
                "Descubre nuestra nueva colección de guitarras eléctricas, diseñadas para músicos profesionales y principiantes.",
            image: "/src/assets/guitarra-electrica.jpg",
            date: "20 de Octubre, 2023",
        },
        {
            title: "Taller de Mantenimiento de Instrumentos",
            description:
                "Aprende a mantener y cuidar tus instrumentos musicales en nuestro taller gratuito este sábado.",
            image: "/src/assets/Violin-1.jpg",
            date: "15 de Octubre, 2023",
        },
        {
            title: "Ofertas Especiales en Baterías",
            description:
                "Aprovecha nuestras increíbles ofertas en baterías acústicas y electrónicas. ¡Solo por tiempo limitado!",
            image: "/src/assets/bateria10.jpg",
            date: "10 de Octubre, 2023",
        },
    ];

    return (
        <Layout style={{ backgroundColor: "#fff" }}>
            <Content style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}>
                {/* Título de la página */}
                <Title level={2} style={{ textAlign: "center", marginBottom: "40px" }}>
                    Novedades
                </Title>

                {/* Lista de Novedades */}
                <Row gutter={[24, 24]}>
                    {newsItems.map((news, index) => (
                        <Col key={index} xs={24} md={8}>
                            <Card
                                cover={<img src={news.image} alt={news.title} style={{ height: "200px", objectFit: "cover" }} />}
                            >
                                <Title level={5}>{news.title}</Title>
                                <Paragraph>{news.description}</Paragraph>
                                <Paragraph style={{ color: "#666", fontStyle: "italic" }}>
                                    {news.date}
                                </Paragraph>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Content>
        </Layout>
    );
};

export default News;