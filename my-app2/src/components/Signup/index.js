import React, { useState } from 'react';
import { withRouter }  from 'react-router-dom';
import './styles.scss';
import AuthWrapper from './../AuthWrapper';

import {auth, handleUserProfile } from './../../firebase/utils';

import FormInput from './../forms/FormInput';
import Button from './../forms/Button';


const Signup = props => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState('');

    const reset = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]); //default to empty array
    }

    const handleFormSubmit = async event => {
        event.preventDefault(); //prevent from posting to itself and force reload

        if ( password !== confirmPassword ) {
            const err = ['Passwords Don\'t match'];
            setErrors(err);
            return;
        }

        try {

            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await handleUserProfile(user, { displayName } );
            reset();
            props.history.push('/');
        } 
        catch (err) {
            console.log(err);
        }
    }

     

        const configAuthWrapper = {
            headline: 'Signup'
        };

        return (
            <AuthWrapper { ...configAuthWrapper }>

                    <div className = "formWrap">

                        {/* Will check and output any errors */}
                        {errors.length > 0 && (  
                            <ul>
                                {errors.map( (err, index) => {
                                    return (
                                        <li key = {index}>
                                            {err}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}

                        <form onSubmit={handleFormSubmit} >
                        {displayName}
                        <FormInput 
                            type="text"
                            name="displayName"
                            value={displayName}
                            placeholder="Full Name"
                            handleChange={e => setDisplayName(e.target.value)}
                        />

                        <FormInput 
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            handleChange={e => setEmail(e.target.value)}
                        />

                        <FormInput 
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            handleChange={e => setPassword(e.target.value)}
                        />

                        <FormInput 
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            handleChange={e => setConfirmPassword(e.target.value)}
                        />

                        <Button type="submit">
                            Register
                        </Button>
                        </form>
                    </div>
            </AuthWrapper>
        );
    }


export default withRouter(Signup);