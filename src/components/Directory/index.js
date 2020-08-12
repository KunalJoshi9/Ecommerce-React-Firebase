import React from 'react';
import ShopMens from '../../assets/shopMens.jpg';
import ShopWomen from '../../assets/shopWomens.jpg';
import './styles.scss';


function index(props) {
    return (
        <div className="directory">
        <div className="wrap">
            <div className="item" style={{
                backgroundImage : `url(${ShopWomen})`
                }}>
            <a>
                Shop Womens
            </a>
            </div>
            <div className="item" style={{
                backgroundImage : `url(${ShopMens})`
            }}>
            <a>
                Shop Mens
            </a>    
            </div>
        </div>
        </div>
    );
}

export default index;