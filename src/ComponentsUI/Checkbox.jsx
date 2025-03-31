import React from 'react';
import { Checkbox as AntdCheckbox } from 'antd';


const Checkbox = ({ children, ...rest }) => {
  return (
    <AntdCheckbox {...rest}>
      {children}
    </AntdCheckbox>
  );
};

export default Checkbox;
