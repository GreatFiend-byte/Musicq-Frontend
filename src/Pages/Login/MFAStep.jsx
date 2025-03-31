import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';

const { Title, Text } = Typography;

const MFAStep = ({ email, onVerify, onResend, onBack }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            console.log('Verificando código:', values.code);
            await onVerify(values.code);
        } catch (error) {
            form.setFields([{
                name: 'code',
                errors: [error]
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setResendLoading(true);
        try {
            await onResend();
            message.success('Se ha enviado un nuevo código');
            
            // Iniciar cuenta regresiva de 60 segundos para nuevo reenvío
            setCountdown(60);
            const timer = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } catch (error) {
            message.error(error.message || 'Error al reenviar el código');
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div style={{
            maxWidth: 400,
            margin: '0 auto',
            color: '#fff',
            backgroundColor: '#000',
            padding: '30px',
            borderRadius: '8px'
        }}>
            <Title level={3} style={{ color: '#fff', textAlign: 'center', marginBottom: 24 }}>
                Verificación en Dos Pasos
            </Title>
            <Text style={{ display: 'block', marginBottom: 24, color: '#fff' }}>
                Hemos enviado un código de verificación a <strong>{email}</strong>.
                Por favor ingrésalo a continuación.
            </Text>

            <Form form={form} onFinish={handleSubmit}>
                <Form.Item
                    name="code"
                    rules={[
                        { required: true, message: 'Por favor ingresa el código' },
                        { pattern: /^\d{6}$/, message: 'El código debe tener 6 dígitos' }
                    ]}
                >
                    <Input
                        placeholder="Código de 6 dígitos"
                        maxLength={6}
                        style={{
                            textAlign: 'center',
                            letterSpacing: 8,
                            fontSize: 18,
                            height: 40
                        }}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={loading}
                        style={{ height: 40 }}
                    >
                        Verificar
                    </Button>
                </Form.Item>
            </Form>

            <div style={{ textAlign: 'center', marginTop: 16 }}>
                <Button
                    type="link"
                    onClick={handleResend}
                    loading={resendLoading}
                    disabled={countdown > 0}
                    style={{ color: '#fff', marginRight: 16 }}
                >
                    {countdown > 0 ? `Reenviar en ${countdown}s` : 'Reenviar código'}
                </Button>
                <Button
                    type="link"
                    onClick={onBack}
                    style={{ color: '#fff' }}
                >
                    Volver al login
                </Button>
            </div>
        </div>
    );
};

export default MFAStep;