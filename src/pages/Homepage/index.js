import React from 'react';
import Directory from './../../components/Directory';
import { withRouter } from 'react-router';
import './styles.scss';

const Homepage = props => {
    return (
        <section className = "homepage">
            <Directory />
        </section>
    );
};

export default Homepage;