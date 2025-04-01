import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Image, InputNumber, message, Divider, Tag, Rate, Select, Empty, Skeleton } from 'antd';
import Layout, { Content } from "../../ComponentsUI/Layout.jsx";
import Row from "../../ComponentsUI/Row.jsx";
import Col from "../../ComponentsUI/Col.jsx";
import Card from "../../ComponentsUI/Card.jsx";
import Typography, { Title, Paragraph } from "../../ComponentsUI/Typography.jsx";
import Button from "../../ComponentsUI/Button.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { getInstrumentoById } from "../../services/productService.js";

const apiUrl = import.meta.env.VITE_API_URL;
const CURRENCY_BEACON_API_KEY = import.meta.env.VITE_CURRENCY_BEACON_API_KEY;

const ProductDetail = () => {
    const { categoryId, instrumentId } = useParams();
    const [instrumento, setInstrumento] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [exchangeRates, setExchangeRates] = useState(() => {
        const savedRates = localStorage.getItem('lastExchangeRates');
        return savedRates ? JSON.parse(savedRates) : null;
    });
    const [selectedCurrency, setSelectedCurrency] = useState(() => {
        return localStorage.getItem('preferredCurrency') || 'USD';
    });
    const [convertedPrice, setConvertedPrice] = useState(null);
    const [currencyError, setCurrencyError] = useState(null);
    const [isLoadingRates, setIsLoadingRates] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(null);
    const [isUserInteracting, setIsUserInteracting] = useState(false);
    const pollingRef = useRef(null);
    const abortControllerRef = useRef(null);
    const navigate = useNavigate();

    // Función para obtener tasas (ahora con manejo de interacción)
    const fetchRates = useCallback(async () => {
        if (isUserInteracting) {
            console.log('Pausando actualizaciones durante interacción del usuario');
            return;
        }

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        
        const abortController = new AbortController();
        abortControllerRef.current = abortController;
        
        try {
            setIsLoadingRates(true);
            
            const response = await fetch(
                `https://api.currencybeacon.com/v1/latest?api_key=${CURRENCY_BEACON_API_KEY}&base=MXN`,
                {
                    signal: abortController.signal,
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
                }
            );

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            
            if (data.response?.rates) {
                setExchangeRates(data.response.rates);
                localStorage.setItem('lastExchangeRates', JSON.stringify(data.response.rates));
                setLastUpdate(new Date());
                setCurrencyError(null);
            } else {
                throw new Error(data.meta?.info || 'Formato de respuesta inválido');
            }
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Error obteniendo tasas:', error);
                setCurrencyError(error.message);
                
                const savedRates = localStorage.getItem('lastExchangeRates');
                if (savedRates) {
                    setExchangeRates(JSON.parse(savedRates));
                    setCurrencyError(`Usando tasas almacenadas - ${error.message}`);
                }
            }
        } finally {
            setIsLoadingRates(false);
            
            // Ajustar el intervalo basado en la visibilidad de la pestaña
            const interval = document.visibilityState === 'visible' ? 30000 : 120000;
            pollingRef.current = setTimeout(fetchRates, interval);
        }
    }, [isUserInteracting]);

    // Efecto para manejar el polling
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                // Si la pestaña se vuelve visible, actualizar inmediatamente
                if (pollingRef.current) {
                    clearTimeout(pollingRef.current);
                }
                fetchRates();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        fetchRates(); // Iniciar el primer fetch

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (pollingRef.current) {
                clearTimeout(pollingRef.current);
            }
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [fetchRates]);

    // Obtener el instrumento
    useEffect(() => {
        const fetchInstrumento = async () => {
            try {
                setLoading(true);
                const data = await getInstrumentoById(categoryId, instrumentId);
                setInstrumento(data);
            } catch (error) {
                console.error("Error obteniendo el instrumento:", error);
                message.error("Error al cargar el producto");
            } finally {
                setLoading(false);
            }
        };

        fetchInstrumento();
    }, [categoryId, instrumentId]);

    // Calcular precio convertido
    useEffect(() => {
        if (selectedCurrency && instrumento && exchangeRates) {
            const rate = exchangeRates[selectedCurrency];
            if (rate && !isNaN(rate)) {
                setConvertedPrice((instrumento.precio * rate).toFixed(2));
                setCurrencyError(null);
            } else {
                setCurrencyError(`Tasa no disponible para ${selectedCurrency}`);
            }
        }
    }, [instrumento, exchangeRates, selectedCurrency]);

    // Manejar cambio de divisa con protección de interacción
    const handleCurrencyChange = (value) => {
        setIsUserInteracting(true);
        setSelectedCurrency(value);
        localStorage.setItem('preferredCurrency', value);
        
        // Restablecer después de un breve período
        setTimeout(() => setIsUserInteracting(false), 2000);
    };

    const handleQuantityChange = (value) => {
        const newValue = Math.max(1, Math.min(10, value));
        setQuantity(newValue);
        if (newValue !== value) {
            message.info("La cantidad debe estar entre 1 y 10 unidades");
        }
    };

    const handleBuyClick = () => {
        if (!instrumento) return;
        
        if (instrumento.existencias === 0) {
            message.error("Este producto está actualmente agotado");
            return;
        }

        if (instrumento.existencias < quantity) {
            message.error(`Solo quedan ${instrumento.existencias} unidades disponibles`);
            return;
        }

        navigate("/car", {
            state: {
                product: instrumento,
                categoryId,
                instrumentId,
                quantity,
            },
        });
    };

    // Opciones de moneda
    const currencyOptions = [
        { value: 'USD', label: 'USD ($)' },
        { value: 'EUR', label: 'EUR (€)' },
        { value: 'GBP', label: 'GBP (£)' },
        { value: 'JPY', label: 'JPY (¥)' },
        { value: 'CAD', label: 'CAD ($)' },
        { value: 'AUD', label: 'AUD ($)' },
        { value: 'MXN', label: 'MXN ($)', disabled: true },
    ];

    // Mostrar monedas populares
    const popularCurrencies = ['USD', 'EUR', 'GBP'];
    const showPopularCurrencies = exchangeRates && !currencyError;

    if (loading) {
        return (
            <Layout style={{ backgroundColor: "#f8f8f8" }}>
                <Content style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}>
                    <Card>
                        <Row gutter={[48, 24]}>
                            <Col xs={24} md={12}>
                                <Skeleton.Image active style={{ width: '100%', height: '400px' }} />
                            </Col>
                            <Col xs={24} md={12}>
                                <Skeleton active paragraph={{ rows: 6 }} />
                            </Col>
                        </Row>
                    </Card>
                </Content>
            </Layout>
        );
    }

    if (!instrumento) {
        return (
            <Layout style={{ backgroundColor: "#f8f8f8" }}>
                <Content style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
                    <Empty description="No se encontró el instrumento solicitado" />
                    <Button 
                        type="primary" 
                        style={{ marginTop: "16px" }}
                        onClick={() => navigate(-1)}
                    >
                        Volver atrás
                    </Button>
                </Content>
            </Layout>
        );
    }

    return (
        <Layout style={{ backgroundColor: "#f8f8f8" }}>
            <Content style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}>
                <Card
                    style={{
                        marginBottom: "40px",
                        borderRadius: "12px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                    }}
                >
                    <Row gutter={[48, 24]}>
                        <Col xs={24} md={12}>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Image
                                    src={`${apiUrl}${instrumento.imagen}`}
                                    alt={instrumento.nombre}
                                    style={{ 
                                        maxWidth: "100%", 
                                        height: "auto",
                                        maxHeight: "500px",
                                        borderRadius: "8px",
                                        objectFit: "contain"
                                    }}
                                    preview={{
                                        maskClassName: 'custom-image-mask',
                                    }}
                                />
                            </div>
                        </Col>
                        <Col xs={24} md={12}>
                            <div style={{ marginBottom: "16px" }}>
                                <Tag color="blue" style={{ fontSize: "14px", padding: "4px 8px" }}>
                                    {instrumento.marca}
                                </Tag>
                                <Tag color="green" style={{ fontSize: "14px", padding: "4px 8px" }}>
                                    {instrumento.subcategoria}
                                </Tag>
                                {lastUpdate && (
                                    <Tag color="geekblue" style={{ marginLeft: '8px' }}>
                                        Actualizado: {lastUpdate.toLocaleTimeString()}
                                    </Tag>
                                )}
                            </div>
                            
                            <Title level={2} style={{ marginBottom: "16px" }}>
                                {instrumento.nombre}
                            </Title>
                            
                            <div style={{ marginBottom: "16px" }}>
                                <Rate 
                                    disabled 
                                    defaultValue={4.5} 
                                    allowHalf 
                                    style={{ color: "#ff3b3b", fontSize: "18px" }} 
                                />
                                <span style={{ marginLeft: "8px", color: "#666" }}>(24 reseñas)</span>
                            </div>
                            
                            <div style={{ marginBottom: '24px' }}>
                                <Paragraph style={{ 
                                    fontSize: "24px", 
                                    fontWeight: "bold",
                                    color: "#ff3b3b",
                                    marginBottom: "8px"
                                }}>
                                    ${instrumento.precio.toLocaleString()} MXN
                                </Paragraph>
                                
                                {currencyError && (
                                    <Tag color="red" style={{ marginBottom: '8px' }}>
                                        {currencyError}
                                    </Tag>
                                )}
                                
                                {showPopularCurrencies && (
                                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
                                        {popularCurrencies.map(currency => (
                                            <Tag 
                                                key={currency} 
                                                color={selectedCurrency === currency ? 'blue' : 'default'}
                                                onClick={() => handleCurrencyChange(currency)}
                                                style={{ cursor: 'pointer', padding: '4px 8px' }}
                                            >
                                                {currency}: {(instrumento.precio * exchangeRates[currency]).toFixed(2)}
                                            </Tag>
                                        ))}
                                    </div>
                                )}
                                
                                {isLoadingRates ? (
                                    <Skeleton.Input active size="small" style={{ width: 200 }} />
                                ) : exchangeRates ? (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                        <Select
                                            size="small"
                                            value={selectedCurrency}
                                            onChange={handleCurrencyChange}
                                            options={currencyOptions}
                                            style={{ width: '120px' }}
                                            disabled={!!currencyError}
                                            onFocus={() => setIsUserInteracting(true)}
                                            onBlur={() => setIsUserInteracting(false)}
                                        />
                                        {convertedPrice && (
                                            <span style={{ 
                                                fontSize: "18px",
                                                color: "#333",
                                                fontWeight: "500"
                                            }}>
                                                {convertedPrice} {selectedCurrency}
                                            </span>
                                        )}
                                    </div>
                                ) : null}
                            </div>
                            
                            {/* Resto del código de renderizado... */}
                        </Col>
                    </Row>
                </Card>
            </Content>
        </Layout>
    );
};

export default ProductDetail;
