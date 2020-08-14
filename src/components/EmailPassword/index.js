import React, {Component, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import './styles.scss';
import { resetPasswordStart, resetUserState } from './../../redux/User/user.actions'
import AuthWrapper from './../AuthWrapper'
import FormInput from './../forms/FormInput'
import Button from './../forms/Button'
import {useHistory} from 'react-router-dom'


const mapState = ({user}) => ({
    resetPasswordSucess: user.resetPasswordSucess,
    userErr: user.userErr
});

const EmailPassword = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {resetPasswordSucess, userErr} = useSelector(mapState);
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if(resetPasswordSucess){
            dispatch(resetUserState());
            history.push('/login');
        }
    }, [resetPasswordSucess]);

    useEffect(() => {
        if(Array.isArray(userErr) && userErr.length>0){
            setErrors(userErr);
        }
    }, [userErr]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPasswordStart({email}));
    };


        const configAuthWrapper = {
                headline: 'Email Password'
        };

        return(
            <AuthWrapper {...configAuthWrapper}>
                <div className="formWrap">

                    {errors.length > 0 &&  (
                        <ul>
                            {
                                errors.map((err, index) => {
                                    return (
                                        <li key = {index}>
                                            {err}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    )}

                    <form onSubmit={handleSubmit}> 
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={e => setEmail(e.target.value)}
                    />

                    <Button type="submit">
                        Email Password
                    </Button>
                    </form>
                </div>
            </AuthWrapper>
        );
}

export default EmailPassword;