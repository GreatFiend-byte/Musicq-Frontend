import React, { useEffect, useState } from "react";
import { Modal, message, Form } from "antd";
import Card from "../../../ComponentsUI/Card.jsx";
import Layout, { Content } from "../../../ComponentsUI/Layout.jsx";
import Button from "../../../ComponentsUI/Button.jsx";
import Typography, { Title } from "../../../ComponentsUI/Typography.jsx";
import { getSubcategories, addSubcategory, editSubcategory, deleteSubcategory } from "../../../services/adminService.js";
import SubcategoryForm from "./Components/SubcategoryForm";
import SubcategoryTable from "./Components/SubcategoryTable";

const Subcategories = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentSubcategory, setCurrentSubcategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        setLoading(true);
        const response = await getSubcategories();
        if (response && Array.isArray(response)) {
          setSubcategories(response);
        }
      } catch (error) {
        console.error("Error al obtener subcategorías:", error);
        message.error("Error al cargar las subcategorías");
      } finally {
        setLoading(false);
      }
    };
    fetchSubcategories();
  }, []);

  const handleDelete = async (subcategoryId) => {
    Modal.confirm({
      title: '¿Eliminar subcategoría?',
      content: 'Esta acción no se puede deshacer',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await deleteSubcategory(subcategoryId);
          setSubcategories(subcategories.filter(subcategory => subcategory.id !== subcategoryId));
          message.success('Subcategoría eliminada correctamente');
        } catch (error) {
          console.error("Error al eliminar subcategoría:", error);
          message.error('Error al eliminar la subcategoría');
        }
      }
    });
  };

  const handleEdit = (subcategory) => {
    setCurrentSubcategory(subcategory);
    form.setFieldsValue({
      nombre: subcategory.nombre,
      descripcion: subcategory.descripcion,
    });
    setIsModalVisible(true);
  };

  const handleAddSubcategory = () => {
    setCurrentSubcategory(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (currentSubcategory) {
        await editSubcategory(currentSubcategory.id, values);
        setSubcategories(subcategories.map(subcategory =>
          subcategory.id === currentSubcategory.id ? { ...subcategory, ...values } : subcategory
        ));
        message.success('Subcategoría actualizada correctamente');
      } else {
        const newSubcategory = await addSubcategory(values);
        setSubcategories([...subcategories, newSubcategory]);
        message.success('Subcategoría agregada correctamente');
      }
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error al guardar subcategoría:", error);
      message.error('Error al guardar la subcategoría');
    }
  };

  if (loading) {
    return (
      <Layout style={{ backgroundColor: "#f8f8f8" }}>
        <Content style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <Title level={2}>Cargando subcategorías...</Title>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ backgroundColor: "#f8f8f8" }}>
      <Content style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <Card
          style={{
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <Title level={2} style={{ margin: 0 }}>Administrar Subcategorías</Title>
            <Button 
              type="primary" 
              onClick={handleAddSubcategory}
            >
              Agregar Subcategoría
            </Button>
          </div>

          <SubcategoryTable
            data={subcategories}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Card>

        <Modal
          title={currentSubcategory ? "Editar Subcategoría" : "Agregar Subcategoría"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={() => setIsModalVisible(false)}
          okText="Guardar"
          cancelText="Cancelar"
          width={600}
        >
          <SubcategoryForm form={form} />
        </Modal>
      </Content>
    </Layout>
  );
};

export default Subcategories;