import { useState, useEffect } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import {AppstoreOutlined, LoginOutlined, UserAddOutlined} from '@ant-design/icons'

// Menu.Item
const { Item } = Menu; 

const TopNav = () => {
    const [current, setCurrent] = useState('');
    
    //Note: browser is deprecated. Not sure yet how to refactor.
    useEffect(() => {
      process.browser && setCurrent(window.location.pathname)
    }, [process.browser && window.location.pathname])
    


    return (
        <Menu mode='horizontal' selectedKeys={[current]}>
            <Item key='/' onClick={(e) => setCurrent(e.key)} icon={<AppstoreOutlined />}>
                <Link href='/'>
                    <a>App</a>
                </Link>
            </Item>
            <Item key='/login' onClick={(e) => setCurrent(e.key)} icon={<LoginOutlined />}>
                <Link href='/login'>
                    <a>login</a>
                </Link>
            </Item>
            <Item key='/register' onClick={(e) => setCurrent(e.key)} icon={<UserAddOutlined />}>
                <Link href='/register'>
                    <a>register</a>
                </Link>
            </Item>
        </Menu>
    )
}

export default TopNav;