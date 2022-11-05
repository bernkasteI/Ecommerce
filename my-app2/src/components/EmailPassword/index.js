import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import './styles.scss';
import { auth } from './../../firebase/utils';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';


const EmailPassword = props => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const config = {
                // TODO: Pass with hosted link when deploying
                url: 'http://localhost:3001/login' //Link user goes to after clicking password reset link in email
            };

            await auth.sendPasswordResetEmail(email, config)
                .then( () => {
                    //Otherwise Redirect would override the current location in the history stack
                    props.history.push('/login'); 
                })
                .catch( () => {
                     const err = ['E-mail not found. Please try again.'];
                     setErrors(err);
                });
        }
        catch {
            //console.log(err);
        }

    }

        const configAuthWrapper = {
            headline: 'Email Password'
        };

        return (
            <AuthWrapper {...configAuthWrapper}>
                <div className = "formWrap">

                    {errors.length > 0 && (
                        <ul>
                            {errors.map((e, index) => {
                                return (
                                    <li key = {index}>
                                        {e}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                    <form onSubmit={handleSubmit}>
                        <FormInput 
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            handleChange={e => setEmail(e.target.value)}
                        />

                        <Button type = "submit">
                                    Request password
                        </Button>
                    </form>

                </div>
            </AuthWrapper>
        );
    }

export default withRouter(EmailPassword);