import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, Menu, Badge, Avatar, Input, Space } from 'antd';
import { DownOutlined, ShoppingCartOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import LogoEmpresa from '../assets/Logo_Empresa.png';
import Button from '../ComponentsUI/Button.jsx';
import { AuthContext } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { getCategorias } from '../services/productService';
import { getBrands, getSubcategories } from '../services/adminService';

const { Search } = Input;

const Header = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const [categorias, setCategorias] = useState([]);
  const [brands, setBrands] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCategorias();
        setCategorias(data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };
    fetchCategorias();

    const fetchBrands = async () => {
      try {
        const data = await getBrands();
        setBrands(data);
      } catch (error) {
        console.error('Error al obtener las marcas:', error);
      }
    };
    fetchBrands();

    const fetchSubcategories = async () => {
      try {
        const data = await getSubcategories();
        setSubcategories(data);
      } catch (error) {
        console.error('Error al obtener las subcategorías:', error);
      }
    };
    fetchSubcategories();
  }, []);

  const handleLogout = () => {
    logout();
    clearCart();
    navigate('/');
  };

  const menuCategorias = (
    <Menu>
      {categorias.map((categoria) => (
        <Menu.Item key={categoria.id}>
          <Link to={`/category/${categoria.id}`}>{categoria.nombre}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  const menuMarcas = (
    <Menu>
      {brands.map((brand) => (
        <Menu.Item key={brand.id}>
          <Link to={`/product/${brand.nombre}`}>{brand.nombre}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  const menuAdministrar = (
    <Menu>
      <Menu.Item key="1"><Link to="/admin/users">Usuarios</Link></Menu.Item>
      <Menu.Item key="2"><Link to="/admin/instruments">Instrumentos</Link></Menu.Item>
      <Menu.Item key="3"><Link to="/admin/brands">Marcas</Link></Menu.Item>
      <Menu.Item key="4"><Link to="/admin/subcategories">Subcategorías</Link></Menu.Item>
    </Menu>
  );

  const menuUsuario = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to="/profile">Mi Perfil</Link>
      </Menu.Item>
      <Menu.Item key="2" danger onClick={handleLogout}>
        Cerrar Sesión
      </Menu.Item>
    </Menu>
  );

  return (
    <header style={{
      backgroundColor: '#fff',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      height: '80px'
    }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: '70px' }}>
        <Link to="/">
          <img
            src={LogoEmpresa}
            alt="MusicQ - Instrumentos Musicales"
            style={{ height: '50px' }}
          />
        </Link>

      </div>

      <nav style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Dropdown overlay={menuCategorias}>
          <Button type="text" style={{ fontWeight: 500 }}>
            Categorías <DownOutlined />
          </Button>
        </Dropdown>

        <Dropdown overlay={menuMarcas}>
          <Button type="text" style={{ fontWeight: 500 }}>
            Marcas <DownOutlined />
          </Button>
        </Dropdown>

        <Link to="/car">
          <Badge count={cartItems.length} size="small">
            <Button 
              type="text" 
              icon={<ShoppingCartOutlined style={{ fontSize: '20px' }} />}
              style={{ fontWeight: 500 }}
            >
              Carrito
            </Button>
          </Badge>
        </Link>

        {isLoggedIn && user?.rol === 'admin' && (
          <Dropdown overlay={menuAdministrar}>
            <Button type="text" style={{ fontWeight: 500 }}>
              Administrar <DownOutlined />
            </Button>
          </Dropdown>
        )}

        <Button type="text" style={{ fontWeight: 500 }}>
          <Link to="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>
            Contacto
          </Link>
        </Button>

        {!isLoggedIn ? (
          <Space>
            <Button type="default">
              <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
                Iniciar sesión
              </Link>
            </Button>
            <Button type="primary" style={{ backgroundColor: '#ff3b3b', borderColor: '#ff3b3b' }}>
              <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>
                Registrarse
              </Link>
            </Button>
          </Space>
        ) : (
          <Dropdown overlay={menuUsuario}>
            <Button type="text" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Avatar 
                size="small" 
                style={{ backgroundColor: '#ff3b3b' }}
                icon={<UserOutlined />}
              />
              <span style={{ fontWeight: 500 }}>
                {user?.nombre || user?.username}
              </span>
              <DownOutlined />
            </Button>
          </Dropdown>
        )}
      </nav>
    </header>
  );
};

export default Header;