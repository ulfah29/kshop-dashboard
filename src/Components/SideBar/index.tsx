import { useState } from 'react';
import "./Sidebar.css";
import {
    CalendarOutlined,
    MailOutlined,
} from '@ant-design/icons';
import { Menu, Switch } from 'antd';
import type { GetProp, MenuProps } from 'antd';
import { useDashboardContext } from '../../context';
import { PAGE_ACTIVE } from '../../context/initial-context';
  
type MenuTheme = GetProp<MenuProps, 'theme'>;

type MenuItem = GetProp<MenuProps, 'items'>[number];

function SideBar() {
    const { dispatch } = useDashboardContext();
    const [mode, setMode] = useState<'vertical' | 'inline'>('inline');
    const [theme, setTheme] = useState<MenuTheme>('light');

    const onChangeActivePage = (page: string) => {
      dispatch({ type: 'SET_PAGE_ACTIVE', payload: page });
    }

    const changeMode = (value: boolean) => {
        setMode(value ? 'vertical' : 'inline');
    };

    const changeTheme = (value: boolean) => {
        setTheme(value ? 'dark' : 'light');
    };

    const items: MenuItem[] = [
      {
        key: PAGE_ACTIVE[0],
        icon: <MailOutlined />,
        label: 'Home',
        onClick: () =>  onChangeActivePage(PAGE_ACTIVE[0]),
      },
      {
        key: PAGE_ACTIVE[1],
        icon: <CalendarOutlined />,
        label: 'Merchandise Lists',
        onClick: () =>  onChangeActivePage(PAGE_ACTIVE[1]),
      },
    ];

    return (
        <div className='sidebarWrapper'>
            <div className='switchWrapper'>
                <Switch onChange={changeMode} /> Change Mode
            </div>
            <div className='switchWrapper'>
                <Switch onChange={changeTheme} /> Change Style
            </div>
            <Menu
                style={{ width: 256 }}
                defaultSelectedKeys={[PAGE_ACTIVE[0]]}
                defaultOpenKeys={['sub1']}
                mode={mode}
                theme={theme}
                items={items}
            />
        </div>
  );
}

export default SideBar;
