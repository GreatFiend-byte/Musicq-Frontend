import React, { useState, useEffect } from 'react';
import { Tabs, message, Form, Spin, Alert } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Row from '../../ComponentsUI/Row.jsx';
import Col from '../../ComponentsUI/Col.jsx';
import Card from '../../ComponentsUI/Card.jsx';
import Layout, { Content } from '../../ComponentsUI/Layout.jsx';
import Typography, { Title } from '../../ComponentsUI/Typography.jsx';
import AvatarCard from './Components/AvatarCard';
import PersonalInfoTab from './Components/PersonalInfoTab';
import { UserOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const ProfilePage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');
  const [avatarUrl, setAvatarUrl] = useState('https://randomuser.me/api/portraits/men/32.jpg');
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      message.warning('Debes iniciar sesión para acceder a esta página');
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      setLoading(true);
      try {
        if (user) {
          form.setFieldsValue({
            nombre: user.nombre || '',
            apellido: user.apellido || '',
            username: user.username || '',
            email: user.email || '',
            phone: user.phone || '',
            birthDate: user.birthDate ? moment(user.birthDate) : null,
            gender: user.gender || '',
            address: user.address || ''
          });
          setAvatarUrl(user.avatar || 'https://randomuser.me/api/portraits/men/32.jpg');
        }
      } catch (error) {
        message.error('Error al cargar los datos del perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [form, isLoggedIn, user, navigate]);

  const handleSave = async (values) => {
    setLoading(true);
    try {
      const updatedUser = {
        ...user,
        ...values,
        birthDate: values.birthDate ? values.birthDate.format('YYYY-MM-DD') : null
      };
      
      message.success('Perfil actualizado correctamente');
    } catch (error) {
      message.error('Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (info) => {
    if (info.file.status === 'done') {
      const imageUrl = URL.createObjectURL(info.file.originFileObj);
      setAvatarUrl(imageUrl);
      message.success('Avatar actualizado correctamente');
    }
  };

  if (!isLoggedIn) {
    return (
      <Layout style={{ backgroundColor: '#f8f8f8' }}>
        <Content style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <Spin tip="Redirigiendo..." size="large">
            <div style={{ padding: '50px', textAlign: 'center' }} />
          </Spin>
        </Content>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout style={{ backgroundColor: '#f8f8f8' }}>
        <Content style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <Spin tip="Cargando perfil..." size="large">
            <div style={{ padding: '50px', textAlign: 'center' }} />
          </Spin>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ backgroundColor: '#f8f8f8' }}>
      <Content style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <Title level={2} style={{ marginBottom: '24px' }}>Mi Perfil</Title>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <AvatarCard 
              avatarUrl={avatarUrl} 
              onAvatarChange={handleAvatarChange} 
              username={user?.username}
              email={user?.email}
            />
          </Col>

          <Col xs={24} md={16}>
            <Card style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <Tabs activeKey={activeTab} onChange={setActiveTab} tabBarStyle={{ marginBottom: '24px' }}>
                <TabPane tab={<span><UserOutlined />Información Personal</span>} key="personal">
                  <PersonalInfoTab form={form} loading={loading} onSave={handleSave} />
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ProfilePage;