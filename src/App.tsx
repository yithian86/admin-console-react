// React imports
import { Route, Routes, Link, useLocation } from 'react-router-dom'
import { useState } from 'react';
// Antd imports
import type { MenuProps, MenuTheme } from 'antd';
import { Button, Menu, Switch } from 'antd';
import { AlipayOutlined, DashboardOutlined } from '@ant-design/icons';
// App imports
import './App.css'
import Languages from './pages/i18n-languages'
import Dashboard from './pages/dashboard'
import Globalization from './pages/i18n-globalization';
import Labels from './pages/i18n-labels-manager';
import ImportExport from './pages/i18n-import-export';


export default function App() {
  // Hook from react-router-dom to get current path
  const location = useLocation();
  // State to manage the current route
  const getCurrentLocation = () => {
    console.debug(location.pathname);
    return location.pathname;
  }
  const [currentRoute, setCurrentRoute] = useState(getCurrentLocation());
  // State to manage the theme of the menu
  const [menuTheme, setMenuTheme] = useState<MenuTheme>('dark');
  // State to manage the collapse of the menu
  const [collapsed, setCollapsed] = useState(false);


  const changeTheme = (value: boolean) => {
    setMenuTheme(value ? 'dark' : 'light');
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrentRoute(e.key);
  };

  const items: MenuProps['items'] = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>
    },
    {
      key: '/i18n',
      icon: <AlipayOutlined />,
      label: <Link to="/i18n" >Globalization</Link>,
      children: [
        { key: '/languages-manager', label: <Link to="/languages-manager" >Languages</Link> },
        { key: '/labels', label: <Link to="/labels" >Labels</Link> },
        { key: '/import-export', label: <Link to="/import-export" >Import / Export</Link> }
      ]
    }
  ];

  return (
    <div className="AdminConsole">

      {/* MENU */}
      <div className={"AdminConsole__menuWrapper AdminConsole__menuWrapper--" + menuTheme}>
        <Button color="default" variant="text" onClick={toggleCollapsed} style={{ width: '100%', height: '48px' }}>
          <img src="./src/assets/react.svg" />
        </Button>

        <Menu
          mode="inline"
          inlineCollapsed={collapsed}
          theme={menuTheme}
          items={items}
          onClick={onClick}
          selectedKeys={[currentRoute]}
          defaultOpenKeys={['/i18n']}
          getPopupContainer={(node) => node.parentNode as HTMLElement}
        />
      </div>

      {/* CONTENT */}
      <div className="AdminConsole__content">
        <div className="AdminConsole__header">
          {/* Theme switch */}
          <Switch
            checked={menuTheme === 'dark'}
            onChange={changeTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
        </div>

        {/* Routes */}
        <div className='AdminConsole__page'>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/i18n" element={<Globalization />} />
            <Route path="/languages-manager" element={<Languages />} />
            <Route path="/labels" element={<Labels />} />
            <Route path="/import-export" element={<ImportExport />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
