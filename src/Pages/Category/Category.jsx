import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout, { Content } from "../../ComponentsUI/Layout.jsx";
import Card from "../../ComponentsUI/Card.jsx";
import Button from "../../ComponentsUI/Button.jsx";
import Row from "../../ComponentsUI/Row.jsx";
import Col from "../../ComponentsUI/Col.jsx";
import Checkbox from '../../ComponentsUI/Checkbox.jsx';
import Typography, { Title, Paragraph } from "../../ComponentsUI/Typography.jsx";
import { Input, Select, Slider, Empty, Tag, Divider, Badge } from "antd";
import { getCategoriaById } from "../../services/productService.js";
import { getBrands, getSubcategories } from "../../services/adminService.js";

const apiUrl = import.meta.env.VITE_API_URL;
const { Search } = Input;
const { Option } = Select;

const Category = () => {
    const { id } = useParams();
    const [categoria, setCategoria] = useState(null);
    const [brands, setBrands] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [filteredInstrumentos, setFilteredInstrumentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        nombre: "",
        subcategoria: null,
        marca: null,
        precio: [0, 50000],
        soloStock: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [categoryData, brandsData, subcategoriesData] = await Promise.all([
                    getCategoriaById(id),
                    getBrands(),
                    getSubcategories()
                ]);
                setCategoria(categoryData);
                setFilteredInstrumentos(categoryData?.instrumentos || []);
                setBrands(brandsData);
                setSubcategories(subcategoriesData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const applyFilters = () => {
        if (!categoria) return;

        const { nombre, subcategoria, marca, precio, soloStock } = filters;

        const filtered = categoria.instrumentos.filter(instrumento => {
            const cumpleNombre = !nombre || instrumento.nombre.toLowerCase().includes(nombre.toLowerCase());
            const cumpleSubcategoria = !subcategoria || instrumento.subcategoria === subcategoria;
            const cumpleMarca = !marca || instrumento.marca === marca;
            const cumplePrecio = instrumento.precio >= precio[0] && instrumento.precio <= precio[1];
            const cumpleStock = !soloStock || instrumento.existencias > 0;

            return cumpleNombre && cumpleSubcategoria && cumpleMarca && cumplePrecio && cumpleStock;
        });

        setFilteredInstrumentos(filtered);
    };

    useEffect(() => {
        applyFilters();
    }, [filters, categoria]);

    const handleNombreChange = (e) => {
        setFilters({ ...filters, nombre: e.target.value });
    };

    const handleSubcategoriaChange = (value) => {
        setFilters({ ...filters, subcategoria: value });
    };

    const handleMarcaChange = (value) => {
        setFilters({ ...filters, marca: value });
    };

    const handlePrecioChange = (value) => {
        setFilters({ ...filters, precio: value });
    };

    const handleStockChange = (e) => {
        setFilters({ ...filters, soloStock: e.target.checked });
    };

    const resetFilters = () => {
        setFilters({
            nombre: "",
            subcategoria: null,
            marca: null,
            precio: [0, 50000],
            soloStock: false,
        });
    };

    if (loading) {
        return (
            <Layout style={{ backgroundColor: "#f8f8f8" }}>
                <Content style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}>
                    <Title level={2}>Cargando categoría...</Title>
                </Content>
            </Layout>
        );
    }

    if (!categoria) {
        return (
            <Layout style={{ backgroundColor: "#f8f8f8" }}>
                <Content style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}>
                    <Empty description="Categoría no encontrada" />
                </Content>
            </Layout>
        );
    }

    return (
        <Layout style={{ backgroundColor: "#f8f8f8" }}>
            <Content style={{ padding: "40px 24px", maxWidth: "1400px", margin: "0 auto" }}>
                {/* Encabezado y Filtros */}
                <Card
                    style={{
                        marginBottom: "32px",
                        padding: "24px",
                        borderRadius: "12px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                        <Title level={2} style={{ margin: 0 }}>{categoria.nombre}</Title>
                        <Badge 
                            count={`${filteredInstrumentos.length} productos`} 
                            style={{ backgroundColor: '#ff3b3b' }} 
                        />
                    </div>

                    <Row gutter={[24, 16]} align="middle">
                        <Col xs={24} md={6}>
                            <Search
                                placeholder="Buscar instrumentos..."
                                allowClear
                                enterButton
                                size="large"
                                value={filters.nombre}
                                onChange={handleNombreChange}
                            />
                        </Col>

                        <Col xs={24} md={4}>
                            <Select
                                placeholder="Subcategoría"
                                style={{ width: "100%" }}
                                size="large"
                                onChange={handleSubcategoriaChange}
                                value={filters.subcategoria}
                                allowClear
                            >
                                {subcategories.map(subcategory => (
                                    <Option key={subcategory.id} value={subcategory.nombre}>
                                        {subcategory.nombre}
                                    </Option>
                                ))}
                            </Select>
                        </Col>

                        <Col xs={24} md={4}>
                            <Select
                                placeholder="Marca"
                                style={{ width: "100%" }}
                                size="large"
                                onChange={handleMarcaChange}
                                value={filters.marca}
                                allowClear
                            >
                                {brands.map(brand => (
                                    <Option key={brand.id} value={brand.nombre}>
                                        {brand.nombre}
                                    </Option>
                                ))}
                            </Select>
                        </Col>

                        <Col xs={24} md={6}>
                            <div style={{ padding: "0 16px" }}>
                                <Slider
                                    range
                                    min={0}
                                    max={50000}
                                    step={500}
                                    value={filters.precio}
                                    onChange={handlePrecioChange}
                                    tipFormatter={(value) => `$${value.toLocaleString()}`}
                                />
                                <Paragraph style={{ textAlign: "center", margin: "8px 0 0" }}>
                                    ${filters.precio[0].toLocaleString()} - ${filters.precio[1].toLocaleString()}
                                </Paragraph>
                            </div>
                        </Col>

                        <Col xs={24} md={2}>
                            <Checkbox
                                checked={filters.soloStock}
                                onChange={handleStockChange}
                                style={{ whiteSpace: "nowrap" }}
                            >
                                En stock
                            </Checkbox>
                        </Col>

                        <Col xs={24} md={2}>
                            <Button 
                                onClick={resetFilters}
                                style={{ width: "100%" }}
                            >
                                Limpiar
                            </Button>
                        </Col>
                    </Row>
                </Card>

                {/* Resultados */}
                {filteredInstrumentos.length === 0 ? (
                    <Card style={{ textAlign: "center", padding: "40px" }}>
                        <Empty
                            description="No se encontraron instrumentos con los filtros seleccionados"
                        />
                        <Button 
                            type="primary" 
                            onClick={resetFilters}
                            style={{ marginTop: "16px" }}
                        >
                            Mostrar todos
                        </Button>
                    </Card>
                ) : (
                    <Row gutter={[24, 24]}>
                        {filteredInstrumentos.map((instrumento) => (
                            <Col key={instrumento.id} xs={24} sm={12} md={8} lg={6}>
                                <Card
                                    hoverable
                                    cover={
                                        <img 
                                            src={`${apiUrl}${instrumento.imagen}`} 
                                            alt={instrumento.nombre} 
                                            style={{ 
                                                height: "220px", 
                                                objectFit: "cover",
                                                borderTopLeftRadius: "8px",
                                                borderTopRightRadius: "8px"
                                            }} 
                                        />
                                    }
                                    style={{ 
                                        borderRadius: "8px",
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between"
                                    }}
                                    bodyStyle={{ padding: "16px" }}
                                >
                                    <div>
                                        <Title level={4} style={{ marginBottom: "8px" }}>
                                            {instrumento.nombre}
                                        </Title>
                                        <Paragraph 
                                            ellipsis={{ rows: 3 }} 
                                            style={{ color: "#666", marginBottom: "12px" }}
                                        >
                                            {instrumento.descripcion}
                                        </Paragraph>
                                        
                                        <div style={{ marginBottom: "12px" }}>
                                            <Tag color="blue">{instrumento.marca}</Tag>
                                            <Tag color="green">{instrumento.subcategoria}</Tag>
                                        </div>
                                        
                                        <Paragraph strong style={{ fontSize: "18px", color: "#ff3b3b" }}>
                                            ${instrumento.precio.toLocaleString()}
                                        </Paragraph>
                                        
                                        <Paragraph 
                                            style={{ 
                                                color: instrumento.existencias > 0 ? "#52c41a" : "#f5222d",
                                                fontWeight: "500"
                                            }}
                                        >
                                            {instrumento.existencias > 0 ? 
                                                `Disponible (${instrumento.existencias})` : 
                                                "Agotado"}
                                        </Paragraph>
                                    </div>
                                    
                                    <Link 
                                        to={`/product/${categoria.id}/${instrumento.id}`}
                                        style={{ display: "block", marginTop: "16px" }}
                                    >
                                        <Button 
                                            type="primary" 
                                            block
                                            style={{ 
                                                backgroundColor: "#ff3b3b", 
                                                borderColor: "#ff3b3b",
                                                height: "40px"
                                            }}
                                            disabled={instrumento.existencias <= 0}
                                        >
                                            {instrumento.existencias > 0 ? "Ver detalles" : "No disponible"}
                                        </Button>
                                    </Link>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Content>
        </Layout>
    );
};

export default Category;