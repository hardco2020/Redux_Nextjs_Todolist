import {configureStore} from  '@reduxjs/toolkit'
import categorySlice from './categorySlice'
import stepSlice from './stepSlice'

import todoReducer from './todoSlice'
import userSlice from './userSlice'
export const store =  configureStore({
    reducer:{
        todo : todoReducer,
        user : userSlice,
        category: categorySlice,
        step : stepSlice
    }
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>


// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch