import { InputNumber, Space } from 'antd';
import Button from '../../../../ComponentsUI/Button';
import Typography, { Paragraph } from '../../../../ComponentsUI/Typography.jsx';
import { useNavigate } from 'react-router-dom';

const ProductActions = ({ instrumento, quantity, onQuantityChange, navigate }) => {
  const handleBuyClick = () => {
    if (!instrumento) return;
    
    if (instrumento.existencias === 0) {
      message.error("Este producto está actualmente agotado");
      return;
    }

    if (instrumento.existencias < quantity) {
      message.error(`Solo quedan ${instrumento.existencias} unidades disponibles`);
      return;
    }

    navigate("/car", {
      state: {
        product: instrumento,
        quantity,
      },
    });
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "24px" }}>
        <Paragraph strong style={{ marginRight: "16px", marginBottom: 0 }}>
          Cantidad:
        </Paragraph>
        <InputNumber
          min={1}
          max={Math.min(10, instrumento.existencias)}
          value={quantity}
          onChange={onQuantityChange}
          style={{ width: "100px", marginRight: "16px" }}
          disabled={instrumento.existencias <= 0}
        />
        <Button
          type="primary"
          size="large"
          style={{ 
            backgroundColor: "#ff3b3b", 
            borderColor: "#ff3b3b",
            height: "40px",
            padding: "0 24px"
          }}
          onClick={handleBuyClick}
          disabled={instrumento.existencias <= 0}
        >
          {instrumento.existencias > 0 ? "Agregar al carrito" : "No disponible"}
        </Button>
      </div>
      
      <Space>
        <Button 
          type="default" 
          size="large"
          style={{ height: "40px" }}
          onClick={() => navigate(-1)}
        >
          Seguir comprando
        </Button>
        <Button 
          type="default" 
          size="large"
          style={{ height: "40px" }}
          onClick={() => navigate("/car")}
        >
          Ver carrito
        </Button>
      </Space>
    </>
  );
};

export default ProductActions;