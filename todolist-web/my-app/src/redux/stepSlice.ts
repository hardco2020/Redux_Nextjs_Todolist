import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Todo } from '../type'
import { RootState } from './reduxStore'

// Sample types that will be used
export interface Step {
  id:string;
  title:string;
  completed:boolean
  todoItem?:Todo
}

export interface payloadStep{
    title:string;
    completed:boolean;
}
export interface payloadAddStep{
    todoId:string;
    new_step:payloadStep
}


export const getStepsByUser = createAsyncThunk<Step[],string>('step/get',async(userId)=>{
    try{
        const response = await axios.get(`/api/user/${userId}/step`)
        return response.data
    }catch(err:any){
        console.log(err)
    }
})
export const AddStepsByTodo = createAsyncThunk<Step,payloadAddStep>('step/Add',async({todoId,new_step})=>{
    try{
        const response = await axios.post(`/api/todo/${todoId}/step`,new_step)
        return response.data
    }catch(err:any){
        console.log(err)
    }
})
export const UpdateStepById = createAsyncThunk<Step,Step>('step/Update',async(update_step)=>{
    try{
        const response = await axios.put('/api/step',update_step)
        return response.data
    }catch(err:any){
        console.log(err)
    }
})
export const DeleteStepById = createAsyncThunk<string,string>('step/delete',async(stepId)=>{ 
    try{
        const response = await axios.delete(`/api/step/${stepId}`)
        return response.data
    }catch(err:any){
        console.log(err)
    }
})

interface StepState {
  steps: Step[]
}

const initialState = {
    steps:[]
} as StepState

const StepSlice = createSlice({
  name: 'Steps',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(getStepsByUser.fulfilled, (state, { payload }) => {
       state.steps = payload
    })
    builder.addCase(AddStepsByTodo.fulfilled,(state, {payload} )=>{
       state.steps.push(payload)
    })
    builder.addCase(UpdateStepById.fulfilled,(state, {payload} )=>{
        state.steps = state.steps.map((s)=>{
            if(s.id===payload.id){
                return payload
            }
            return s
        })
     })
    builder.addCase(DeleteStepById.fulfilled,(state, {payload} )=>{
        state.steps = state.steps.filter((s)=> s.id !== payload)
    })
  },
})
export const seeSteps = (state: RootState) => state.step.steps
export default StepSlice.reducer