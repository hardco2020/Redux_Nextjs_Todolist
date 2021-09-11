import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { AxiosError } from 'axios'

// Sample types that will be used
export interface User {
  account:string,
  password:string
}

interface ValidationErrors {
  msg: string
}
export const loginAction = createAsyncThunk<
  User,
  User,
  {
    rejectValue: ValidationErrors
  }
>('users/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/user/login',userData)
    return response.data
  } catch (err:any) {
    let error: AxiosError<ValidationErrors> = err // cast the error for access
    if (!error.response) {
      throw err
    }
    // We got validation errors, let's return those so we can reference in our component and set form errors
    return rejectWithValue(error.response.data)
  }
})

export const signUpAction = createAsyncThunk<
  User,
  User,
  {
    rejectValue: ValidationErrors
  }
>('users/signup', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/user',userData)
    return response.data
  } catch (err:any) {
    let error: AxiosError<ValidationErrors> = err // cast the error for access
    if (!error.response) {
      throw err
    }
    // We got validation errors, let's return those so we can reference in our component and set form errors
    return rejectWithValue(error.response.data)
  }
})


interface UsersState {
  error: string | null | undefined
  entities: Record<string, User>
}

const initialState = {
  entities: {},
  error: null,
} as UsersState

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(loginAction.fulfilled, (state, { payload }) => {
      state.entities[payload.account] = payload
    })
    builder.addCase(loginAction.rejected, (state, action) => {
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.error = action.payload.msg
      } else {
        state.error = action.error.message
      }
    })
    builder.addCase(signUpAction.fulfilled, (state, { payload }) => {
      state.entities[payload.account] = payload
    })
    builder.addCase(signUpAction.rejected, (state, action) => {
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.error = action.payload.msg
      } else {
        state.error = action.error.message
      }
    })
  },
})

export default usersSlice.reducer
