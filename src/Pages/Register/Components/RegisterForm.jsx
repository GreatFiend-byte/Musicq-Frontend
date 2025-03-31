import React from 'react';
import { Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import Checkbox from '../../../ComponentsUI/Checkbox.jsx';
import Button from '../../../ComponentsUI/Button.jsx';
import { registerUser } from '../../../services/authService'; 

const RegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false); 

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      form.setFields([
        { name: 'confirmPassword', errors: ['Las contraseñas no coinciden'] }
      ]);
      return;
    }

    if (!values.terminos) {
      message.error('Debes aceptar los términos y condiciones');
      return;
    }

    setLoading(true);

    try {
      const { email, username, password, nombre, apellido } = values;
      await registerUser(email, username, password, nombre, apellido, 'user'); // por default el rol es 'user'

      message.success('Usuario registrado con éxito');

      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message || 'Error al registrar el usuario');
      } else if (error.request) {
        message.error('No se recibió respuesta del servidor');
      } else {
        message.error('Error al configurar la solicitud');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '0px',
      minHeight: '0vh',
      backgroundColor: '#fff'
    }}>
      <div style={{
        backgroundColor: '#000',
        width: '400px',
        padding: '30px',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#fff', marginBottom: '24px' }}>Registro</h2>

        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          style={{ textAlign: 'left' }}
        >
          <Form.Item
            name="username"
            label={<span style={{ color: '#fff' }}>Nombre de usuario</span>}
            rules={[{ required: true, message: 'Por favor ingresa tu nombre de usuario' }]}
          >
            <Input style={{ borderRadius: '4px' }} />
          </Form.Item>

          <Form.Item
            name="nombre"
            label={<span style={{ color: '#fff' }}>Nombre</span>}
            rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}
          >
            <Input style={{ borderRadius: '4px' }} />
          </Form.Item>

          <Form.Item
            name="apellido"
            label={<span style={{ color: '#fff' }}>Apellido</span>}
            rules={[{ required: true, message: 'Por favor ingresa tu apellido' }]}
          >
            <Input style={{ borderRadius: '4px' }} />
          </Form.Item>

          <Form.Item
            name="email"
            label={<span style={{ color: '#fff' }}>Email</span>}
            rules={[
              { required: true, message: 'Por favor ingresa tu email' },
              { type: 'email', message: 'Ingresa un email válido' }
            ]}
          >
            <Input style={{ borderRadius: '4px' }} />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span style={{ color: '#fff' }}>Contraseña</span>}
            rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
          >
            <Input.Password style={{ borderRadius: '4px' }} />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label={<span style={{ color: '#fff' }}>Confirmar Contraseña</span>}
            rules={[{ required: true, message: 'Por favor confirma tu contraseña' }]}
          >
            <Input.Password style={{ borderRadius: '4px' }} />
          </Form.Item>

          <Form.Item name="terminos" valuePropName="checked" style={{ marginBottom: '12px' }}>
            <Checkbox style={{ color: '#fff' }}>Acepto los términos y condiciones</Checkbox>
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
            <Button style={{ flex: 1, backgroundColor: '#333', borderColor: '#333' }}>
              <span style={{ color: '#fff' }}>Cancelar</span>
            </Button>
            <Button 
              type="primary" 
              htmlType="submit" 
              style={{ flex: 1, backgroundColor: '#333', borderColor: '#333' }}
              loading={loading}
            >
              Registrarse
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;