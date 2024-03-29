import { useState, useEffect, useContext } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import {AppstoreOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons'
import {Context} from '../context'
import axios from 'axios';
import {useRouter} from 'next/router'
import {toast} from 'react-toastify'
import SubMenu from 'antd/lib/menu/SubMenu';

// Menu.Item
const { Item } = Menu; 

const TopNav = () => {
    const [current, setCurrent] = useState('');

    const {state, dispatch} = useContext(Context)

    const { user} = state;

    const router = useRouter()
    
    // Note: browser is deprecated. Not sure yet how to refactor.
    useEffect(() => {
      process.browser && setCurrent(window.location.pathname)
    }, [process.browser && window.location.pathname])
    
    const logout = async () => {
        dispatch({type: "LOGOUT"});
        window.localStorage.removeItem('user')
        const {data} = await axios.get('/api/logout')
        toast(data.message)
        router.push('/login')
    }

    return (
        <Menu mode='horizontal' selectedKeys={[current]}>
            <Item key='/' onClick={(e) => setCurrent(e.key)} icon={<AppstoreOutlined />}>
                <Link href='/'>
                    <a>App</a>
                </Link>
            </Item>

            {user === null && (
                <>
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
                </>
            )}

            {user !== null && (
                <SubMenu icon={<UserOutlined />} title={user.name}>
                    <Item 
                        onClick={logout} 
                        icon={<LogoutOutlined />} 
                        className="float-right"
                >
                    Logout
                </Item>
                </SubMenu>
            )}
        </Menu>
    )
}

export default TopNav;