import { Divider } from 'antd';
import Typography, { Title, Paragraph } from '../../../../ComponentsUI/Typography.jsx';
import Card from '../../../../ComponentsUI/Card.jsx';
import Row from '../../../../ComponentsUI/Row.jsx';
import Col from '../../../../ComponentsUI/Col.jsx';
const ProductSpecs = ({ instrumento }) => {
  return (
    <Card
      style={{
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}
    >
      <Title level={3} style={{ marginBottom: "16px" }}>
        Especificaciones Técnicas
      </Title>
      <Divider style={{ margin: "16px 0" }} />
      
      <Row gutter={[24, 16]}>
        <Col xs={24} md={12}>
          <Paragraph strong>Marca:</Paragraph>
          <Paragraph>{instrumento.marca}</Paragraph>
        </Col>
        <Col xs={24} md={12}>
          <Paragraph strong>Modelo:</Paragraph>
          <Paragraph>{instrumento.nombre}</Paragraph>
        </Col>
        <Col xs={24} md={12}>
          <Paragraph strong>Categoría:</Paragraph>
          <Paragraph>{instrumento.subcategoria}</Paragraph>
        </Col>
        <Col xs={24} md={12}>
          <Paragraph strong>SKU:</Paragraph>
          <Paragraph>MUS-{instrumento.id?.toString().padStart(4, '0')}</Paragraph>
        </Col>
      </Row>
      
      <Divider style={{ margin: "24px 0" }} />
      
      <Title level={4} style={{ marginBottom: "16px" }}>
        Descripción Detallada
      </Title>
      <Paragraph style={{ color: "#666", lineHeight: "1.6" }}>
        {instrumento.descripcion || "Este instrumento musical ofrece un sonido excepcional y una construcción de alta calidad."}
      </Paragraph>
    </Card>
  );
};

export default ProductSpecs;