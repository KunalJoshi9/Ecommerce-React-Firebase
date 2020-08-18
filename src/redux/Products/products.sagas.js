import {takeLatest, pull, all, call} from 'redux-saga/effects'
import productsTypes from './product.types'
import {handleAddProduct} from './products.helpers'
import {auth} from './../../firebase/utils'

export function* addProduct({payload : {
    productCategory,
    productName,
    productThumbnail,
    productPrice
}}){

    try{
        const timestamp = new Date();

        yield handleAddProduct({
            productCategory,
            productName,
            productThumbnail,
            productPrice, 
            productAdminUserUID:  auth.currentUser.uid,
            createdDate: timestamp
        });
    }catch(err){
        console.log(err);
    }

} 

export function* onAddProductStart() {
    yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export default function* userSagas(){
    yield all([
        call(onAddProductStart)
    ]);
}