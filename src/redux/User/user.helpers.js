import {auth} from './../../firebase/utils'


export const handleResetPasswordAPI = (email) => {
    const config = {
        url: 'http://localhost:3000/login'
    }
    return new Promise((resolve, reject) => {
        try{
            auth.sendPasswordResetEmail(email, config)
                        .then(() => {
                            // dispatch({
                            //     type: userTypes.RESET_PASSWORD_SUCCESS,
                            //     payload: true
                            // });
                            resolve();
                        }).catch(() => {
                            const err = ['Email not found. Please try again'];
                            // dispatch({
                            //     type: userTypes.RESET_PASSWORD_ERROR,
                            //     payload: err
                            // });
                            reject(err);
                        });
        }catch(err){
            console.log(err);
        }
    })
}