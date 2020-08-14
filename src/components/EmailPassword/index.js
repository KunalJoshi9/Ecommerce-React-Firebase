import React, {Component, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import './styles.scss';
import { resetPassword, resetAllAuthForms } from './../../redux/User/user.actions'
import AuthWrapper from './../AuthWrapper'
import FormInput from './../forms/FormInput'
import Button from './../forms/Button'
import {withRouter} from 'react-router-dom'


const mapState = ({user}) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    resetPasswordError: user.resetPasswordError
});

const EmailPassword = props => {
    const {resetPasswordError, resetPasswordSuccess} = useSelector(mapState);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if(resetPasswordSuccess){
            dispatch(resetAllAuthForms());
            props.history.push('/login');
        }
    }, [resetPasswordSuccess]);

    useEffect(() => {
        if(Array.isArray(resetPasswordError) && resetPasswordError.length>0){
            setErrors(resetPasswordError);
        }
    }, [resetPasswordSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword({email}));
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

export default withRouter(EmailPassword);