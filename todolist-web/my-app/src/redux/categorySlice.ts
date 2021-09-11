import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { payloadAddCategory } from '../type'
import { RootState } from './reduxStore'

// Sample types that will be used
export interface Category {
  id:string,
  name:string
}

export interface updateCategoryType{
  categoryId:string,
  name:string
}


export const getCategoryByUser = createAsyncThunk<Category[],string>('category/get', async (userId:string) => {
  try {
    const response = await axios.get(`/api/user/${userId}/category`)
    return response.data
  } catch (err:any) {
      console.log(err)
  }
})

export const AddCategoryByUser = createAsyncThunk<Category,payloadAddCategory>('category/add', async ({userId,name}) => {
    try {
      const response = await axios.post(`/api/user/${userId}/category`,{name:name})
      return response.data
    } catch (err:any) {
        console.log(err)
    }
  })
export const DeleteCategoryById = createAsyncThunk<Category,string>('category/delete', async (categoryId) => {
  try {
    console.log(categoryId)
    const response = await axios.delete(`/api/category/${categoryId}`)
    const data = {id:categoryId,...response.data}
    console.log(data)
    return data
  } catch (err:any) {
      console.log(err)
  }
}) 
export const updateCategoryAction = createAsyncThunk<Category,updateCategoryType>('category/update', async ({categoryId,name})=> {
  try {
    const response = await axios.put('/api/category',{id:categoryId,name:name})
    return response.data
  } catch (err:any) {
      console.log(err)
  }
}) 

interface CategoryState {
  categories: Category[]
}

const initialState = {
    categories:[]
} as CategoryState

const CategorySlice = createSlice({
  name: 'Categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(getCategoryByUser.fulfilled, (state, { payload }) => {
      state.categories = payload
    })
    builder.addCase(AddCategoryByUser.fulfilled, (state, action) => {
        state.categories.push(action.payload)
    })
    builder.addCase(DeleteCategoryById.fulfilled, (state, action) => {
      state.categories = state.categories.filter((category)=> category.id!==action.payload.id)
    })
    builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
      const category =  state.categories.find((c)=>c.id === action.payload.id)
      if(category){
        category.name = action.payload.name
      }
    })
  },
})
export const seeCategories = (state: RootState) => state.category.categories
export default CategorySlice.reducer
