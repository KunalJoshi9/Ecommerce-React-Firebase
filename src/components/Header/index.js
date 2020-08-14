import React from 'react';
import { Link } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import './styles.scss';
import {signOutUserStart} from './../../redux/User/user.actions'

import logo from '../../assets/logo.png';


const mapState = ({user}) => ({
    currentUser: user.currentUser
});

const Header = props => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(mapState);
    const signOut = () => {
        dispatch(signOutUserStart());
    }

    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="SimpleTut log"></img>
                    </Link>
                </div>

                <div className="callToActions">

                    {currentUser && (
                        <ul>
                             <li>
                                <Link to="/dashboard">
                                    My Account
                                </Link>
                            </li>
                            <li>
                                <span onClick={() => signOut()}>
                                    LogOut
                                </span>
                            </li>
                        </ul>
                    )}

                    {!currentUser && (
                        <ul>
                            <li>
                                <Link to="/registration">
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link to="/login">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    )}

                </div>
            </div>
        </header>
    );
}

Headers.defaultProps = {
    currentUser: null
}

export default Header;