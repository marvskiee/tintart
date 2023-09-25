export const initialState = {
  user: null,
  isAuth: false,
  isLoading: false,
  error: [],
}

export const AppReducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER_SUCCESS': {
      return {
        ...state,
        error: [],
        isRegistered: true,
        isLoading: false,
      }
    }
    case 'REGISTER_REQUEST':
    case 'LOGIN_REQUEST': {
      return {
        ...state,
        isLoading: true,
        error: [],
      }
    }
    case 'LOGIN_SUCCESS': {
      localStorage.setItem('access_id', action.value._id)
      return {
        ...state,
        isAuth: true,
        user: action.value,
        error: [],
        isLoading: false,
      }
    }
    case 'REGISTER_ERROR':
    case 'LOGIN_ERROR': {
      return {
        ...state,
        error: action.value,
        isLoading: false,
      }
    }
    case 'LOGOUT': {
      localStorage.removeItem('access_id')
      return {
        ...state,
        isAuth: false,
        isLoading: false,

        user: {},
      }
    }
    case 'SET_USER': {
      return {
        ...state,
        isAuth: true,
        user: action.value,
      }
    }
  }
}
