import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './styles.scss';
import { auth } from './../../firebase/utils';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';

const initialState = {
    email: '',
    errors: []
};

class EmailPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        };

        //passes the data to handleChange
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (e) {
        const { name, value } = e.target;

        //update state with email value
        this.setState({
            [name]: value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const { email } = this.state;
        const config = {
            // TODO: Pass with hosted link when deploying
            url: 'http://localhost:3001/login' //Link user goes to after clicking password reset link in email
        };

        try {
            await auth.sendPasswordResetEmail(email, config)
                .then( () => {
                    //Otherwise Redirect would override the current location in the history stack
                    this.props.history.push('/login'); 
                })
                .catch( () => {
                     const err = ['E-mail not found. Please try again.'];
                     this.setState({
                        errors: err
                     })
                });
        }
        catch {
            //console.log(err);
        }

    }
    
    render() {
        
        const { email, errors } = this.state;


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
                    <form onSubmit={this.handleSubmit}>
                        <FormInput 
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={this.handleChange}
                        />

                        <Button type = "submit">
                                    Request password
                        </Button>
                    </form>

                </div>
            </AuthWrapper>
        );
    }

}

export default withRouter(EmailPassword);