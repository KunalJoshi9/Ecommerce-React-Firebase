import React, { Component, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom'
import Button from './../forms/Button';
import { signInWithGoogle, auth } from './../../firebase/utils'
import AuthWrapper from './../AuthWrapper'
import FormInput from './../../components/forms/FormInput'
import './styles.scss'

const SignIn = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(email, password);
            resetForm();
            props.history.push("/");
        } catch (err) {
            console.log(err);
        }
        //dispatch(emailSignInStart({ email, password }));
    }

    const handleGoogleSignIn = () => {
        //dispatch(googleSignInStart());
    }

    const configAuthWrapper = {
        headline: 'LogIn'
    };

    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="formWrap">
                <form onSubmit={handleSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={e => setEmail(e.target.value)}
                    />

                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />

                    <Button type="submit">
                        Login
                            </Button>

                    <div className="socialSignin">
                        <div className="row">
                            <Button onClick={signInWithGoogle}>
                                Sign in with Google
                                    </Button>
                        </div>
                    </div>

                    <div className="links">
                        <Link to="/recovery">
                            Reset Password
                                </Link>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    );
}

export default withRouter(SignIn);
