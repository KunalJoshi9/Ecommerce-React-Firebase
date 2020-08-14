import userTypes from './user.types'
import {handleResetPasswordAPI} from './user.helpers'
import {takeLatest, call, all, put} from 'redux-saga/effects'
import {signInSuccess, signOutUserSuccess, userError, resetPasswordStart, resetPasswordSuccess} from './user.actions'
import { GoogleProvider, auth, handleUserProfile, getCurrentUser } from './../../firebase/utils'


export function* getSnapShotFromUserAuth(user, additionalData={}){
    try{
                    const userRef = yield call(handleUserProfile, { userAuth: user, additionalData });
                    const snapshot = yield userRef.get();
                    yield put(
                        signInSuccess({
                            id: snapshot.id,
                            ...snapshot
                        })
                    );    
    }catch(err){
        console.log(err);
    }
}
 
export function* emailSignIn({payload : {email, password}}){
    try {
        // await auth.signInWithEmailAndPassword(email, password);
        // dispatch another action which will be subscribed to in the SignIn comp
        // dispatch({
        //     type: userTypes.SIGN_IN_SUCCESS,
        //     payload: true
        // });

        // Instead of dispatch now, convert await to yield and use yield put
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapShotFromUserAuth(user);
        

    } catch (err) {
        console.log(err);
    }
}

export function* isUserAuthenticated(){
    try{
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        yield getSnapShotFromUserAuth(userAuth);
    }catch(err){

    }
}

export function* signOutUser(){
    try{
        yield auth.signOut();
        yield put (
            signOutUserSuccess()
            );
    }catch(err){

    }
}

export function* singUpUser({payload: {
    displayName,
    email,
    password,
    confirmPassword
}}){
     
    if (password !== confirmPassword) {
        const err = ['Passwords dont match'];
        yield put(userError(err));
        return;
    }

    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        const additionalData = {displayName};
        yield getSnapShotFromUserAuth(user, additionalData);
        //yield call(handleUserProfile, {userAuth: user, additionalData: { displayName }});
    } catch (err) {
        console.log(err);
    }
}

export function* resetPassword({payload : {email}}){
    const config = {
        url: 'http://localhost:3000/login'
    }
    try{
        yield call(handleResetPasswordAPI, email);
        yield put(
            resetPasswordSuccess()
        );
    }catch(err){
        yield put(
            userError(err)
        );
        console.log(err);
    }
}

export function* googleSignIn(){
    try{
        const {user} = yield auth.signInWithPopup(GoogleProvider)
        yield getSnapShotFromUserAuth(user);
       }catch(err){
           console.log(err);
       }
}

export function* onCheckUserSession(){
    yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignInStart() {
    yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* onSignOutUserStart(){
    yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}

export function* onSignupUserStart(){
    yield takeLatest(userTypes.SIGN_UP_USER_START, singUpUser);
}

export function* onresetPasswordStart(){
    yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword)
}

export function* onGoogleSignInStart(){
    yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn)
}
export default function* userSagas(){
    yield all([
        call(onEmailSignInStart), 
        call(onCheckUserSession), 
        call(onSignOutUserStart), 
        call(onSignupUserStart),
        call(onresetPasswordStart),
        call(onGoogleSignInStart)
    ]);
}