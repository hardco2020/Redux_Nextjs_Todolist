import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {RootState} from './reduxStore'
import { Todo} from '../type'
// interface Todo {
//   //
//   id: number;
//   completed: boolean;
//   title: string;
// }

interface Todos {
  todos: Todo[];
}
const initialState: Todos = {
  todos: [
    { id: 1, completed: true, title: "setup redux" },
    { id: 2, completed: false, title: "using redux on typescript" },
  ],
};
export const todoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos=[
          ...state.todos,
          {
              id:state.todos.length+1,
              title: action.payload,
              completed:false
          }
      ]
    },
    completeTodo:(state,action:PayloadAction<number>)=>{
      state.todos = state.todos.map((todo)=> 
        todo.id ===action.payload
          ? {...todo ,completed:!todo.completed}
          : todo
      )
    },
    updateTodo : (state,action:PayloadAction<Todo>)=>{
      state.todos = state.todos.map( (todo)=>
        todo.id === action.payload.id ? action.payload : todo
      )
    }
  },
});

export const showTodo = (state: RootState) => state.todo.todos

export const { addTodo,completeTodo,updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
