import React from 'react';
import { Avatar, Divider } from 'antd';
import Card from '../../../ComponentsUI/Card'; 
import Typography, { Title, Paragraph } from '../../../ComponentsUI/Typography.jsx';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../../../context/AuthContext';

const AvatarCard = () => {
  const { user } = useAuth();

  return (
    <Card
      style={{ 
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        padding: '20px'
      }}
    >
      <Avatar 
        size={150} 
        src={user?.avatar} 
        icon={<UserOutlined />}
        style={{ 
          border: '4px solid #fff',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          backgroundColor: user?.avatar ? 'transparent' : '#ff3b3b'
        }}
      />

      <Title level={3} style={{ marginTop: '16px', marginBottom: '4px' }}>
        {user?.nombre || 'Nombre'} {user?.apellido || 'Apellido'}
      </Title>
      
      <Paragraph type="secondary" style={{ marginBottom: '16px' }}>
        @{user?.username || 'usuario'}
      </Paragraph>

      <Divider style={{ margin: '16px 0' }} />

      <div style={{ textAlign: 'left' }}>
        <Paragraph>
          <MailOutlined style={{ marginRight: '8px', color: '#ff3b3b' }} />
          {user?.email || 'correo@ejemplo.com'}
        </Paragraph>
        
        {user?.phone && (
          <Paragraph>
            <PhoneOutlined style={{ marginRight: '8px', color: '#ff3b3b' }} />
            {user.phone}
          </Paragraph>
        )}
        
        {user?.address && (
          <Paragraph>
            <EnvironmentOutlined style={{ marginRight: '8px', color: '#ff3b3b' }} />
            {user.address}
          </Paragraph>
        )}
      </div>
    </Card>
  );
};

export default AvatarCard;