import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout, { Content } from "../../ComponentsUI/Layout.jsx";
import Card from "../../ComponentsUI/Card.jsx";
import Row from "../../ComponentsUI/Row.jsx";
import Col from "../../ComponentsUI/Col.jsx";
import Checkbox from '../../ComponentsUI/Checkbox.jsx';
import Button from "../../ComponentsUI/Button.jsx";
import Typography, { Title, Paragraph } from "../../ComponentsUI/Typography.jsx";
import { Input, Select, Slider, Empty, Tag, Divider, Badge } from "antd";
import { getProductsByBrand } from "../../services/productService.js";
import { getSubcategories } from "../../services/adminService.js";

const apiUrl = import.meta.env.VITE_API_URL;
const { Search } = Input;
const { Option } = Select;

const ProductBrand = () => {
    const { brand } = useParams();
    const [productos, setProductos] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        nombre: "",
        subcategoria: null,
        precio: [0, 50000],
        soloStock: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [productsData, subcategoriesData] = await Promise.all([
                    getProductsByBrand(brand),
                    getSubcategories()
                ]);
                setProductos(productsData);
                setSubcategories(subcategoriesData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [brand]);

    const productosFiltrados = productos.filter((producto) => {
        const { nombre, subcategoria, precio, soloStock } = filters;
        const nombreProducto = producto.nombre?.toLowerCase() || "";
        const nombreFiltro = nombre?.toLowerCase() || "";
        const subcategoriaProducto = producto.subcategoria?.toLowerCase() || "";
        const subcategoriaFiltro = subcategoria?.toLowerCase() || "";

        return (
            (nombreFiltro === "" || nombreProducto.includes(nombreFiltro)) &&
            (subcategoriaFiltro === "" || subcategoriaProducto === subcategoriaFiltro) &&
            (producto.precio >= precio[0] && producto.precio <= precio[1]) &&
            (!soloStock || producto.existencias > 0)
        );
    });

    const handleNombreChange = (e) => {
        setFilters({ ...filters, nombre: e.target.value });
    };

    const handleSubcategoriaChange = (value) => {
        setFilters({ ...filters, subcategoria: value });
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
            precio: [0, 50000],
            soloStock: false,
        });
    };

    if (loading) {
        return (
            <Layout style={{ backgroundColor: "#f8f8f8" }}>
                <Content style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}>
                    <Title level={2}>Cargando productos...</Title>
                </Content>
            </Layout>
        );
    }

    if (!productos.length) {
        return (
            <Layout style={{ backgroundColor: "#f8f8f8" }}>
                <Content style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}>
                    <Empty description={`No se encontraron productos para la marca: ${brand}`} />
                </Content>
            </Layout>
        );
    }

    return (
        <Layout style={{ backgroundColor: "#f8f8f8" }}>
            <Content style={{ padding: "40px 24px", maxWidth: "1400px", margin: "0 auto" }}>
                <Card
                    style={{
                        marginBottom: "32px",
                        padding: "24px",
                        borderRadius: "12px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                        <Title level={2} style={{ margin: 0 }}>
                            Instrumentos {brand}
                        </Title>
                        <Badge 
                            count={`${productosFiltrados.length} productos`} 
                            style={{ backgroundColor: '#ff3b3b' }} 
                        />
                    </div>

                    <Row gutter={[24, 16]} align="middle">
                        <Col xs={24} md={8}>
                            <Search
                                placeholder="Buscar instrumentos..."
                                allowClear
                                enterButton
                                size="large"
                                value={filters.nombre}
                                onChange={handleNombreChange}
                            />
                        </Col>

                        <Col xs={24} md={6}>
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

                {productosFiltrados.length === 0 ? (
                    <Card style={{ textAlign: "center", padding: "40px" }}>
                        <Empty
                            description="No se encontraron productos con los filtros seleccionados"
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
                        {productosFiltrados.map((producto) => (
                            <Col key={producto.id} xs={24} sm={12} md={8} lg={6}>
                                <Card
                                    hoverable
                                    cover={
                                        <img 
                                            src={`${apiUrl}${producto.imagen}`} 
                                            alt={producto.nombre} 
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
                                            {producto.nombre}
                                        </Title>
                                        <Paragraph 
                                            ellipsis={{ rows: 3 }} 
                                            style={{ color: "#666", marginBottom: "12px" }}
                                        >
                                            {producto.descripcion}
                                        </Paragraph>
                                        
                                        <div style={{ marginBottom: "12px" }}>
                                            <Tag color="blue">{producto.marca}</Tag>
                                            <Tag color="green">{producto.subcategoria}</Tag>
                                        </div>
                                        
                                        <Paragraph strong style={{ fontSize: "18px", color: "#ff3b3b" }}>
                                            ${producto.precio.toLocaleString()}
                                        </Paragraph>
                                        
                                        <Paragraph 
                                            style={{ 
                                                color: producto.existencias > 0 ? "#52c41a" : "#f5222d",
                                                fontWeight: "500"
                                            }}
                                        >
                                            {producto.existencias > 0 ? 
                                                `Disponible (${producto.existencias})` : 
                                                "Agotado"}
                                        </Paragraph>
                                    </div>
                                    
                                    <Link 
                                        to={`/product/${producto.categoryId}/${producto.id}`}
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
                                            disabled={producto.existencias <= 0}
                                        >
                                            {producto.existencias > 0 ? "Ver detalles" : "No disponible"}
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

export default ProductBrand;