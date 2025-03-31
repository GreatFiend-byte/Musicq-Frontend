import React from "react";
import Button from "../../../../ComponentsUI/Button";
import { Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const InstrumentTable = ({ data, onEdit, onDelete, apiUrl }) => {
  const columns = [
    { 
      title: "Nombre", 
      dataIndex: "nombre", 
      key: "nombre",
      render: (text) => <strong>{text}</strong>
    },
    { 
      title: "Descripción", 
      dataIndex: "descripcion", 
      key: "descripcion",
      ellipsis: true
    },
    { 
      title: "Marca", 
      dataIndex: "marca", 
      key: "marca",
      render: (marca) => <Tag color="blue">{marca}</Tag>
    },
    { 
      title: "Precio", 
      dataIndex: "precio", 
      key: "precio",
      render: (precio) => `$${precio.toLocaleString()}`
    },
    { 
      title: "Subcategoría", 
      dataIndex: "subcategoria", 
      key: "subcategoria",
      render: (subcategoria) => <Tag color="green">{subcategoria}</Tag>
    },
    { 
      title: "Existencias", 
      dataIndex: "existencias", 
      key: "existencias",
      render: (existencias) => (
        <Tag color={existencias > 0 ? "green" : "red"}>
          {existencias}
        </Tag>
      )
    },
    {
      title: "Imagen",
      dataIndex: "imagen",
      key: "imagen",
      render: (imageUrl) => (
        <img 
          src={`${apiUrl}${imageUrl}`} 
          alt="Instrumento" 
          style={{ 
            width: 50, 
            height: 50, 
            objectFit: "cover",
            borderRadius: 4
          }} 
        />
      ),
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => onEdit(record)}
          />
          <Button 
            type="primary" 
            danger
            icon={<DeleteOutlined />} 
            onClick={() => onDelete(record.id, record.categoryId)}
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
      pagination={false}
      bordered
    />
  );
};

export default InstrumentTable;