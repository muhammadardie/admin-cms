import { submitFormConstants } from './constants';
import { alertActions } from 'stores';
import { handleResponse } from 'helpers';

export const submitFormActions = {
    save,
    update,
    destroy
};

function save(url, body) {
    return dispatch => {
        dispatch( { type: submitFormConstants.SAVE_REQUEST } );

        return fetch(url, {
                 method: 'post',
                 headers: {'Content-Type':'application/json'},
                 body: JSON.stringify(body)
               })
                .then(handleResponse)
                .then(function(response) {
                  dispatch(alertActions.success('Data Saved Successfully'));
                  dispatch( { type: submitFormConstants.SAVE_SUCCESS, response: response } )
                })
                .catch(error => {
                    dispatch({ type: submitFormConstants.SAVE_FAILURE, message: error });
                    dispatch(alertActions.error(error.toString()));
                });

    };
}

function update(url, body) {
    return dispatch => {
        dispatch( { type: submitFormConstants.SAVE_REQUEST } );

        return fetch(url, {
                 method: 'PUT',
                 headers: {'Content-Type':'application/json'},
                 body: JSON.stringify(body)
               })
                .then(handleResponse)
                .then(function(response) {
                  dispatch(alertActions.success('Data Updated Successfully'));
                  dispatch( { type: submitFormConstants.UPDATE_SUCCESS, response: response } )
                })
                .catch(error => {
                    dispatch({ type: submitFormConstants.UPDATE_FAILURE, message: error });
                    dispatch(alertActions.error(error.toString()));
                });

    };
}

function destroy(url, id) {
    return dispatch => {
        dispatch( { type: submitFormConstants.DESTROY_REQUEST } );

        return fetch(url +'/'+ id, {
                  method: 'DELETE',
                })
                .then(handleResponse)
                .then(function(response) {
                  dispatch(alertActions.success('Data Deleted Successfully'));
                  dispatch( { type: submitFormConstants.DESTROY_SUCCESS, response: response } )
                })
                .catch(error => {
                    dispatch({ type: submitFormConstants.DESTROY_FAILURE, message: error });
                    dispatch(alertActions.error(error.toString()));
                });
    };
}