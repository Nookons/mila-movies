import React, {useEffect, useState} from 'react';
import styles from './signIn.module.css';
import {Avatar, Col, Form, Input, message, Row, Space} from "antd";
import Button from "antd/es/button";
import SignInGoogle from "./SignInGoogle";
import {useForm} from "antd/es/form/Form";
import {useAppSelector} from "../../../hooks/storeHooks";
import {useNavigate} from "react-router-dom";
import {HOME_ROUTE} from "../../../utils/const";
import Password from "antd/es/input/Password";
import logo from "../../../assets/Logo.svg"

const Login = () => {
    const navigate = useNavigate();
    const user = useAppSelector(state => state.user.user)
    const [headerHeight, setHeaderHeight] = useState(0);
    const [footerHeight, setFooterHeight] = useState(0);

    useEffect(() => {
        const headerElement = document.getElementById("Header");
        const footerElement = document.getElementById("Footer");

        const updateHeights = () => {
            if (headerElement) {
                const headerStyles = getComputedStyle(headerElement);
                //const headerPadding = parseInt(headerStyles.paddingTop) + parseInt(headerStyles.paddingBottom);
                setHeaderHeight(headerElement.offsetHeight);
            }

            if (footerElement) {
                const footerStyles = getComputedStyle(footerElement);
                //const footerPadding = parseInt(footerStyles.paddingTop) + parseInt(footerStyles.paddingBottom);
                setFooterHeight(footerElement.offsetHeight);
            }
        };

        updateHeights();
    }, []);

    const [form] = useForm();

    const onFormFinish = (values: any) => {
        // todo handle form finish
    };

    const onFormFinishFailed = (errorInfo: any) => {
        // todo handle form finish fail
    };

    const onFormClearClick = () => {
        form.resetFields();
    };

    if (user) {
        navigate(HOME_ROUTE)
    }


    return (
        <div style={{height: `calc(94dvh - ${headerHeight}px - ${footerHeight}px)`}} className={styles.Main}>
            <Row className={styles.Wrapper}>
                <Col span={24}>
                    <Form
                        style={{marginTop: 14}}
                        form={form}
                        name="basic"
                        wrapperCol={{span: 24}}
                        layout="horizontal"
                        initialValues={{remember: true}}
                        onFinish={onFormFinish}
                        onFinishFailed={onFormFinishFailed}
                    >
                        <Space>
                            <Avatar src={logo} />
                            <h3>Welcome to Mila movies</h3>
                        </Space>

                        <Form.Item label={<span>User name</span>} name="username">
                            <Input/>
                        </Form.Item>

                        <Form.Item label={<span>Password</span>} name="password">
                            <Password/>
                        </Form.Item>

                        <Form.Item wrapperCol={{span: 24}}>
                            <Space style={{width: "100%", justifyContent: "flex-end"}}>
                                <Button type="primary" htmlType="submit">
                                    Sign in
                                </Button>
                                <Button htmlType="button" onClick={onFormClearClick}>
                                    Create new account
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>


                    <Space style={{width: "100%"}} direction="vertical">
                        <SignInGoogle/>
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export default Login;
