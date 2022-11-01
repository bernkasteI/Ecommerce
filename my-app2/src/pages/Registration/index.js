import React, { Component } from 'react';
import './styles.scss';
import { withRouter } from 'react-router';

class Registration extends Component {
    render() {
        return (
            <div>
                <h1>
                    Registration Page
                </h1>
            </div>

        );
    }
}

export default withRouter(Registration);