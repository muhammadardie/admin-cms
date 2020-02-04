import { loadTableConstants } from './constants';
import { alertActions } from 'stores';
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
                })
                .catch(error => {
                    dispatch({ type: loadTableConstants.GETALL_FAILURE, message: error });
                    dispatch(alertActions.error(error.toString()));
                });
    };
}