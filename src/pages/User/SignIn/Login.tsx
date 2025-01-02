import React, { useEffect, useState } from 'react';
import styles from './signIn.module.css';
import {Col, Row} from "antd";
import Button from "antd/es/button";

const Login = () => {
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

    return (
        <div style={{ height: `calc(100vh - ${headerHeight}px - ${footerHeight}px)` }} className={styles.Main}>
            <Row className={styles.Wrapper}>
                <Col span={24}>
                    <Button>Sign in by Google</Button>
                    <Button>Sign in by GitHub</Button>
                </Col>
            </Row>
        </div>
    );
};

export default Login;
