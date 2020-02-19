import React from 'react';
import { useDispatch } from 'react-redux';
import { AuthStep } from '../../models/state';
import { loginBegin, loginCacheCheck, loginFailure } from '../../authenticate/loginout.actions';
import { Redirect } from 'react-router';
import { LoginWrapper, LoginButton, LoginHeader, LoginError } from './login.component.style';

export const LoginComponent: React.FunctionComponent<IStateProps> = (props: IStateProps) => {
    const dispatch = useDispatch()


    if (props.authStep === AuthStep.LOGGED_IN) {
        return (
            <Redirect to="/" />
        )
    } 
    else if (props.authStep === AuthStep.SHOW_CONNECTION_FAILED) {
        return (
            <div>
                <div>Noe gikk galt når vi forsøkte å hente din aksess-token. Er du koblet til internet? Du kan <button onClick={() => dispatch(loginCacheCheck())}>prøve igjen.</button></div>
                <div>Du kan også forsøke å <button onClick={() => dispatch(loginFailure("Henting av token feilet"))}></button>logge inn på nytt</div>
            </div>
        )
    }
    else if (props.authStep === AuthStep.SHOW_LOGIN_SCREEN) {
        let loginError =
            (props.loginError != null ?
            <LoginError>{props.loginError}</LoginError> :
            <div></div>);

        return(
            <LoginWrapper>
                <div>
                    <LoginHeader>GiEffektivt administrasjon</LoginHeader>
                    {loginError}
                    <LoginButton onClick={() => dispatch(loginBegin())}>Autoriser</LoginButton>
                </div>
            </LoginWrapper>)
    }
    else {
        return(<div></div>)
    }
}

interface IStateProps {
    authStep: AuthStep,
    loginError?: string
}