import { submitFormConstants } from './constants';
import { toastr } from 'react-redux-toastr';
import { handleResponse } from 'helpers';

export const submitFormActions = {
  save,
  update,
  destroy
};

const API_URL = process.env.REACT_APP_API_URL;
const token = JSON.parse(localStorage.getItem('token'));


function save(url, body, formData) {
    return async dispatch => {
        dispatch( { type: submitFormConstants.SAVE_REQUEST } );

        const post = formData ?
        {
          method: 'post',
          headers: {
           'Authorization': `Bearer ${token.data.access_token}`
          },
          body: body
        }
        :
        {
          method: 'post',
          headers: {
           'Content-Type':'application/json',
           'Authorization': `Bearer ${token.data.access_token}`
          },
          body: JSON.stringify(body)
        };
        
        try {
          const response = await fetch(API_URL + url, post);
          const data = await handleResponse(response);
          toastr.success('', 'Data Saved Successfully');

          dispatch({ type: submitFormConstants.SAVE_SUCCESS, response: data });

          return { status: true };
        } catch (error) {
          dispatch({ type: submitFormConstants.SAVE_FAILURE, message: error });
          toastr.error('', error.toString());

          return { status: false };
        }

    };
}

function update(url, body, formData) {
    return async dispatch => {
        dispatch( { type: submitFormConstants.SAVE_REQUEST } );

        const options = formData ?
        {
          method: 'PUT',
          body: body,
          headers: {
           'Authorization': `Bearer ${token.data.access_token}`
          }
        }
        :
        {
          method: 'PUT',
          headers: {
           'Content-Type':'application/json',
           'Authorization': `Bearer ${token.data.access_token}`
          },
          body: JSON.stringify(body)
        };
        try {
          const response = await fetch(API_URL + url, options);
          const data = await handleResponse(response);
          toastr.success('', 'Data Updated Successfully');
          dispatch({ type: submitFormConstants.UPDATE_SUCCESS, response: data });

          return { status: true };
        } catch (error) {
          dispatch({ type: submitFormConstants.UPDATE_FAILURE, message: error });
          toastr.error('', error.toString());

          return { status: false };
        }

    };
}

function destroy(url, id) {
  return async dispatch => {
    dispatch( { type: submitFormConstants.DESTROY_REQUEST } );
    
    try {
      const response = await fetch(API_URL + url + '/' + id, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token.data.access_token}`
        }
      })
      const data = await handleResponse(response);
      toastr.success('', 'Data Deleted Successfully');
      dispatch({ type: submitFormConstants.DESTROY_SUCCESS, response: data });
      
      return { status: true };
    } catch (error) {
      dispatch({ type: submitFormConstants.DESTROY_FAILURE, message: error });
      toastr.error('', error.toString());

      return { status: false };
    }
  }
}