import React, { useEffect, useState } from "react";
import { Modal, message, Form } from "antd";
import Card from "../../../ComponentsUI/Card.jsx";
import Layout, { Content } from "../../../ComponentsUI/Layout.jsx";
import Button from "../../../ComponentsUI/Button.jsx";
import Typography, { Title } from "../../../ComponentsUI/Typography.jsx";
import { getBrands, addBrand, editBrand, deleteBrand } from "../../../services/adminService.js";
import BrandForm from "./Components/BrandForm";
import BrandTable from "./Components/BrandTable";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentBrand, setCurrentBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const response = await getBrands();
        if (response && Array.isArray(response)) {
          setBrands(response);
        }
      } catch (error) {
        console.error("Error al obtener marcas:", error);
        message.error("Error al cargar las marcas");
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  const handleDelete = async (brandId) => {
    Modal.confirm({
      title: '¿Eliminar marca?',
      content: 'Esta acción no se puede deshacer',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await deleteBrand(brandId);
          setBrands(brands.filter(brand => brand.id !== brandId));
          message.success('Marca eliminada correctamente');
        } catch (error) {
          console.error("Error al eliminar marca:", error);
          message.error('Error al eliminar la marca');
        }
      }
    });
  };

  const handleEdit = (brand) => {
    setCurrentBrand(brand);
    form.setFieldsValue({
      nombre: brand.nombre,
      descripcion: brand.descripcion,
    });
    setIsModalVisible(true);
  };

  const handleAddBrand = () => {
    setCurrentBrand(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (currentBrand) {
        await editBrand(currentBrand.id, values);
        setBrands(brands.map(brand => 
          brand.id === currentBrand.id ? { ...brand, ...values } : brand
        ));
        message.success('Marca actualizada correctamente');
      } else {
        const newBrand = await addBrand(values);
        setBrands([...brands, newBrand]);
        message.success('Marca agregada correctamente');
      }
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error al guardar marca:", error);
      message.error('Error al guardar la marca');
    }
  };

  if (loading) {
    return (
      <Layout style={{ backgroundColor: "#f8f8f8" }}>
        <Content style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <Title level={2}>Cargando marcas...</Title>
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
            <Title level={2} style={{ margin: 0 }}>Administrar Marcas</Title>
            <Button 
              type="primary" 
              onClick={handleAddBrand}
            >
              Agregar Marca
            </Button>
          </div>

          <BrandTable
            data={brands}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Card>

        <Modal
          title={currentBrand ? "Editar Marca" : "Agregar Marca"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={() => setIsModalVisible(false)}
          okText="Guardar"
          cancelText="Cancelar"
          width={600}
        >
          <BrandForm form={form} />
        </Modal>
      </Content>
    </Layout>
  );
};

export default Brands;