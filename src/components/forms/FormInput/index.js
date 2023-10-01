import React from 'react';
import './styles.scss';

const FormInput = ( { handleChange, label, ...otherProps }) => {
    return (
        <div className = "formRow">
            { label && ( //Render label, if we have one
                <label>
                    {label}
                </label>
            )}
            
            <input className = "formInput" onChange={handleChange} {...otherProps} /> 
        </div> //^ create event object when user input is entered
    );
}

export default FormInput;
