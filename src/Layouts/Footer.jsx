import React from 'react';
import { Divider } from 'antd';
import Layout, { Content } from "../ComponentsUI/Layout.jsx";
import Row from "../ComponentsUI/Row.jsx";
import Col from "../ComponentsUI/Col.jsx";
import Typography, { Title, Text } from "../ComponentsUI/Typography.jsx";

import { 
    FacebookOutlined, 
    TwitterOutlined, 
    InstagramOutlined, 
    YoutubeOutlined,
    EnvironmentOutlined,
    PhoneOutlined,
    MailOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Footer } = Layout;


const AppFooter = () => {
    return (
        <Footer style={{
            backgroundColor: '#1a1a1a',
            color: '#fff',
            padding: '64px 0 24px',
            marginTop: '80px'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                <Row gutter={[48, 32]}>
                    <Col xs={24} sm={12} md={6}>
                        <Title level={4} style={{ color: '#fff', marginBottom: '24px' }}>
                            <EnvironmentOutlined style={{ marginRight: '8px' }} />
                            Contáctanos
                        </Title>
                        <div style={{ marginBottom: '16px' }}>
                            <Text style={{ color: '#bfbfbf' }}>
                                <EnvironmentOutlined style={{ marginRight: '8px' }} />
                                Av. Paseo de la Reforma 123, CDMX
                            </Text>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <Text style={{ color: '#bfbfbf' }}>
                                <PhoneOutlined style={{ marginRight: '8px' }} />
                                (55) 1234 5678
                            </Text>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <Text style={{ color: '#bfbfbf' }}>
                                <MailOutlined style={{ marginRight: '8px' }} />
                                contacto@musicq.com.mx
                            </Text>
                        </div>
                        <div>
                            <Text style={{ color: '#bfbfbf' }}>
                                <ClockCircleOutlined style={{ marginRight: '8px' }} />
                                Lunes a Viernes: 9:00 - 18:00
                            </Text>
                        </div>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <Title level={4} style={{ color: '#fff', marginBottom: '24px' }}>
                            Enlaces Rápidos
                        </Title>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Link to="/tienda" style={{ color: '#bfbfbf', marginBottom: '12px' }}>
                                Tienda
                            </Link>
                            <Link to="/categorias" style={{ color: '#bfbfbf', marginBottom: '12px' }}>
                                Categorías
                            </Link>
                            <Link to="/ofertas" style={{ color: '#bfbfbf', marginBottom: '12px' }}>
                                Ofertas
                            </Link>
                            <Link to="/blog" style={{ color: '#bfbfbf', marginBottom: '12px' }}>
                                Blog Musical
                            </Link>
                            <Link to="/eventos" style={{ color: '#bfbfbf', marginBottom: '12px' }}>
                                Eventos
                            </Link>
                        </div>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <Title level={4} style={{ color: '#fff', marginBottom: '24px' }}>
                            Legal
                        </Title>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Link to="/terminos" style={{ color: '#bfbfbf', marginBottom: '12px' }}>
                                Términos de Servicio
                            </Link>
                            <Link to="/privacidad" style={{ color: '#bfbfbf', marginBottom: '12px' }}>
                                Política de Privacidad
                            </Link>
                            <Link to="/garantias" style={{ color: '#bfbfbf', marginBottom: '12px' }}>
                                Garantías y Devoluciones
                            </Link>
                            <Link to="/preguntas" style={{ color: '#bfbfbf', marginBottom: '12px' }}>
                                Preguntas Frecuentes
                            </Link>
                        </div>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <Title level={4} style={{ color: '#fff', marginBottom: '24px' }}>
                            Síguenos
                        </Title>
                        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FacebookOutlined style={{ 
                                    fontSize: '24px', 
                                    color: '#bfbfbf',
                                    transition: 'color 0.3s',
                                    ':hover': { color: '#ff3b3b' }
                                }} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <TwitterOutlined style={{ 
                                    fontSize: '24px', 
                                    color: '#bfbfbf',
                                    transition: 'color 0.3s'
                                }} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <InstagramOutlined style={{ 
                                    fontSize: '24px', 
                                    color: '#bfbfbf',
                                    transition: 'color 0.3s'
                                }} />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                                <YoutubeOutlined style={{ 
                                    fontSize: '24px', 
                                    color: '#bfbfbf',
                                    transition: 'color 0.3s'
                                }} />
                            </a>
                        </div>
                        
                        <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
                            Suscríbete
                        </Title>
                        <Text style={{ color: '#bfbfbf', marginBottom: '16px', display: 'block' }}>
                            Recibe nuestras promociones y novedades
                        </Text>
                    </Col>
                </Row>

                <Divider style={{ borderColor: '#333', margin: '40px 0' }} />

                <Row justify="space-between" align="middle">
                    <Col>
                        <Text style={{ color: '#8c8c8c' }}>
                            © 2025 MusicQ, Inc. Todos los derechos reservados.
                        </Text>
                    </Col>
                    <Col>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <Link to="/mapa" style={{ color: '#8c8c8c' }}>
                                Mapa del sitio
                            </Link>
                            <Link to="/empleo" style={{ color: '#8c8c8c' }}>
                                Trabaja con nosotros
                            </Link>
                        </div>
                    </Col>
                </Row>
            </div>
        </Footer>
    );
};

export default AppFooter;