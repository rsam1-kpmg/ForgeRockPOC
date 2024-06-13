import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * @function Redirect - React component used for handling RedirectCallback
 * @param {Object} props - React props object passed from parent
 * @param {Object} props.callback - The callback object from AM
 * @returns {Object} - React component object
 */

export default function Redirect({ callback }) {
    const navigate = useNavigate();

    useEffect(() => {
        const redirectUrl = callback.getOutputByName('redirectUrl', '')
        console.log('redirect to: ', redirectUrl)
        if (redirectUrl) {
            window.location.href = redirectUrl
        } else {
            navigate('/error', {state: { message: 'Redirect URL not found' }})
        }
    }, [callback, navigate]);

    return null;
}