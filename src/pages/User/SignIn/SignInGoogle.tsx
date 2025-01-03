import React from 'react';
import Button from "antd/es/button";
import { signInWithPopup } from 'firebase/auth';
import {auth, provider} from "../../../firebase";
import {Divider, message} from "antd";
import {useAppDispatch} from "../../../hooks/storeHooks";
import {userEnter} from "../../../store/reducers/User";
import {IFirebaseUser} from "../../../type/User";
import {GoogleOutlined} from "@ant-design/icons";

const SignInGoogle = () => {
    const dispatch = useAppDispatch();

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);

            const user = result.user;
            const data = user.providerData[0];

            if (user) {
                dispatch(userEnter(data as IFirebaseUser))
            }
        } catch (error) {
            error && message.error(error.toString())
        }
    };

    return (
        <Button onClick={handleGoogleSignIn}>
            <GoogleOutlined />
            <Divider type="vertical"/>
            <article>By Google</article>
        </Button>
    );
};

export default SignInGoogle;
