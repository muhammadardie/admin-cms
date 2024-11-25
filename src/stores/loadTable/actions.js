import { loadTableConstants } from './constants';
import { toastr } from 'react-redux-toastr';
import { handleResponse } from 'helpers';

export const loadTableActions = {
    getAll
};

const API_URL = process.env.REACT_APP_API_URL;
function getAll(url) {
    let token = JSON.parse(localStorage.getItem('token'));

    return dispatch => {
        dispatch( { type: loadTableConstants.GETALL_REQUEST } );

        return fetch(API_URL + url, {
                    headers: {Authorization: `Bearer ${token.data.access_token}`}
                })
                .then(async(res) => {
                    const result = await handleResponse(res)
                    
                    return result.data   
                })
                .then(response => {
                    dispatch( { type: loadTableConstants.GETALL_SUCCESS, data: response } );

                    return {status: true}
                })
                .catch(error => {
                    dispatch({ type: loadTableConstants.GETALL_FAILURE, message: error });
                    toastr.error('', error)

                    return {status: false}
                });
    };
}