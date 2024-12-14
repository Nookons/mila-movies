import React from 'react';
import {Divider} from "antd";

const Footer = () => {
    return (
        <div style={{boxShadow: "0 0 8px rgba(0,0,0, 0.25)", padding: 14, marginTop: 84}}>
            <Divider>This site powered by <a href="#">Nookon</a></Divider>
        </div>
    );
};

export default Footer;