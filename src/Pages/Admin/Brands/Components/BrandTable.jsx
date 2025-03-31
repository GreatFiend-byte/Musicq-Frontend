import React from "react";
import { Table } from "antd";
import Button from "../../../../ComponentsUI/Button";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const BrandTable = ({ data, onEdit, onDelete }) => {
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
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          />
          <Button 
            type="primary" 
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record.id)}
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

export default BrandTable;