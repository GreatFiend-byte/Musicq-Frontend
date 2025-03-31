import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Tag, Select, Skeleton, Tooltip } from 'antd';
import Button from '../../../../ComponentsUI/Button';
import { InfoCircleOutlined } from '@ant-design/icons';

const CURRENCY_BEACON_API_KEY = import.meta.env.VITE_CURRENCY_BEACON_API_KEY;

const CurrencyConverter = ({ precio }) => {
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
    const [lastUpdate, setLastUpdate] = useState(() => {
        const savedUpdate = localStorage.getItem('lastRatesUpdate');
        return savedUpdate ? new Date(savedUpdate) : null;
    });
    const [isUserInteracting, setIsUserInteracting] = useState(false);
    const [isTabVisible, setIsTabVisible] = useState(true);
    const pollingRef = useRef(null);
    const abortControllerRef = useRef(null);

    const fetchRates = useCallback(async () => {
        if (isUserInteracting || !isTabVisible) return;

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        
        const abortController = new AbortController();
        abortControllerRef.current = abortController;
        
        try {
            setIsLoadingRates(true);
            
            const response = await fetch(
                `https://api.currencybeacon.com/v1/latest?api_key=${CURRENCY_BEACON_API_KEY}&base=MXN`,
                { signal: abortController.signal }
            );

            const data = await response.json();
            
            if (data.response?.rates) {
                const newRates = data.response.rates;
                const updateTime = new Date();
                
                setExchangeRates(newRates);
                setLastUpdate(updateTime);
                setCurrencyError(null);
                
                localStorage.setItem('lastExchangeRates', JSON.stringify(newRates));
                localStorage.setItem('lastRatesUpdate', updateTime.toISOString());
            }
        } catch (error) {
            if (error.name !== 'AbortError') {
                const savedRates = localStorage.getItem('lastExchangeRates');
                if (savedRates) {
                    setExchangeRates(JSON.parse(savedRates));
                    setCurrencyError(`Usando tasas almacenadas - ${error.message}`);
                }
            }
        } finally {
            setIsLoadingRates(false);
            const interval = isTabVisible ? 30000 : 120000;
            pollingRef.current = setTimeout(fetchRates, interval);
        }
    }, [isUserInteracting, isTabVisible]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            const isVisible = document.visibilityState === 'visible';
            setIsTabVisible(isVisible);
            
            if (isVisible && pollingRef.current) {
                clearTimeout(pollingRef.current);
                fetchRates();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        fetchRates();

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (pollingRef.current) clearTimeout(pollingRef.current);
            if (abortControllerRef.current) abortControllerRef.current.abort();
        };
    }, [fetchRates]);

    useEffect(() => {
        if (selectedCurrency && precio && exchangeRates) {
            const rate = exchangeRates[selectedCurrency];
            if (rate && !isNaN(rate)) {
                setConvertedPrice((precio * rate).toFixed(2));
                setCurrencyError(null);
            } else {
                setCurrencyError(`Tasa no disponible para ${selectedCurrency}`);
            }
        }
    }, [precio, exchangeRates, selectedCurrency]);

    const handleCurrencyChange = (value) => {
        setIsUserInteracting(true);
        setSelectedCurrency(value);
        localStorage.setItem('preferredCurrency', value);
        setTimeout(() => setIsUserInteracting(false), 2000);
    };

    const handleRefreshRates = () => {
        if (pollingRef.current) clearTimeout(pollingRef.current);
        fetchRates();
    };

    const currencyOptions = [
        { value: 'USD', label: 'Dólar Estadounidense (USD)' },
        { value: 'EUR', label: 'Euro (EUR)' },
        { value: 'GBP', label: 'Libra Esterlina (GBP)' },
        { value: 'JPY', label: 'Yen Japonés (JPY)' },
        { value: 'CAD', label: 'Dólar Canadiense (CAD)' },
        { value: 'AUD', label: 'Dólar Australiano (AUD)' },
        { value: 'MXN', label: 'Peso Mexicano (MXN)', disabled: true },
    ];

    const popularCurrencies = ['USD', 'EUR', 'GBP'];
    const showPopularCurrencies = exchangeRates && !currencyError;

    return (
        <>
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
                            {currency}: {(precio * exchangeRates[currency]).toFixed(2)}
                        </Tag>
                    ))}
                    {lastUpdate && (
                        <Tooltip title="Actualizar tasas ahora">
                            <Button 
                                type="text" 
                                icon={<InfoCircleOutlined />} 
                                onClick={handleRefreshRates}
                            />
                        </Tooltip>
                    )}
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
                        style={{ width: '180px' }}
                        disabled={!!currencyError}
                        onFocus={() => setIsUserInteracting(true)}
                        onBlur={() => setIsUserInteracting(false)}
                        showSearch
                        optionFilterProp="label"
                        placeholder="Selecciona divisa"
                    />
                    {convertedPrice && (
                        <span style={{ fontSize: "18px", color: "#333", fontWeight: "500" }}>
                            {convertedPrice} {selectedCurrency}
                        </span>
                    )}
                </div>
            ) : (
                <Tag color="orange">Esperando tasas de cambio...</Tag>
            )}
        </>
    );
};

export default CurrencyConverter;