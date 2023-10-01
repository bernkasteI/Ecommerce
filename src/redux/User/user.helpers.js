import { auth} from '../../firebase/utils';

export const handleResetPasswordAPI = (email) => {

    const config = {
        // TODO: Pass with hosted link when deploying
        url: 'http://localhost:3001/login' //Link user goes to after clicking password reset link in email
    };

    return new Promise((resolve, reject) => {
    auth.sendPasswordResetEmail(email, config)
    .then( () => {
        resolve();
    })
    .catch( () => {
        const err = ['E-mail not found. Please try again.'];
        reject(err);
    });
    });
};