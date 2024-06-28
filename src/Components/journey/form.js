/*
 * forgerock-sample-web-react
 *
 * form.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import React, { useContext, useEffect, useState } from 'react';

import Loading from '../utilities/loading';
import { FRAuth, TokenManager, UserManager } from '@forgerock/javascript-sdk';
import Alert from "../Alert"
import Password from '../Password';
import Text from '../Text';
import Unknown from '../Unknown';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../global-state';
import Redirect from '../Redirect';


import kpmgLogo from "../../assets/KPMG_logo.png";
import truuthLogo from "../../assets/truuth_logo.svg";

const IdPMap = {
  'localAuthentication': {
    'logo': kpmgLogo,
    'name': 'KPMG Local Authn',
  },
  'Biopass': {
    'logo': truuthLogo,
    'name': 'Biopass',
  },
};

const IdPSelector = ({ callback }) => <>{
  callback.payload.output
  .find(({ name }) => name === 'providers')
  .value
  .map(({ provider }) =>
    <ul>
    <button class="btn btn-light w-100 text-start">
    <>
    <img width="48" src={IdPMap[provider].logo} alt={`${provider} logo`} />
    {`Continue with ${IdPMap[provider].name}`}
    </>
    </button>
    </ul>
  )
}</>
;


/**
 * @function Form - React component for managing the user authentication journey
 * @returns {Object} - React component object
 */

export default function Form() {
  const [step, setStep] = useState(null);
  const [isAuthenticated, setAuthentication] = useState(false);
  const [_, methods] = useContext(AppContext);
  const navigate = useNavigate();

   useEffect(() => {
       async function oauthFlow() {
         try {
            const tokens = await TokenManager.getTokens();
            console.log(tokens);
            const user = await UserManager.getCurrentUser();
            console.log(user);
            methods.setUser(user.name);
            methods.setEmail(user.email);
            methods.setAuthentication(true);

            navigate('/');
         } catch (err) {
           console.error(`Error: token request; ${err}`);
         }
       }
       if (isAuthenticated) {
         oauthFlow();
       }
     }, [isAuthenticated]);

   useEffect(() => {
     async function getStep() {
       try {
         const initialStep = await FRAuth.start();
         console.log(initialStep);
         setStep(initialStep);
       } catch (err) {
         console.error(`Error: request for initial step; ${err}`);
       }
     }
     getStep();
   }, []);


     function mapCallbacksToComponents(cb, idx) {
       const name = cb?.payload?.input?.[0].name;
        switch (cb.getType()) {
          case 'NameCallback':
            return <Text callback={cb} inputName={name} key='username' />;
          case 'PasswordCallback':
            return <Password callback={cb} inputName={name} key='password' />;
          case 'RedirectCallback':
            return <Redirect callback={cb} key='redirect' />;
          case 'SelectIdPCallback':
            return <IdPSelector callback={cb} key='idp-selector' />;
          default:
           // If current callback is not supported, render a warning message
           return <Unknown callback={cb} key={`unknown-${idx}`} />;
       }
     }

     if (!step) {
      return <Loading message="Checking your session ..." />;
      } else if (step.type === 'LoginSuccess') {
        return <Alert message="Success! You're logged in." type='success' />;
      } else if (step.type === 'Step') {
          return (
            <form
              className="cstm_form"
              onSubmit={(event) => {
                event.preventDefault();
                async function getStep() {
                  try {
                    const nextStep = await FRAuth.next(step);
                    if (nextStep.type === 'LoginSuccess') {
                      setAuthentication(true);
                    }
                    console.log(nextStep);
                    setStep(nextStep);
                  } catch (err) {
                    console.error(`Error: form submission; ${err}`);
                  }
                }
                getStep();
              }}
            >
              {step.callbacks.map(mapCallbacksToComponents)}
             <button className='btn btn-primary w-100' type='submit'>
                Sign In
             </button>
             </form>
         );
        
        } else {
          return <Alert message={step.payload.message} />;
        }
}
