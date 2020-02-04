import { alertConstants } from './constants';

const initialState = {
  color: '',
  message: '',
  visible: false
}

export function alert (state = initialState, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        color: 'success',
        message: action.message,
        visible: true
      };
    case alertConstants.ERROR:
      return {
        color: 'danger',
        message: action.message,
        visible: true
      };
    case alertConstants.CLEAR:
      return {
        visible: false
      };
    default:
      return state
  }
}
