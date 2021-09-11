import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./reduxStore";
import { Todo, payloadStep, category } from "../type";
import axios from "axios";

interface payloadAddTodo{
  categoryId:string;
  title:string;
  completed:boolean;
}

interface payloadAddTodoMyday{
  categoryId:string
  todoId:string
}
interface payloadCompleteTodo{
  todoId:string;
  completed:boolean;
}
interface Todos {
  todos: Todo[];
}
const initialState: Todos = {
  todos: [],
};



export const getTodosByUser = createAsyncThunk(
  'todos/get',
  async (userId:string) => {
      const response = await axios.get(`/api/user/${userId}/todo`)
      return response.data
  }
)

export const AddTodosByCategory = createAsyncThunk<Todo,payloadAddTodo>(
  'todos/add',
  async ({categoryId,title,completed}) => {
      const data = {title,completed}
      const response = await axios.post(`/api/category/${categoryId}/todo`,data)
      return response.data
  }
)
export const UpdateTodosByTodoID = createAsyncThunk<Todo,Todo>(
  'todos/update',
  async (todo) => {
      const response = await axios.put('/api/todo',todo)
      return response.data
  }
)
export const CompleteTodosByTodoID = createAsyncThunk<Todo,payloadCompleteTodo>(
  'todos/complete',
  async ({todoId,completed}) => {
      const todo = {id:todoId,completed:!completed}
      const response = await axios.put('/api/todo',todo)
      return response.data
  }
)

export const DeleteTodosByTodoID = createAsyncThunk<string,string>(
  'todos/delete',
  async (todoId) => {
      const response = await axios.delete(`/api/todo/${todoId}`)
      return response.data
  }
)
export const AddTodosToCatgory= createAsyncThunk<Todo,payloadAddTodoMyday>(
  'todos/AddCategory',
  async ({categoryId,todoId}) => {
      const response = await axios.post(`/api/category/${categoryId}/todo/${todoId}`)
      return response.data
  }
)
export const DeleteTodosToCatgory= createAsyncThunk<Todo,payloadAddTodoMyday>(
  'todos/DeleteCategory',
  async ({categoryId,todoId}) => {
      const response = await axios.delete(`/api/category/${categoryId}/todo/${todoId}`)
      return response.data
  }
)

export const todoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {
    deleteTodoByRelated:(state,action:PayloadAction<string>)=>{
      state.todos = state.todos.filter((todo)=>
        todo.categories?.some((c)=> c.id === action.payload)
      )
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    },
    

  },
  extraReducers:(builder)=>{
    builder.addCase(getTodosByUser.fulfilled, (state, { payload }) => {
      state.todos = payload
    })
    builder.addCase(AddTodosByCategory.fulfilled, (state, { payload }) => {
      state.todos.push(payload)
    })
    builder.addCase(UpdateTodosByTodoID.fulfilled, (state, { payload }) => {
      state.todos  = state.todos.map((todo)=>{
        if(todo.id === payload.id){
          return payload
        }
        return todo
      })
    })
    builder.addCase(AddTodosToCatgory.fulfilled, (state, { payload }) => {
      state.todos  = state.todos.map((todo)=>{
        if(todo.id === payload.id){
          return payload
        }
        return todo
      })
    })
    builder.addCase(CompleteTodosByTodoID.fulfilled, (state, { payload }) => {
      state.todos  = state.todos.map((todo)=>{
        if(todo.id === payload.id){
          todo.completed = payload.completed
          return todo
        }
        return todo
      })
    })
    builder.addCase(DeleteTodosToCatgory.fulfilled, (state, { payload }) => {
      state.todos  = state.todos.map((todo)=>{
        if(todo.id === payload.id){
          return payload
        }
        return todo
      })
    })
    builder.addCase(DeleteTodosByTodoID.fulfilled, (state, { payload }) => {
      state.todos  = state.todos.filter((todo)=> todo.id!==payload) 
    }) 
  }
});

export const showTodo = (state: RootState) => state.todo.todos;
export const {
  deleteTodoByRelated,
  updateTodo,
} = todoSlice.actions;
export default todoSlice.reducer;
