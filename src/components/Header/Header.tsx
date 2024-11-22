import React from 'react';
import {Divider, Space} from "antd";
import Button from "antd/es/button";
import {useNavigate} from "react-router-dom";
import {HOME_ROUTE, SIGN_IN_ROUTE} from "../../utils/const";
import {LoginOutlined} from "@ant-design/icons";

const Header = () => {
    const navigate = useNavigate();


    return (
        <div style={{
            display: 'flex',
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 14,
            marginBottom: 24,
            boxShadow: "0 0 4px 4px rgba(0, 0, 0, 0.15)",
        }}>
            <Button onClick={() => navigate(HOME_ROUTE)} type={"text"}>Мила фильмдерінің тізімі 🙈</Button>
            {/*<Space direction="horizontal">
                <Button onClick={() => navigate(SIGN_IN_ROUTE)} type="default"><LoginOutlined /></Button>
            </Space>*/}
            <div>
                <Divider dashed/>
            </div>
        </div>
    );
};

export default Header;