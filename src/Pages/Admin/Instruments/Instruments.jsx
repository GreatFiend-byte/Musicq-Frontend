import React, { useEffect, useState } from "react";
import { message, Form, Modal } from "antd";
import Layout, { Content } from "../../../ComponentsUI/Layout.jsx";
import Typography, { Title } from "../../../ComponentsUI/Typography.jsx";
import { 
  editInstrument, 
  deleteInstrument, 
  getInstrumentsyCategories, 
  addInstrument, 
  getBrands, 
  getSubcategories 
} from "../../../services/adminService.js";
import InstrumentForm from "./Components/InstrumentForm";
import InstrumentCategorySection from "./Components/InstrumentCategorySection"; 


const apiUrl = import.meta.env.VITE_API_URL;

const Instruments = () => {
    const [categories, setCategories] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentInstrument, setCurrentInstrument] = useState(null);
    const [form] = Form.useForm();
    const [isAdding, setIsAdding] = useState(false);
    const [brands, setBrands] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesData, brandsData, subcategoriesData] = await Promise.all([
                    getInstrumentsyCategories(),
                    getBrands(),
                    getSubcategories()
                ]);
                
                if (categoriesData && Array.isArray(categoriesData)) {
                    setCategories(categoriesData);
                }
                setBrands(brandsData);
                setSubcategories(subcategoriesData);
            } catch (error) {
                console.error("Error al obtener datos:", error);
                message.error("Error al cargar los datos");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (instrumentId, categoryId) => {
        Modal.confirm({
            title: '¿Eliminar instrumento?',
            content: 'Esta acción no se puede deshacer',
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk: async () => {
                try {
                    await deleteInstrument(categoryId, instrumentId);
                    setCategories(categories.map(category => ({
                        ...category,
                        instrumentos: category.instrumentos.filter(
                            instrument => instrument.id !== instrumentId
                        )
                    })));
                    message.success('Instrumento eliminado correctamente');
                } catch (error) {
                    console.error("Error al eliminar instrumento:", error);
                    message.error('Error al eliminar el instrumento');
                }
            }
        });
    };

    const handleEdit = (instrument, categoryId) => {
        setIsAdding(false);
        setCurrentInstrument({ ...instrument, categoryId });
        form.setFieldsValue({
            nombre: instrument.nombre,
            descripcion: instrument.descripcion,
            marca: instrument.marca,
            precio: instrument.precio,
            subcategoria: instrument.subcategoria,
            existencias: instrument.existencias,
            imagen: instrument.imagen,
        });
        setIsModalVisible(true);
    };

    const handleAddInstrument = (categoryId) => {
        setIsAdding(true);
        setCurrentInstrument({ categoryId });
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            if (isAdding) {
                const newInstrument = await addInstrument(
                    currentInstrument.categoryId, 
                    values
                );
                setCategories(categories.map(category => (
                    category.id === currentInstrument.categoryId
                        ? { 
                            ...category, 
                            instrumentos: [...category.instrumentos, newInstrument] 
                          }
                        : category
                )));
                message.success('Instrumento agregado correctamente');
            } else {
                await editInstrument(
                    currentInstrument.categoryId, 
                    currentInstrument.id, 
                    values
                );
                setCategories(categories.map(category => ({
                    ...category,
                    instrumentos: category.instrumentos.map(instrument =>
                        instrument.id === currentInstrument.id ? 
                        { ...instrument, ...values } : 
                        instrument
                    )
                })));
                message.success('Instrumento actualizado correctamente');
            }

            setIsModalVisible(false);
        } catch (error) {
            console.error("Error al guardar instrumento:", error);
            message.error('Error al guardar el instrumento');
        }
    };

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`${apiUrl}/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error al subir la imagen');
            }

            const data = await response.json();
            form.setFieldsValue({ imagen: data.imageUrl });
            message.success('Imagen subida correctamente');
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            message.error('Error al subir la imagen');
        }
    };

    return (
        <Layout style={{ backgroundColor: "#f8f8f8" }}>
            <Content style={{ padding: "40px 24px", maxWidth: "1400px", margin: "0 auto" }}>
                <Title level={2}>Administración de Instrumentos</Title>

                {categories.map(category => (
                    <InstrumentCategorySection
                        key={category.id}
                        category={category}
                        onAddInstrument={handleAddInstrument}
                        onEditInstrument={(instrument) => handleEdit(instrument, category.id)}
                        onDeleteInstrument={handleDelete}
                        apiUrl={apiUrl}
                    />
                ))}

                <Modal
                    title={isAdding ? "Agregar Instrumento" : "Editar Instrumento"}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={() => setIsModalVisible(false)}
                    okText="Guardar"
                    cancelText="Cancelar"
                    width={800}
                >
                    <InstrumentForm
                        form={form}
                        brands={brands}
                        subcategories={subcategories}
                        onImageUpload={handleImageUpload}
                        isAdding={isAdding}
                    />
                </Modal>
            </Content>
        </Layout>
    );
};

export default Instruments;