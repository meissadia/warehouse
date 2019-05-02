import React from 'react';
import { isEmpty } from 'lodash';

import '../styles/Errors.css';

/**
 * Render error messages
 * @param errors [[String | Any]] Assumes array of string messages but custom types can be used by passing a custom `draw` function.
 * @param dismiss [Function] Callback to dismiss errors.
 * @param draw [Function] Custom render method.
**/
const Errors = ({
    errors, // List of strings (or any with custom `draw`)
    dismiss, // Callback to clear errors
    draw, // Custom draw method
}) => {
    if (draw) return draw({ errors, dismiss }); // Handoff to custom renderer
    if (isEmpty(errors)) return null; // Hide component

    return (
        <div className='container'>
            <header>
                <h2 className='title'>Errors</h2>
                <p className='close' onClick={dismiss} >x</p>
            </header>
            <ul className='errors' >
                {errors.map((e) => <li className='error' key={e}>{e}</li>)}
            </ul>
        </div>
    )
}


export default Errors;