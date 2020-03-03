import { submitFormConstants } from './constants';
import { toastr } from 'react-redux-toastr';
import { handleResponse } from 'helpers';

export const submitFormActions = {
  exist,
  save,
  update,
  destroy
};

const API_URL = process.env.REACT_APP_API_URL;

function exist(url, body) {
    return dispatch => {
        dispatch( { type: submitFormConstants.EXIST_REQUEST } );

        return fetch(API_URL + url, {
                 method: 'post',
                 headers: {'Content-Type':'application/json'},
                 body: JSON.stringify(body)
               })
                .then(handleResponse)
                .then(function(response) {
                  if(response.exist === true){
                    toastr.error('', response.msg)
                    dispatch( { type: submitFormConstants.EXIST_SUCCESS, response: response.msg } )
                    
                    return {exist: response.exist} 
                  }

                  return {exist: false}
                })
                .catch(error => {
                    dispatch({ type: submitFormConstants.EXIST_FAILURE, message: error });
                    toastr.error('', error.toString())
                });

    };
}

function save(url, body, formData) {
    return dispatch => {
        dispatch( { type: submitFormConstants.SAVE_REQUEST } );

        const post = formData ?
        {
          method: 'post',
          body: body
        }
        :
        {
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(body)
        };
        return fetch(API_URL + url, post)
                .then(handleResponse)
                .then(function(response) {
                  toastr.success('', 'Data Saved Successfully')
                  dispatch( { type: submitFormConstants.SAVE_SUCCESS, response: response } )

                  return {status: true}
                })
                .catch(error => {
                    dispatch({ type: submitFormConstants.SAVE_FAILURE, message: error });
                    toastr.error('', error.toString())
                    
                    return {status: false}
                });

    };
}

function update(url, body, formData) {
    return dispatch => {
        dispatch( { type: submitFormConstants.SAVE_REQUEST } );

        const put = formData ?
        {
          method: 'PUT',
          body: body
        }
        :
        {
          method: 'PUT',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(body)
        };
        return fetch(API_URL + url, put)
                .then(handleResponse)
                .then(function(response) {
                  toastr.success('', 'Data Updated Successfully')
                  dispatch( { type: submitFormConstants.UPDATE_SUCCESS, response: response } )

                  return {status: true}
                })
                .catch(error => {
                    dispatch({ type: submitFormConstants.UPDATE_FAILURE, message: error });
                    toastr.error('', error.toString())

                    return {status: false}
                });

    };
}

function destroy(url, id) {
    return dispatch => {
        dispatch( { type: submitFormConstants.DESTROY_REQUEST } );

        return fetch(API_URL + url +'/'+ id, {
                  method: 'DELETE',
                })
                .then(handleResponse)
                .then(function(response) {
                  toastr.success('', 'Data Deleted Successfully')
                  dispatch( { type: submitFormConstants.DESTROY_SUCCESS, response: response } )
                  
                  return {status: true}
                })
                .catch(error => {
                    dispatch({ type: submitFormConstants.DESTROY_FAILURE, message: error });
                    toastr.error('', error.toString())
                
                    return {status: false}
                });
    };
}