import React from 'react';
import { Card as AntdCard } from 'antd';


const Card = ({ children, ...rest }) => {
  return (
    <AntdCard
      hoverable
      style={{ 
        borderRadius: '8px', 
        overflow: 'hidden', 
        ...rest.style 
      }}
      {...rest}
    >
      {children}
    </AntdCard>
  );
};

export default Card;
