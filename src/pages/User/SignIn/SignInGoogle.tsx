import React, {useEffect} from 'react';
import Button from "antd/es/button";
import {signInWithRedirect, getRedirectResult, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {auth, provider} from "../../../firebase";
import {Divider, message} from "antd";
import {useAppDispatch} from "../../../hooks/storeHooks";
import {GoogleOutlined} from "@ant-design/icons";
import {userEnter} from "../../../store/reducers/User";
import {IFirebaseUser} from "../../../type/User";

const SignInGoogle = () => {
    const dispatch = useAppDispatch();

    const handleGoogleSignIn = async () => {
        await signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);

                if (credential) {
                    const token = credential.accessToken;
                    const user = result.user.providerData[0];

                    dispatch(userEnter(user as IFirebaseUser))
                }

            }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    };

    return (
        <Button style={{width: "100%"}} onClick={handleGoogleSignIn}>
            <GoogleOutlined/>
            <Divider type="vertical"/>
            <article>Sign in By Google</article>
        </Button>
    );
};

export default SignInGoogle;
