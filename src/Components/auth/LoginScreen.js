import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from "react-redux";
import { login, startLoginEmailPassword, startGoogleLogin } from '../../actions/auth';

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    if(state.uiError.loading){
        console.log(state.uiError.loading);
    }

    const [formValues, handleInputChange] = useForm({
        email: 'nando@gmail.com',
        password: '12345'
    });

    const {email, password} = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLoginEmailPassword(email, password));
    }

    const handleLoginGoogle = () => {
        dispatch(startGoogleLogin());
    }

    return (
        <>
            <h3 className="auth__tittle">Login</h3>
            <form onSubmit={handleLogin} className="animate__animated animate__fadeIn animate_faster">

                <input
                    type="text"
                    placeholder="email"
                    name="email"
                    className="auth__input"
                    value={email}
                    onChange={handleInputChange}
                    autoComplete="off"
                ></input>

                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                ></input>

                <button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={handleLogin}
                disabled={state.uiError.loading}
                >
                    Login
                </button>

                <div className="auth__social-network">
                    <p>Login with social networks</p>
                    <div 
                            className="google-btn"
                            onClick={ handleLoginGoogle }
                        >
                            <div className="google-icon-wrapper">
                                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                            </div>
                            <p className="btn-text">
                                <b>Sign in with google</b>
                            </p>
                        </div>
                <Link to="/auth/register" className="create__acount link">
                    Create new account
                </Link>
                </div>


            </form>
        </>
    )
}
