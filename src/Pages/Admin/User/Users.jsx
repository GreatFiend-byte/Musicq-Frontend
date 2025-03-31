import React, { useEffect, useState } from "react";
import { Modal, message, Form, Divider } from "antd";
import Card from "../../../ComponentsUI/Card.jsx";
import Layout, { Content } from "../../../ComponentsUI/Layout.jsx";
import { editUser, deleteUser, getUsers } from "../../../services/adminService.js";
import UserForm from "./Components/UserForm";
import UserTable from "./Components/UserTable";
import UserSearch from "./Components/UserSearch";

const Users = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setLoading(true);
        const response = await getUsers();
        if (response && Array.isArray(response)) {
          setUsuarios(response);
          setFilteredUsers(response);
        }
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        message.error("Error al cargar los usuarios");
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  const handleDelete = async (userId) => {
    Modal.confirm({
      title: '¿Estás seguro de eliminar este usuario?',
      content: 'Esta acción no se puede deshacer',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await deleteUser(userId);
          setUsuarios(usuarios.filter(user => user.id !== userId));
          setFilteredUsers(filteredUsers.filter(user => user.id !== userId));
          message.success('Usuario eliminado correctamente');
        } catch (error) {
          console.error("Error al eliminar usuario:", error);
          message.error('Error al eliminar el usuario');
        }
      }
    });
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    form.setFieldsValue({
      username: user.username,
      email: user.email,
      nombre: user.nombre,
      apellido: user.apellido,
      rol: user.rol,
      password: ''
    });
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await editUser(currentUser.id, values);
      
      const updatedUsers = usuarios.map(user => 
        user.id === currentUser.id ? { ...user, ...values } : user
      );
      
      setUsuarios(updatedUsers);
      setFilteredUsers(updatedUsers);
      setIsModalVisible(false);
      message.success('Usuario actualizado correctamente');
    } catch (error) {
      console.error("Error al editar usuario:", error);
      message.error('Error al actualizar el usuario');
    }
  };

  const handleSearch = (value) => {
    if (!value) {
      setFilteredUsers(usuarios);
      return;
    }
    
    const filtered = usuarios.filter(user => 
      user.nombre.toLowerCase().includes(value.toLowerCase()) ||
      user.apellido.toLowerCase().includes(value.toLowerCase()) ||
      user.email.toLowerCase().includes(value.toLowerCase()) ||
      user.username.toLowerCase().includes(value.toLowerCase())
    );
    
    setFilteredUsers(filtered);
  };

  return (
    <Layout style={{ backgroundColor: "#f8f8f8" }}>
      <Content style={{ padding: "40px 24px", maxWidth: "1400px", margin: "0 auto" }}>
        <Card
          style={{
            marginBottom: "24px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
        >
          <UserSearch 
            count={filteredUsers.length} 
            onSearch={handleSearch} 
          />

          <Divider style={{ margin: "16px 0" }} />

          <UserTable
            data={filteredUsers}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Card>

        <Modal
          title={<span style={{ fontSize: '20px' }}>Editar Usuario: {currentUser?.username}</span>}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={() => setIsModalVisible(false)}
          okText="Guardar Cambios"
          cancelText="Cancelar"
          width={700}
          bodyStyle={{ padding: '24px' }}
        >
          <UserForm form={form} initialValues={currentUser} />
        </Modal>
      </Content>
    </Layout>
  );
};

export default Users;