import React from "react";
import { Avatar } from "antd";
import Layout, { Content } from "../../ComponentsUI/Layout.jsx";
import Card from "../../ComponentsUI/Card.jsx";
import Row from "../../ComponentsUI/Row.jsx";
import Col from "../../ComponentsUI/Col.jsx";
import Typography, { Title, Paragraph } from "../../ComponentsUI/Typography.jsx";
import { TeamOutlined, BulbOutlined, TrophyOutlined, CustomerServiceOutlined } from "@ant-design/icons";


const AboutUs = () => {
    const teamMembers = [
        {
            name: "Marco Polo Cruz Ceron",
            role: "Fundador y Luthier",
            avatar: "/avatar1.png",
            description: "Especialista en la fabricación y reparación de instrumentos de cuerda.",
        },
        {
            name: "Ana López",
            role: "Especialista en Ventas",
            avatar: "/avatar3.png",
            description: "Apasionada por ayudar a los músicos a encontrar el instrumento perfecto.",
        },
        {
            name: "Miguel Torres",
            role: "Instructor de Música",
            avatar: "/avatar2.png",
            description: "Experto en educación musical y técnicas avanzadas de interpretación.",
        },
    ];

    return (
        <Layout style={{ backgroundColor: "#fff" }}>
            <Content style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}>
                <Title level={2} style={{ textAlign: "center", marginBottom: "40px" }}>
                    Acerca de Nosotros
                </Title>

                <Row gutter={[24, 24]} style={{ marginBottom: "40px" }}>
                    <Col xs={24} md={12}>
                        <Title level={4}>Nuestra Historia</Title>
                        <Paragraph>
                            En <strong>MusicQ</strong>, nos apasiona la música desde 2005. Comenzamos como un pequeño
                            taller de reparación de instrumentos y hoy somos una de las tiendas líderes en la venta de
                            instrumentos musicales en la región.
                        </Paragraph>
                    </Col>
                    <Col xs={24} md={12}>
                        <Title level={4}>Nuestra Misión</Title>
                        <Paragraph>
                            Nuestra misión es proporcionar instrumentos musicales de alta calidad y un servicio excepcional
                            para inspirar a músicos de todos los niveles a alcanzar su máximo potencial.
                        </Paragraph>
                    </Col>
                </Row>

                <Row gutter={[24, 24]} style={{ marginBottom: "40px" }}>
                    <Col xs={24}>
                        <Title level={4}>Nuestros Valores</Title>
                    </Col>
                    <Col xs={24} md={8}>
                        <Card>
                            <BulbOutlined style={{ fontSize: "32px", color: "#1890ff" }} />
                            <Title level={5}>Innovación</Title>
                            <Paragraph>
                                Ofrecemos los instrumentos más innovadores y tecnologías musicales de vanguardia.
                            </Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} md={8}>
                        <Card>
                            <TeamOutlined style={{ fontSize: "32px", color: "#1890ff" }} />
                            <Title level={5}>Comunidad</Title>
                            <Paragraph>
                                Creemos en construir una comunidad de músicos apasionados y colaborativos.
                            </Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} md={8}>
                        <Card>
                            <TrophyOutlined style={{ fontSize: "32px", color: "#1890ff" }} />
                            <Title level={5}>Excelencia</Title>
                            <Paragraph>
                                Nos esforzamos por ofrecer la mejor calidad en productos y servicios.
                            </Paragraph>
                        </Card>
                    </Col>
                </Row>


                <Row gutter={[24, 24]}>
                    <Col xs={24}>
                        <Title level={4}>Nuestro Equipo</Title>
                    </Col>
                    {teamMembers.map((member, index) => (
                        <Col key={index} xs={24} md={8}>
                            <Card
                                cover={
                                    <Avatar
                                        src={member.avatar}
                                        size={128}
                                        style={{ margin: "24px auto", display: "block" }}
                                    />
                                }
                            >
                                <Title level={5} style={{ textAlign: "center" }}>
                                    {member.name}
                                </Title>
                                <Paragraph style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {member.role}
                                </Paragraph>
                                <Paragraph style={{ textAlign: "center" }}>{member.description}</Paragraph>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Content>
        </Layout>
    );
};

export default AboutUs;
