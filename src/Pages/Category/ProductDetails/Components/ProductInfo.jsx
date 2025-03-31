import { Tag, Rate, Divider } from 'antd';
import Typography, { Title, Paragraph } from '../../../../ComponentsUI/Typography.jsx';
import { InfoCircleOutlined } from '@ant-design/icons';
import CurrencyConverter from './CurrencyConverter';


const ProductInfo = ({ instrumento }) => {
  return (
    <>
      <div style={{ marginBottom: "16px", display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <Tag color="blue" style={{ fontSize: "14px", padding: "4px 8px" }}>
          {instrumento.marca}
        </Tag>
        <Tag color="green" style={{ fontSize: "14px", padding: "4px 8px" }}>
          {instrumento.subcategoria}
        </Tag>
      </div>
      
      <Title level={2} style={{ marginBottom: "16px" }}>
        {instrumento.nombre}
      </Title>
      
      <div style={{ marginBottom: "16px" }}>
        <Rate 
          disabled 
          defaultValue={4.5} 
          allowHalf 
          style={{ color: "#ff3b3b", fontSize: "18px" }} 
        />
        <span style={{ marginLeft: "8px", color: "#666" }}>(24 reseñas)</span>
      </div>
      
      <div style={{ marginBottom: '24px' }}>
        <Paragraph style={{ 
          fontSize: "24px", 
          fontWeight: "bold",
          color: "#ff3b3b",
          marginBottom: "8px"
        }}>
          ${instrumento.precio.toLocaleString()} MXN
        </Paragraph>
        
        <CurrencyConverter precio={instrumento.precio} />
      </div>
      
      <Paragraph style={{ 
        fontSize: "16px", 
        color: "#666",
        marginBottom: "24px",
        lineHeight: "1.6"
      }}>
        {instrumento.descripcion}
      </Paragraph>
      
      <div style={{ marginBottom: "24px" }}>
        <Paragraph strong style={{ display: "inline-block", marginRight: "8px" }}>
          Disponibilidad:
        </Paragraph>
        <span style={{ 
          color: instrumento.existencias > 0 ? "#52c41a" : "#f5222d",
          fontWeight: "500"
        }}>
          {instrumento.existencias > 0 ? 
            `En stock (${instrumento.existencias} unidades)` : 
            "Agotado"}
        </span>
      </div>
    </>
  );
};

export default ProductInfo;