import React, { useContext } from 'react';
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
export default function Login() {
    const [state] = useContext(AppContext);
  
    return (
      <div className="cstm_container_v-centered container-fluid d-flex align-items-center">
        <div className="w-100">
          <BackHome />
          <Card>
            <div className="cstm_form-icon  align-self-center mb-3">
              <KeyIcon size="72px" />
            </div>
            <Form
              action={{ type: 'login' }}
              bottomMessage={
                <p className={`text-center text-secondary p-3 ${state.theme.textClass}`}>
                  Don’t have an account? <Link to="/register">Sign up here!</Link>
                </p>
              }
            />
          </Card>
        </div>
      </div>
    );
  }
  