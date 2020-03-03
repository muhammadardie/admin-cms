import { loadTableConstants } from './constants';
import { toastr } from 'react-redux-toastr';
import { handleResponse } from 'helpers';

export const loadTableActions = {
    getAll
};

function getAll(url) {
    return dispatch => {
        dispatch( { type: loadTableConstants.GETALL_REQUEST } );

        return fetch(url)
                .then(handleResponse)
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