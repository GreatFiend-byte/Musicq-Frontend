import React from 'react';
import { Form, Input, Select, DatePicker, message } from 'antd';
import Button from '../../../ComponentsUI/Button';
import Row from '../../../ComponentsUI/Row';
import Col from '../../../ComponentsUI/Col';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  EnvironmentOutlined,
  EditOutlined
} from '@ant-design/icons';
import { updateUserProfile } from '../../../services/authService';

const { TextArea } = Input;
const { Option } = Select;

const PersonalInfoTab = ({ form, loading, onSave }) => {
  const [formLoading, setFormLoading] = React.useState(false);

  const handleSubmit = async (values) => {
    try {
      setFormLoading(true);
      
      // Formatear la fecha si existe
      const formattedValues = {
        ...values,
        birthDate: values.birthDate ? values.birthDate.format('YYYY-MM-DD') : null
      };

      // Llamar al servicio para actualizar el perfil
      const updatedUser = await updateUserProfile(formattedValues);
      
      // Mostrar mensaje de éxito
      message.success('Perfil actualizado correctamente');
      
      // Ejecutar callback para actualizar el contexto/estado global
      //if (onSave) {
      //  onSave(updatedUser);
      //}
    } catch (error) {
      message.error(error.message || 'Error al actualizar el perfil');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item
            name="nombre"
            label="Nombre"
            rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nombre" />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            name="apellido"
            label="Apellido"
            rules={[{ required: true, message: 'Por favor ingresa tu apellido' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Apellido" />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            name="username"
            label="Nombre de usuario"
            rules={[
              { required: true, message: 'Por favor ingresa tu usuario' },
              { min: 4, message: 'Mínimo 4 caracteres' },
              { 
                pattern: /^[a-zA-Z0-9_]+$/, 
                message: 'Solo letras, números y guiones bajos' 
              }
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Usuario" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="email"
            label="Correo electrónico"
            rules={[
              { required: true, message: 'Por favor ingresa tu correo' },
              { type: 'email', message: 'Correo electrónico no válido' }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Correo electrónico" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="phone"
            label="Teléfono"
            rules={[{ required: true, message: 'Por favor ingresa tu teléfono' }]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Teléfono" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="birthDate"
            label="Fecha de nacimiento"
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="gender" label="Género">
            <Select placeholder="Selecciona tu género">
              <Option value="male">Masculino</Option>
              <Option value="female">Femenino</Option>
              <Option value="other">Otro</Option>
              <Option value="prefer-not-to-say">Prefiero no decir</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={formLoading || loading}
          icon={<EditOutlined />}
          style={{
            backgroundColor: '#ff3b3b',
            borderColor: '#ff3b3b',
            height: '40px',
            width: '150px'
          }}
        >
          Guardar Cambios
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PersonalInfoTab;