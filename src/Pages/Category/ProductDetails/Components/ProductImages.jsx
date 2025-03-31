import { Image } from 'antd';
import Card from '../../../../ComponentsUI/Card';

const apiUrl = import.meta.env.VITE_API_URL;
const ProductImages = ({ instrumento }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Image
        src={`${apiUrl}${instrumento.imagen}`}
        alt={instrumento.nombre}
        style={{ 
          maxWidth: "100%", 
          height: "auto",
          maxHeight: "500px",
          borderRadius: "8px",
          objectFit: "contain"
        }}
        preview={{
          maskClassName: 'custom-image-mask',
        }}
      />
    </div>
  );
};

export default ProductImages;