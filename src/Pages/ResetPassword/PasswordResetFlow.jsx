import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../../services/authService';
import { Form, Input, Alert, Divider, Space, Spin, theme } from 'antd';
import Button from '../../ComponentsUI/Button';
import Typography, { Title, Text } from "../../ComponentsUI/Typography.jsx";
import { LockOutlined, ArrowLeftOutlined } from '@ant-design/icons';


const PasswordResetForm = () => {
  const [form] = Form.useForm();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { token: themeToken } = theme.useToken();

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      setError('');
      setMessage('');

      if (!token) {
        throw new Error('Token no válido o enlace expirado');
      }

      await resetPassword(token, values.newPassword);
      
      setMessage('Contraseña actualizada correctamente. Redirigiendo...');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.message || 'Error al restablecer la contraseña');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: themeToken.colorBgContainer,
      padding: '24px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        backgroundColor: themeToken.colorBgElevated
      }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title level={2} style={{ color: themeToken.colorPrimary, marginBottom: 0 }}>
              <span style={{ color: themeToken.colorPrimary }}>Music</span>
              <span style={{ color: themeToken.colorPrimaryHover }}>Q</span>
            </Title>
            <Title level={4} style={{ marginTop: '8px', color: themeToken.colorText }}>
              Restablecer Contraseña
            </Title>
            <Text type="secondary">
              Ingresa tu nueva contraseña para continuar
            </Text>
          </div>

          {error && (
            <Alert 
              message={error} 
              type="error" 
              showIcon 
              closable 
              onClose={() => setError('')}
            />
          )}
          
          {message && (
            <Alert 
              message={message} 
              type="success" 
              showIcon
            />
          )}

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            disabled={isLoading}
          >
            <Form.Item
              name="newPassword"
              label="Nueva contraseña"
              rules={[
                { required: true, message: 'Por favor ingresa tu nueva contraseña' },
                { min: 6, message: 'La contraseña debe tener al menos 6 caracteres' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Nueva contraseña"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirmar contraseña"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Por favor confirma tu contraseña' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Las contraseñas no coinciden'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirmar contraseña"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                block 
                size="large"
                loading={isLoading}
                icon={!isLoading && <LockOutlined />}
              >
                {isLoading ? 'Procesando...' : 'Restablecer Contraseña'}
              </Button>
            </Form.Item>
          </Form>

          <Divider style={{ margin: '16px 0' }} />

          <div style={{ textAlign: 'center' }}>
            <Button 
              type="link" 
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/login')}
            >
              Volver al inicio de sesión
            </Button>
          </div>

          <div style={{ 
            textAlign: 'center', 
            marginTop: '24px',
            fontSize: '12px',
            color: themeToken.colorTextSecondary
          }}>
            <Text type="secondary">
              © {new Date().getFullYear()} MusicQ. Todos los derechos reservados.
            </Text>
          </div>
        </Space>
      </div>
    </div>
  );
};

export default PasswordResetForm;