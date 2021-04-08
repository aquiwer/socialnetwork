import React from 'react'
import styles from './styles/Form.module.css'

export const FormCreator = Element => ({input, meta: {touched, error}, ...props}) => {

    const hasError = touched && error;

    return (

        <div className = {styles.formControl + " " + (hasError ? styles.error : "")} >
            <Element {...input}{...props} />
            { hasError && <span>{error} </span> }
        </div>

    );
};
