import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import BackHome from '../Components/utilities/back-home.js';
import Card from '../Components/layout/card.js';
import { AppContext } from '../global-state';
import KeyIcon from '../Components/icons/key-icon';
import Form from '../Components/journey/form';


/**
 * @function Login - React view for Login
 * @returns {Object} - React component object
 */

const Register = () => {
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
        body {
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 95vh;
            margin: 0 auto;
            flex-direction: column;
        }

        textarea {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            margin: 16px 0;
            width: 90%;
        }

        .button {
            width: 120px;
            height: 40px;
            background-color: rgb(72, 70, 70);
            color: white;
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }

        .button:hover {
            box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
        }`;

        document.head.appendChild(style);

        const script = document.createElement('script');
        script.textContent = `function init() {
        document.getElementById("config").style.display = "none";
        document.getElementById("submit").style.display = "none";
        document.getElementById("config_label").style.display = "none";
        const truuthKYCWebSdk = document.getElementById('kycComponent');
        truuthKYCWebSdk.init(JSON.parse(document.getElementById("config").value));
    }`
        document.body.appendChild(script);

        const eventScript = document.createElement('script');
        eventScript.textContent = `
    function onEventHandler(event) {
        console.log("Event Information -> type: " + event.detail.type + 
" tenant: " + event.detail.tenant + " verificationId: " + event.detail.verificationId +
" timestamp: " + event.detail.timestamp + (event.detail.body ? " body: " + JSON.stringify(event.detail.body) : ""));      
    }`

        document.body.appendChild(eventScript);

        const externalScript = document.createElement('script');
        externalScript.type = 'module';
        externalScript.src = "https://cdn.truuth.id/kyc/websdk/1.0/truuth-kyc-websdk.js";
        document.body.appendChild(externalScript);
    }, []);

    const htmlContent = `
        < h3 id = "config_label" > SDK Initialization Config </h2>
            <textarea required=true rows="25" cols="100" id="config" value="1234">
                {
                    "tenant":"websdk",
                "token":"eyJraWQiOiJrcENPaDd1MnJ5T3pBZEdPcWFDWUttNlIzTmY5dldwOEJPTzBaRmNySzB3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwYmU0YjY1Yy0xNmY4LTQ1NzItOGJhMy1mMzgxZjZkYmEzOWYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTIuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTJfS2RFU2dCbkk2IiwiY2xpZW50X2lkIjoiNjY0NGY3Z2NyZWc2ZW0yNW1xcG9hMXYxamwiLCJvcmlnaW5fanRpIjoiNWQ2NDQ1MmYtYWViMy00YThiLWIwYWItMGQ4NmI0OWZlNmU0IiwiZXZlbnRfaWQiOiI4MTU4YTVkYy1hYTQ3LTRiOWQtOWUzNC0xM2Y3MzBiYzk3NjEiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjg3MTUwOTQxLCJleHAiOjE2ODcxNTQ1NDAsImlhdCI6MTY4NzE1MDk0MSwianRpIjoiMmUwN2JkZWUtOGM0NS00ZWViLWJiZWQtMDUxM2VlODk5ZTFkIiwidXNlcm5hbWUiOiIwYmU0YjY1Yy0xNmY4LTQ1NzItOGJhMy1mMzgxZjZkYmEzOWYifQ.VCQU6PDoF1FajweAg3KUiX76T2fbwf1nrjFY3gVeWcf-BIjpkadDrRW7ShAXgzqdrIALPOPB6jhthWHpToQyhSpT-_EL1C-ISUc1W7BDGelN7Jq_-Fn6POGT6Bq94gPEOxzX6tcV_rv70vKVEOJsx3ku5-X4nq2tTDcVozjcERi7wEn3qvKc-90oYlnTTCyaJ4VcjeMk7RDwqYg3x7lrxyhnrkwUsrOyOjIlnP6PVM2UYFfdMI_KTBd5sAFVJziPuXssFG-9rPHayfVAPB70K2f0wXosb1rTMBRzvQJvnYIsBdlW6raWPQfCLwsqkX9G2Got_emhP0QUMcG8jcp6Ag",
                "apiUrl":"https://portal.api.au.truuth.id/kyc/",
                "width":"100%",
                "height":"100%",
                "config":{
                    "email":"websdk@gmail.com",
                "externalRefId":"viva max",
                "givenName":"aries",
                "familyName":"ramos",
                "mobileNumber":"091234567890",
                "dateOfBirth":"1990-03-24",
                "gender":"M",
                "options":{
                    "channel":"web",
                "timeout":45,
                "sanctionsAndPepCheckRequired":false,
                "businessVerificationRequired":false,
                "currentAddressProofingRequired":false
                       }
                    }
                 }
            </textarea>
            <button class="button" id="submit" onclick="init()">Submit</button>
                    <truuth-kyc id="kycComponent" onevent="onEventHandler(event)"></truuth-kyc>
    `;

    return (
        <div dangerouslySetInnerHTML={{ __html:htmlContent}}></div>
    )
}

export default Register;
