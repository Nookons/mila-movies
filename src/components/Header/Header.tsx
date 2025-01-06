import React, {useEffect, useState} from 'react';
import {Col, Row, Space, Dropdown, Button, MenuProps, Avatar} from "antd";
import {useNavigate, useSearchParams} from "react-router-dom";
import {HOME_ROUTE, SIGN_IN} from "../../utils/const";
import {
    DownOutlined,
    GlobalOutlined,
    LoginOutlined,
    LogoutOutlined,
    SettingOutlined,
    UserOutlined
} from "@ant-design/icons";
import Logo from '../../assets/Logo.svg';
import {getLanguage, LanguageCookiesType, setLanguageCookies} from "../../utils/Cookies/Language";
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";
import {setNewLanguage} from "../../store/reducers/Language";

import styles from './Header.module.css';
import {userLeave} from "../../store/reducers/User";
import Menu from "./Menu/Menu";

const Header = () => {
    const navigate = useNavigate();
    const distpatch = useAppDispatch();
    const [language, setLanguage] = useState<LanguageCookiesType>(getLanguage());
    const [scrollPosition, setScrollPosition] = useState(0);

    const user = useAppSelector(state => state.user.user)

    const handleLanguageChange = (newLanguage: LanguageCookiesType) => {
        setLanguage(newLanguage);  // Обновляем состояние языка
        setLanguageCookies(newLanguage);  // Сохраняем новый язык в cookies
        distpatch(setNewLanguage(newLanguage));
    };


    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);  // Обновляем scrollPosition при прокрутке
            const isHomePage = window.location.pathname === '/' || window.location.pathname === '/home';

            if (isHomePage) {
                localStorage.setItem("scroll_offset", window.scrollY.toString())
            }
        };

        window.addEventListener('scroll', handleScroll);  // Добавляем обработчик прокрутки

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const items_lang: MenuProps['items'] = [
        {
            key: '1',
            label: 'English',
            onClick: () => handleLanguageChange('en'),
            extra: '🇬🇧',
            style: language === 'en' ? {fontWeight: 'bold', color: "rgba(0,33,255,0.66)"} : {},
        },
        {
            key: '2',
            label: 'Russian',
            onClick: () => handleLanguageChange('ru'),
            extra: '🇷🇺',
            style: language === 'ru' ? {fontWeight: 'bold', color: "rgba(0,33,255,0.66)"} : {},
        },
    ];

    const userLogOut = async () => {
        distpatch(userLeave())
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <span>{user ? user.displayName : "unknown"}</span>,
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: 'Profile',
            icon: <UserOutlined />,
            extra: '⌘P',
        },
        {
            key: '3',
            label: 'Settings',
            icon: <SettingOutlined/>,
            extra: '⌘S',
        },
        {
            key: '4',
            label: 'Logout',
            onClick: userLogOut,
            icon: <LogoutOutlined />,
            extra: '⌘L',
        },
    ];

    return (
        <>
            <Row
                id={"Header"}
                className={scrollPosition > 100 ? styles.Scrolled : styles.Scrolled_hide}
                justify="space-between"
            >
                <Col span={12}>
                    <Space style={{cursor: "pointer"}} onClick={() => navigate(HOME_ROUTE)}>
                        <img style={{maxWidth: 35}} src={Logo} alt="Logo"/>
                        <span>Mila movies</span>
                    </Space>
                </Col>
                <Col>
                    <Space wrap={true}>
                        <Dropdown menu={{items: items_lang}}>
                            <Button onClick={(e) => e.preventDefault()}>
                                <GlobalOutlined/> {language}
                            </Button>
                        </Dropdown>
                        {!user
                            ? <Button onClick={() => navigate(SIGN_IN)}><LoginOutlined/></Button>
                            :
                            <Dropdown menu={{items}}>
                                <Button onClick={(e) => e.preventDefault()}>
                                    <UserOutlined />
                                </Button>
                            </Dropdown>
                        }
                    </Space>
                </Col>
            </Row>
            <Row
                id={"Header"}
                className={styles.Main}
                justify="space-between"
            >
                <Col span={12}>
                    <Space style={{cursor: "pointer"}} onClick={() => navigate(HOME_ROUTE)}>
                        <img style={{maxWidth: 35}} src={Logo} alt="Logo"/>
                        <span>Mila movies</span>
                    </Space>
                </Col>
                <Col>
                    <Space wrap={true}>
                        <Dropdown menu={{items: items_lang}}>
                            <Button onClick={(e) => e.preventDefault()}>
                                <GlobalOutlined/> {language}
                            </Button>
                        </Dropdown>
                        {!user
                            ? <Button onClick={() => navigate(SIGN_IN)}><LoginOutlined/></Button>
                            :
                            <Dropdown menu={{items}}>
                                <Button onClick={(e) => e.preventDefault()}>
                                    <UserOutlined />
                                </Button>
                            </Dropdown>
                        }
                    </Space>
                </Col>
                <Col span={24}>
                    <Menu />
                </Col>
            </Row>
        </>
    );
};

export default Header;
