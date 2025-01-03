import React, {useEffect, useState} from 'react';
import styles from './signIn.module.css';
import {Col, Form, Input, message, Row, Space} from "antd";
import Button from "antd/es/button";
import SignInGoogle from "./SignInGoogle";
import {useForm} from "antd/es/form/Form";
import {useAppSelector} from "../../../hooks/storeHooks";
import {useNavigate} from "react-router-dom";
import {HOME_ROUTE} from "../../../utils/const";

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
                setFooterHeight(footerElement.offsetHeight );
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
        <div style={{ height: `calc(100vh - ${headerHeight}px - ${footerHeight}px)` }} className={styles.Main}>
            <Row className={styles.Wrapper}>
                <Col span={24}>
                    <Form
                        style={{marginTop: 14}}
                        form={form}
                        name="basic"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        layout="horizontal"
                        initialValues={{remember: true}}
                        onFinish={onFormFinish}
                        onFinishFailed={onFormFinishFailed}
                    >

                        <Form.Item label="User name" name="username">
                            <Input/>
                        </Form.Item>

                        <Form.Item label="Password" name="password">
                            <Input/>
                        </Form.Item>

                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                                <Button htmlType="button" onClick={onFormClearClick}>
                                    Clear
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>

                    <Space direction="vertical">
                        <SignInGoogle />
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export default Login;
