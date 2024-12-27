import React from 'react';
import {Col, Divider, Row, Space} from "antd";
import Button from "antd/es/button";
import {useNavigate} from "react-router-dom";
import {HOME_ROUTE, SIGN_IN_ROUTE} from "../../utils/const";
import {LoginOutlined} from "@ant-design/icons";
import Logo from '../../assets/Logo.svg'

const Header = () => {
    const navigate = useNavigate();


    return (
        <Row style={{padding: 14, boxShadow: "2px 2px 4px rgba(0,0,0,0.25)"}} gutter={[16, 16]} justify="space-between">
            <Col span={4}>
                <Space style={{cursor: "pointer"}} onClick={() => navigate(HOME_ROUTE)}>
                    <img style={{maxWidth: 35}} src={Logo} alt=""/>
                    <span>Мила</span>
                </Space>
            </Col>
            <Col>
                <Button shape={"circle"}><LoginOutlined /></Button>
            </Col>
        </Row>
    );
};

export default Header;