import React, { useEffect } from 'react';
import Button from "antd/es/button";
import { signInWithRedirect, getRedirectResult, GoogleAuthProvider } from 'firebase/auth';
import { auth, provider } from "../../../firebase";
import { Divider, message } from "antd";
import { useAppDispatch } from "../../../hooks/storeHooks";
import { userEnter } from "../../../store/reducers/User";
import { IFirebaseUser } from "../../../type/User";
import { GoogleOutlined } from "@ant-design/icons";

const SignInGoogle = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const checkRedirectResult = async () => {
            try {
                const result = await getRedirectResult(auth);
                console.log('Redirect result:', result);
                console.log('Current location:', window.location.href); // Логирование текущего URL

                if (result) {
                    const user = result.user;
                    const data = user.providerData[0];
                    dispatch(userEnter(data as IFirebaseUser));

                    localStorage.setItem("user", JSON.stringify(user));
                } else {
                    console.log('No result from getRedirectResult');
                }
            } catch (error) {
                console.error('Error fetching redirect result:', error);
                message.error('Ошибка при аутентификации с Google.');
            }
        };

        if (window.location.href.includes('?')) {
            checkRedirectResult();
        }
    }, [dispatch]);

    const handleGoogleSignIn = async () => {
        try {
            await signInWithRedirect(auth, provider);
        } catch (error) {
            error && message.error(error.toString());
        }
    };

    return (
        <Button style={{width: "100%"}} onClick={handleGoogleSignIn}>
            <GoogleOutlined />
            <Divider type="vertical" />
            <article>Sign in By Google</article>
        </Button>
    );
};

export default SignInGoogle;
