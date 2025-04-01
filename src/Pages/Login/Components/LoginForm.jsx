import React, { useContext, useState, useEffect } from 'react';
import { Form, Input, message, Divider } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../ComponentsUI/Button.jsx';
import Checkbox from '../../../ComponentsUI/Checkbox.jsx';
import { loginUser, requestPasswordReset, loginWithGoogle,verifyMFACode, resendMFACode} from '../../../services/authService';
import { AuthContext } from '../../../../context/AuthContext';
import ReCAPTCHA from 'react-google-recaptcha';
import { GoogleOutlined } from '@ant-design/icons';
import MFAStep from '../MFAStep';

const LoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const { login, logout } = useContext(AuthContext);
  const [mfaStep, setMfaStep] = useState(false);
  const [mfaData, setMfaData] = useState(null);

  logout();

  // Efecto para manejar mensajes de la ventana de Google
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;

      if (event.data.type === 'google-auth-success') {
        login(event.data.user);
        message.success('Inicio de sesión con Google exitoso');
        navigate('/');
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [login, navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await loginUser(values.username, values.password);

      if (response.mfaRequired) {
        setMfaData({
          email: response.email,
          tempToken: response.tempToken
        });
        setMfaStep(true);
      } else {
        login(response.user, response.token);
        message.success('Inicio de sesión exitoso');
        navigate('/');
      }
    } catch (error) {
      message.error(error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  // Función para verificar el código MFA
  const handleVerifyMFACode = async (code) => {
    try {
      if (!mfaData) {
        throw new Error('Datos de verificación no encontrados');
      }

      const response = await verifyMFACode({
        email: mfaData.email,
        code,
        tempToken: mfaData.tempToken
      });

      // Limpiar estado MFA después de verificación exitosa
      setMfaData(null);
      setMfaStep(false);

      login(response.user, response.token);
      message.success('Verificación exitosa');
      navigate('/');
    } catch (error) {
      console.error('Error en verificación MFA:', error);
      throw new Error(error.response?.data?.message || 'Código inválido o expirado');
    }
  };

  // Función para reenviar el código MFA
  const handleResendMFACode = async () => {
    try {
      await resendMFACode(mfaData.email, mfaData.tempToken);
      message.success('Nuevo código enviado');
    } catch (error) {
      message.error(error);
    }
  };

  const handleBackToLogin = () => {
    setMfaStep(false);
    setMfaData(null);
  };


  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const { url } = await loginWithGoogle();
      navigate(url);
      //window.location.href = url;
    } catch (error) {
      message.error(error.message || 'Error al iniciar sesión con Google');
      setGoogleLoading(false);
    }
  };

  const handleResetPassword = async (values) => {
    if (!recaptchaToken) {
      message.error('Por favor completa el reCAPTCHA');
      return;
    }

    try {
      setLoading(true);
      await requestPasswordReset(values.email, recaptchaToken);
      message.success('Se ha enviado un correo para restablecer tu contraseña');
      setShowResetForm(false);
    } catch (error) {
      message.error(error.message || 'Error al solicitar recuperación de contraseña');
    } finally {
      setLoading(false);
    }
  };

  const onRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '0px',
      minHeight: '0vh',
      backgroundColor: '#fff'
    }}>
      <div style={{
        backgroundColor: '#000',
        width: '350px',
        padding: '30px',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        {mfaStep && mfaData ? (
          <MFAStep
            email={mfaData.email}  // Usar mfaData en lugar de mfaEmail
            onVerify={handleVerifyMFACode}
            onResend={handleResendMFACode}
            onBack={handleBackToLogin}
          />
        ) : (

        !showResetForm ? (
        <>
          <h2 style={{ color: '#fff', marginBottom: '24px' }}>Login</h2>
          <Button
            type="primary"
            icon={<GoogleOutlined />}
            onClick={handleGoogleLogin}
            loading={googleLoading}
            style={{
              width: '100%',
              marginBottom: '16px',
              backgroundColor: '#DB4437',
              borderColor: '#DB4437'
            }}
          >
            Continuar con Google
          </Button>

          <Divider style={{ color: '#fff', borderColor: '#444' }}>o</Divider>

          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            style={{ textAlign: 'left' }}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Por favor ingresa tu nombre de usuario' }
              ]}
            >
              <Input
                placeholder="Nombre de usuario"
                style={{ borderRadius: '4px' }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Por favor ingresa tu contraseña' }
              ]}
            >
              <Input.Password
                placeholder="Password"
                style={{ borderRadius: '4px' }}
              />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" style={{ marginBottom: '12px' }}>
              <Checkbox style={{ color: '#fff' }}>Recordarme</Checkbox>
            </Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
              <Button style={{ flex: 1, backgroundColor: '#333', borderColor: '#333' }}>
                <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>
                  Registar
                </Link>
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ flex: 1, backgroundColor: '#333', borderColor: '#333' }}
                loading={loading}
              >
                Iniciar Sesion
              </Button>
            </div>
          </Form>
          <Button
            type="link"
            style={{ color: '#fff', marginTop: '12px' }}
            onClick={() => setShowResetForm(true)}
          >
            ¿Olvidaste tu contraseña?
          </Button>
        </>
        ) : (
        <>
          <h2 style={{ color: '#fff', marginBottom: '24px' }}>Recuperar Contraseña</h2>
          <Form
            onFinish={handleResetPassword}
            layout="vertical"
            style={{ textAlign: 'left' }}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Por favor ingresa tu correo electrónico' },
                { type: 'email', message: 'Ingresa un correo electrónico válido' }
              ]}
            >
              <Input
                placeholder="Correo electrónico"
                style={{ borderRadius: '4px' }}
              />
            </Form.Item>

            <div style={{ margin: '12px 0' }}>
              {import.meta.env.VITE_SITE_KEY_DE_RECAPTCHA ? (
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_SITE_KEY_DE_RECAPTCHA}
                  onChange={onRecaptchaChange}
                  hl="es"
                />
              ) : (
                <p style={{ color: 'red' }}>Error: reCAPTCHA no configurado</p>
              )}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <Button
                style={{ flex: 1, backgroundColor: '#333', borderColor: '#333' }}
                onClick={() => setShowResetForm(false)}
              >
                Cancelar
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ flex: 1, backgroundColor: '#333', borderColor: '#333' }}
                loading={loading}
              >
                Enviar
              </Button>
            </div>
          </Form>
        </>
        )
        )}
      </div>
    </div>
  );
};

export default LoginForm;
