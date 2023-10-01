import React, { useEffect } from 'react';
import './styles.scss';

const Admin = props => {
    useEffect(() => {
        document.title = 'My Page Title';
    }, []);
    return (
        <div>
          
            <h1>
                My Admin
            </h1>
        </div>
    );
}


export default Admin;

