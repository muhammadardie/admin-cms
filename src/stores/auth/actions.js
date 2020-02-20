import { authConstants } from './constants';
import { history, handleResponse } from 'helpers';
import { toastr } from 'react-redux-toastr';

export const authActions = {
    login,
    logout
};

function login(email, password) {
    return dispatch => {
        dispatch({ type: authConstants.LOGIN_REQUEST, user: email  });   

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        };

        return fetch('/login', requestOptions)
                .then(handleResponse)
                .then(response => {
                    if(response.status === true){
                        dispatch({ type: authConstants.LOGIN_SUCCESS, user: response })
                        toastr.success('', 'You have succesfully logged in')
                        setTokenLogin(response)
                        history.push('/');
                    } else {
                        dispatch({ type: authConstants.LOGIN_FAILURE, user: email });
                        toastr.error('', response.msg)
                    }
                        
                })
                .catch(error => {
                    dispatch({ type: authConstants.LOGIN_FAILURE, user: email });
                    toastr.error('', error)
                });
    };    
}

function logout() {
    localStorage.removeItem('token');

    return { type: authConstants.LOGOUT };
}

function setTokenLogin(token) {
    let nextHour = new Date();
    let date     = new Date();
    nextHour.setHours(date.getHours() + 1); //one hour from now
    token['expire'] = nextHour;
    // store user details and time expiration in local storage to keep user logged in between page refreshes
    localStorage.setItem('token', JSON.stringify(token));

}