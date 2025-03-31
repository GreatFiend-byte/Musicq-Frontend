import React from 'react';
import { Button as AntdButton } from 'antd';


const Button = ({ children, type = 'primary', ...rest }) => {
  return (
    <AntdButton
      type={type}
      style={{ 
        borderRadius: '4px', 
        fontWeight: 500,
        ...rest.style
      }}
      {...rest}
    >
      {children}
    </AntdButton>
  );
};

export default Button;
