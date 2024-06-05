import React, { useContext } from 'react';
import { Link } from "react-router-dom";


import kpmgLogo from "../assets/KPMG_logo.png";
import truuthLogo from "../assets/truuth_logo.svg";
import '../App.css';

export default function Home() {
    const login = () => {

    }
    const authButton = (
        <Link className="button" to={'login'} onClick={login}>Login</Link>
    );

    const pageTitle = (
        <>
            <h1 className="page-title">KPMG Truuth POC</h1>
            <p className="page-subtitle">Authenticate using Truuth Biopass or register a new user with Truuth KYC</p>
        </>
    );


    return (
        <div className="App">
            <header className="App-header">
                <img className="kpmg-logo" src={kpmgLogo} alt="kpmg logo" />
                <img className="truuth-logo" src={truuthLogo} alt="truuth logo" />
                {/*<img className="truuth-logo" src={truuthLogo} alt="truuth logo"/>*/}
                <div className="auth-window">
                    {pageTitle}
                    <div className="buttons">
                        {authButton}
                        <p className="btn-break">or</p>
                        <Link className="button" to={'register'}>Register</Link>
                    </div>
                </div>

            </header>
        </div>
    );
}