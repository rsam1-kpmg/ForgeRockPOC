/*
 * forgerock-sample-web-react
 *
 * constants.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

export const AM_URL = process.env.REACT_APP_AM_URL;
export const APP_URL = window.location.origin;
export const API_URL = process.env.REACT_APP_API_URL;
// Yes, the debugger boolean is intentionally reversed
export const DEBUGGER = process.env.REACT_APP_DEBUGGER_OFF === 'true' ? false : true;
export const JOURNEY_LOGIN = process.env.REACT_APP_JOURNEY_LOGIN;
export const JOURNEY_REGISTER = process.env.REACT_APP_JOURNEY_REGISTER;
export const WEB_OAUTH_CLIENT = process.env.REACT_APP_WEB_OAUTH_CLIENT;
export const REALM_PATH = process.env.REACT_APP_REALM_PATH;
export const SESSION_URL = `${AM_URL}json/realms/root/sessions`;
