import React, {useEffect, useState} from 'react';
import {Col, Row, Space, Dropdown, Button, MenuProps} from "antd";
import {useNavigate, useSearchParams} from "react-router-dom";
import {HOME_ROUTE, SIGN_IN} from "../../utils/const";
import {GlobalOutlined, LoginOutlined} from "@ant-design/icons";
import Logo from '../../assets/Logo.svg';
import {getLanguage, LanguageCookiesType, setLanguageCookies} from "../../utils/Cookies/Language";
import {useAppDispatch} from "../../hooks/storeHooks";
import {setNewLanguage} from "../../store/reducers/Language";

import styles from './Header.module.css';

const Header = () => {
    const navigate = useNavigate();
    const distpatch = useAppDispatch();
    const [language, setLanguage] = useState<LanguageCookiesType>(getLanguage());
    const [scrollPosition, setScrollPosition] = useState(0);

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

    return (
        <Row
            id={"Header"}
            className={scrollPosition < 100 ? styles.Main : styles.Scrolled}
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
                    <Button onClick={() => navigate(SIGN_IN)}><LoginOutlined/></Button>
                </Space>
            </Col>
        </Row>
    );
};

export default Header;
