import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import Button from './../forms/Button';
import AuthWrapper from './../AuthWrapper'
import FormInput from './../../components/forms/FormInput'
import {emailSignInStart, googleSignInStart} from './../../redux/User/user.actions'
import './styles.scss'


const mapState = ({user}) => ({
    currentUser: user.currentUser
});

const SignIn = props => {
    const {currentUser} = useSelector(mapState);
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if(currentUser){
            resetForm();
            history.push("/");
        }
    }, [currentUser])

    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        //dispatch(signInUser({email, password})); redux action
        dispatch(emailSignInStart({ email, password })); //saga
    }

    const handleGoogleSignIn = () => {
        //dispatch(signInWithGoogle());
        dispatch(googleSignInStart());
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
                            <Button onClick={handleGoogleSignIn}>
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

export default SignIn;
