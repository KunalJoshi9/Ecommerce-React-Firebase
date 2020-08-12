import React from 'react';
import Header from './../components/Header'
import Footer from './../components/Footer'

function MainLayout(props) {
    return (
        <div>
            <Header/>
            <div className="main">
                {props.children}
            </div>
            <Footer/>
        </div>
    );
}

export default MainLayout;