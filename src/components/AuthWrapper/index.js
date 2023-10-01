import React from 'react';
import './styles.scss';

const AuthWrapper = ({ headline, children }) => {
    return (
        // render headline only if passed in props
        <div className = "authWrapper">
            <div className = "wrap">
                
                {headline && <h2>{headline}</h2>} 

                <div className = "children">
                    {children && children}
                </div>

            </div>
        </div>

    );
}

export default AuthWrapper;