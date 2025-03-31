import React from "react";
import { Input, Badge } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import Typography, { Title } from "../../../../ComponentsUI/Typography.jsx";

const { Search } = Input;

const UserSearch = ({ count, onSearch }) => (
  <>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
      <Title level={2} style={{ margin: 0 }}>Administración de Usuarios</Title>
      <Badge 
        count={`${count} usuarios`} 
        style={{ backgroundColor: '#ff3b3b' }} 
      />
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
      <Search
        placeholder="Buscar usuarios..."
        allowClear
        enterButton={<SearchOutlined />}
        size="large"
        style={{ width: "400px" }}
        onSearch={onSearch}
      />
    </div>
  </>
);

export default UserSearch;