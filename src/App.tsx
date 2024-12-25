// React imports
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { useState } from 'react';
// Antd imports
import type { MenuProps, MenuTheme } from 'antd';
import { Button, Menu, Switch } from 'antd';
import { AlipayOutlined, DashboardOutlined } from '@ant-design/icons';
// App imports
import './App.css'
import Languages from './pages/languages'
import Dashboard from './pages/dashboard'
import Globalization from './pages/globalization';
import Labels from './pages/labels';
import ImportExport from './pages/import-export';


export default function App() {
  const [menuTheme, setMenuTheme] = useState<MenuTheme>('dark');
  const [collapsed, setCollapsed] = useState(false);
  const [currentRoute, setCurrentRoute] = useState('dashboard');

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
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>
    },
    {
      key: 'i18n',
      icon: <AlipayOutlined />,
      label: <Link to="/i18n" >Globalization</Link>,
      children: [
        { key: 'languages', label: <Link to="/languages-manager" >Languages</Link> },
        { key: 'labels', label: <Link to="/labels" >Labels</Link> },
        { key: 'importExport', label: <Link to="/import-export" >Import / Export</Link> }
      ]
    }
  ];

  return (
    <>
      <Router>
        <div className="AdminConsole">

          {/* MENU */}
          <div className={"AdminConsole__menuWrapper AdminConsole__menuWrapper--" + menuTheme}>
            <Button color="default" variant="text" onClick={toggleCollapsed} style={{ width: '100%', height: '48px' }}>
              <img src="./src/assets/react.svg"/>
            </Button>

            <Menu
              mode="inline"
              inlineCollapsed={collapsed}
              theme={menuTheme}
              items={items}
              onClick={onClick}
              selectedKeys={[currentRoute]}
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
      </Router>

    </>
  )
}
