import { authConstants } from './constants';
import { history, handleResponse } from 'helpers';
import { toastr } from 'react-redux-toastr';
import { setToken } from 'helpers';

export const authActions = {
    login,
    logout
};

const API_URL = process.env.REACT_APP_API_URL;

function login(email, password) {
    return dispatch => {
        dispatch({ type: authConstants.LOGIN_REQUEST, user: email  });   

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        };

        return fetch(API_URL + '/login', requestOptions)
                .then(handleResponse)
                .then(response => {
                    if(response.status === true){
                        dispatch({ type: authConstants.LOGIN_SUCCESS, user: response })
                        toastr.success('', 'You have succesfully logged in')
                        setToken(response)
                        history.push('/');
                    } else {
                        dispatch({ type: authConstants.LOGIN_FAILURE, user: email });
                        toastr.error('', response.message)
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