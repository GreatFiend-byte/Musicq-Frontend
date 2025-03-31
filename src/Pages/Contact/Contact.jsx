import React from "react";
import { useState } from "react";
import { Col, Form, Input, message } from "antd";
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, SendOutlined } from "@ant-design/icons";
import Button from "../../ComponentsUI/Button.jsx";
import Row from '../../ComponentsUI/Row';
import Typography, { Title, Paragraph } from "../../ComponentsUI/Typography.jsx";
import Layout, { Content } from "../../ComponentsUI/Layout.jsx";
import Card from "../../ComponentsUI/Card.jsx";

const { TextArea } = Input;

const ContactUs = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            message.success('Tu mensaje ha sido enviado con éxito');
            form.resetFields();
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
            message.error('Hubo un error al enviar tu mensaje. Por favor intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout style={{ backgroundColor: "#f8f8f8" }}>
            <Content style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: "48px" }}>
                    <Title level={1} style={{ color: "#ff3b3b", marginBottom: "16px" }}>
                        Contáctanos
                    </Title>
                    <Paragraph style={{ fontSize: "18px", maxWidth: "800px", margin: "0 auto" }}>
                        ¿Tienes preguntas, comentarios o necesitas asistencia? Estamos aquí para ayudarte.
                    </Paragraph>
                </div>
                <Row gutter={[48, 48]} style={{ marginBottom: "48px" }}>
                    <Col xs={24} md={12}>
                        <Card
                            style={{
                                borderRadius: "12px",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                height: "100%"
                            }}
                        >
                            <Title level={3} style={{ marginBottom: "24px", color: "#ff3b3b" }}>
                                Información de Contacto
                            </Title>

                            <div style={{ marginBottom: "32px" }}>
                                <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                                    <EnvironmentOutlined style={{ fontSize: "24px", color: "#ff3b3b", marginRight: "16px" }} />
                                    <div>
                                        <Paragraph strong style={{ marginBottom: "4px" }}>Dirección</Paragraph>
                                        <Paragraph>Av. Pie de la Cuesta 2501, Nacional, 76148 Santiago de Querétaro, Qro.</Paragraph>
                                    </div>
                                </div>

                                <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                                    <PhoneOutlined style={{ fontSize: "24px", color: "#ff3b3b", marginRight: "16px" }} />
                                    <div>
                                        <Paragraph strong style={{ marginBottom: "4px" }}>Teléfono</Paragraph>
                                        <Paragraph>+52 55 1234 5678</Paragraph>
                                        <Paragraph>Lunes a Viernes: 9:00 AM - 6:00 PM</Paragraph>
                                    </div>
                                </div>

                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <MailOutlined style={{ fontSize: "24px", color: "#ff3b3b", marginRight: "16px" }} />
                                    <div>
                                        <Paragraph strong style={{ marginBottom: "4px" }}>Email</Paragraph>
                                        <Paragraph>contacto@musicq.com.mx</Paragraph>
                                        <Paragraph>soporte@musicq.com.mx</Paragraph>
                                    </div>
                                </div>
                            </div>

                            <Title level={4} style={{ marginBottom: "16px" }}>Horario de Atención</Title>
                            <Paragraph>Lunes a Viernes: 9:00 AM - 6:00 PM</Paragraph>
                            <Paragraph>Sábado: 10:00 AM - 2:00 PM</Paragraph>
                            <Paragraph>Domingo: Cerrado</Paragraph>
                        </Card>
                    </Col>

                    {/* Mapa Interactivo Mejorado */}
                    <Col xs={24} md={12}>
                        <Card
                            style={{
                                borderRadius: "12px",
                                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                                padding: 0,
                                overflow: "hidden",
                                border: "none",
                                height: "100%"
                            }}
                            bodyStyle={{ padding: 0 }}
                        >
                            <div style={{
                                width: "100%",
                                height: "500px", // Altura aumentada
                                position: "relative",
                                overflow: "hidden"
                            }}>
                                <iframe
                                    title="Ubicación de la tienda"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.381036614949!2d-100.40734336489406!3d20.657878165212775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDM5JzI4LjQiTiAxMDDCsDI0JzI2LjQiVw!5e0!3m2!1ses!2smx!4v1696890000000!5m2!1ses!2smx"
                                    width="100%"
                                    height="100%"
                                    style={{
                                        border: 0,
                                        position: "absolute",
                                        top: 0,
                                        left: 0
                                    }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    aria-hidden="false"
                                    tabIndex="0"
                                ></iframe>

                                {/* Overlay con botón de acción */}
                                <div style={{
                                    position: "absolute",
                                    bottom: "20px",
                                    right: "20px",
                                    zIndex: 1
                                }}>
                                    <Button
                                        type="primary"
                                        size="large"
                                        onClick={() => window.open("https://maps.google.com/?q=Calle+Falsa+123,Ciudad+de+México", "_blank")}
                                        style={{
                                            backgroundColor: "#ff3b3b",
                                            borderColor: "#ff3b3b",
                                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
                                        }}
                                    >
                                        Abrir en Google Maps
                                    </Button>
                                </div>
                            </div>

                            {/* Pie de mapa con información breve */}
                            <div style={{
                                padding: "16px",
                                backgroundColor: "#f8f8f8",
                                borderTop: "1px solid #f0f0f0"
                            }}>
                                <Paragraph strong style={{ marginBottom: 0 }}>
                                    <EnvironmentOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
                                    Visítanos en: Calle Falsa 123, Col. Centro, CDMX
                                </Paragraph>
                            </div>
                        </Card>
                    </Col>
                </Row>

                {/* Formulario de Contacto */}
                <Row justify="center">
                    <Col xs={24} md={16}>
                        <Card
                            style={{
                                borderRadius: "12px",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                            }}
                        >
                            <Title level={3} style={{ textAlign: "center", marginBottom: "32px", color: "#ff3b3b" }}>
                                Envíanos un Mensaje
                            </Title>

                            <Form form={form} onFinish={handleSubmit} layout="vertical">
                                <Row gutter={24}>
                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            name="nombre"
                                            label="Nombre Completo"
                                            rules={[{ required: true, message: "Por favor, ingresa tu nombre" }]}
                                        >
                                            <Input size="large" placeholder="Ej. Juan Pérez" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            name="email"
                                            label="Correo Electrónico"
                                            rules={[
                                                { required: true, message: "Por favor, ingresa tu correo" },
                                                { type: "email", message: "Ingresa un correo válido" },
                                            ]}
                                        >
                                            <Input size="large" placeholder="Ej. ejemplo@dominio.com" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Form.Item
                                    name="asunto"
                                    label="Asunto"
                                    rules={[{ required: true, message: "Por favor, ingresa un asunto" }]}
                                >
                                    <Input size="large" placeholder="Ej. Consulta sobre productos" />
                                </Form.Item>

                                <Form.Item
                                    name="mensaje"
                                    label="Mensaje"
                                    rules={[{ required: true, message: "Por favor, ingresa tu mensaje" }]}
                                >
                                    <TextArea
                                        rows={6}
                                        placeholder="Escribe tu mensaje aquí..."
                                        style={{ resize: "none" }}
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        icon={<SendOutlined />}
                                        loading={loading}
                                        style={{
                                            width: "100%",
                                            height: "48px",
                                            fontSize: "16px",
                                            backgroundColor: "#ff3b3b",
                                            borderColor: "#ff3b3b",
                                            transition: "all 0.3s ease",
                                            ':hover': {
                                                backgroundColor: "#e03535",
                                                borderColor: "#e03535",
                                                transform: "translateY(-2px)"
                                            },
                                            ':active': {
                                                backgroundColor: "#c52e2e",
                                                borderColor: "#c52e2e"
                                            }
                                        }}
                                    >
                                        Enviar Mensaje
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default ContactUs;