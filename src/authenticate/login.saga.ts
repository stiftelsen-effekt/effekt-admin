import {  Auth } from './auth'

export function* login() {
    //Exits the app entirely and moves on to 3rd party login
    yield Auth.login()
}