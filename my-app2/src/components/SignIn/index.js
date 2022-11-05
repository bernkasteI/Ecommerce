import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './styles.scss';

import { signInWithGoogle, auth } from './../../firebase/utils';

import AuthWrapper from './../AuthWrapper';

import FormInput from './../forms/FormInput';
import Button from './../forms/Button';

const SignIn = props => {
        //destructuring assignment syntax. 
    const [email, setEmail] = useState('');
        // We will now be able to use and access the state of the email, and can use setEmail to update the state
    const [password, setPassword] = useState('');
    
    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

   const handleSubmit = async e => {
        e.preventDefault();
     
        try {
            await auth.signInWithEmailAndPassword(email, password);
            resetForm();
            props.history.push('/');
        }
        catch {
            //console.log(err);
        }
    }


    const configAuthWrapper = {
        headline: 'Login'
    };
    return (

        <AuthWrapper { ...configAuthWrapper }>

                <div className ="formWrap">
                    <form onSubmit = {handleSubmit}>

                        <FormInput
                            type="email"
                            name="email"
                            value={email}
                            placeholder="E-mail"
                            handleChange={e => setEmail(e.target.value)}
                        />

                        <FormInput
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            handleChange={e => setPassword(e.target.value)}
                        />

                        <Button type = "submit">
                            LogIn
                        </Button>
                        <div className = "socialSignin">
                            <div className ="row">
                                <Button onClick = {signInWithGoogle}>
                                    Sign in with Google
                                </Button>
                            </div>
                        </div>

                        <div className="links">
                            <Link to ="/recovery">
                                Reset Password
                            </Link>
                        </div>
                    </form>
                    </div>
                
        </AuthWrapper>
    );
   }

export default withRouter(SignIn);