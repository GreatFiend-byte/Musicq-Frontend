import React from "react";
import Card from "../../../../ComponentsUI/Card";
import { ShoppingOutlined } from "@ant-design/icons";

const CartItemsTable = ({ cartItems }) => (
  <Card
    title={
      <span>
        <ShoppingOutlined style={{ marginRight: 8 }} />
        Artículos en tu pedido
      </span>
    }
    style={{ marginBottom: 24 }}
  >
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#fafafa' }}>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #f0f0f0' }}>Producto</th>
            <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #f0f0f0' }}>Precio Unitario</th>
            <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #f0f0f0' }}>Cantidad</th>
            <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #f0f0f0' }}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '40px', height: '40px', marginRight: '12px' }}
                  />
                  {item.name}
                </div>
              </td>
              <td style={{ padding: '12px', textAlign: 'right' }}>
                ${item.price.toFixed(2)}
              </td>
              <td style={{ padding: '12px', textAlign: 'center' }}>
                {item.quantity}
              </td>
              <td style={{ padding: '12px', textAlign: 'right' }}>
                ${(item.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);

export default CartItemsTable;