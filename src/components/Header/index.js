import React from 'react';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';
import './styles.scss';
import {auth} from './../../firebase/utils'

import logo from '../../assets/logo.png';

function index(props) {

    const { currentUser } = props;

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
                                <span onClick={() => auth.signOut()}>
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

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
});

export default connect(mapStateToProps, null)(index);