import { authConstants } from './constants';
import { alertActions } from 'stores';
import { history, handleResponse } from 'helpers';

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
                        dispatch(alertActions.clear());
                        // store user details in local storage to keep user logged in between page refreshes
                        localStorage.setItem('token', JSON.stringify(response));
                        history.push('/');
                    } else {
                        dispatch({ type: authConstants.LOGIN_FAILURE, user: email });
                        dispatch(alertActions.error(response.msg));
                    }
                        
                })
                .catch(error => {
                    dispatch({ type: authConstants.LOGIN_FAILURE, user: email });
                    dispatch(alertActions.error(error.toString()));
                });
    };    
}

function logout() {
    localStorage.removeItem('token');

    return { type: authConstants.LOGOUT };
}