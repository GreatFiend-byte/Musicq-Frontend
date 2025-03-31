import React from "react";
import Button from "../../../../ComponentsUI/Button";
import { Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const UserTable = ({ data, loading, onEdit, onDelete }) => {
  const getRoleTag = (rol) => {
    switch(rol.toLowerCase()) {
      case 'admin':
        return <Tag color="red">ADMIN</Tag>;
      case 'user':
        return <Tag color="blue">USUARIO</Tag>;
      case 'vendedor':
        return <Tag color="green">VENDEDOR</Tag>;
      default:
        return <Tag>{rol}</Tag>;
    }
  };

  const columns = [
    {
      title: "Nombre Completo",
      key: "nombreCompleto",
      render: (_, record) => (
        <span>
          {record.nombre} {record.apellido}
          <br />
          <small style={{ color: '#666' }}>@{record.username}</small>
        </span>
      ),
      sorter: (a, b) => a.nombre.localeCompare(b.nombre),
    },
    {
      title: "Correo Electrónico",
      dataIndex: "email",
      key: "email",
      render: email => <a href={`mailto:${email}`}>{email}</a>
    },
    {
      title: "Rol",
      dataIndex: "rol",
      key: "rol",
      render: rol => getRoleTag(rol),
      filters: [
        { text: 'Administrador', value: 'admin' },
        { text: 'Usuario', value: 'user' },
        { text: 'Vendedor', value: 'vendedor' },
      ],
      onFilter: (value, record) => record.rol.toLowerCase() === value,
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button 
            type="primary" 
            shape="circle" 
            icon={<EditOutlined />} 
            onClick={() => onEdit(record)}
          />
          <Button 
            type="primary" 
            shape="circle" 
            icon={<DeleteOutlined />} 
            onClick={() => onDelete(record.id)}
            danger
          />
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      loading={loading}
      pagination={{
        pageSize: 10,
        showSizeChanger: false,
        showTotal: (total) => `Total: ${total} usuarios`
      }}
      scroll={{ x: true }}
      locale={{
        emptyText: 'No se encontraron usuarios'
      }}
    />
  );
};

export default UserTable;