import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./reduxStore";
import { Todo, payloadStep, category } from "../type";
// interface Todo {
//   //
//   id: number;
//   completed: boolean;
//   title: string;
// }

interface Todos {
  todos: Todo[];
  categories?: category[];
}
const initialState: Todos = {
  todos: [
    {
      id: 1,
      completed: true,
      title: "setup redux",
      note: "記得要測試",
      steps: [
        { id: 5, completed: true, title: "測試1" },
        { id: 6, completed: false, title: "測試2" },
      ],
      categories: [1, 2, 3],
    },
    {
      id: 2,
      completed: false,
      title: "using redux on typescript",
      note: "糟糕",
      categories: [1, 2, 4, 5353535],
    },
  ],
  categories: [
    { id: 1, name: "我的一天" },
    { id: 2, name: "重要" },
    { id: 3, name: "已計劃" },
    { id: 4, name: "工作" },
    { id: 5353535, name: "終極todolist" },
  ],
};
export const todoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {
    addTodo: (
      state,
      action: PayloadAction<{ title: string; category: number }>
    ) => {
      state.todos = [
        ...state.todos,
        {
          id: state.todos.length + 1,
          title: action.payload.title,
          completed: false,
          categories: [action.payload.category],
        },
      ];
    },
    completeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    },
    deleteTodo: (state,action:PayloadAction<number>) =>{
      state.todos = state.todos.filter((todo)=>todo.id!==action.payload)
    },
    updateStep: (state, action: PayloadAction<payloadStep>) => {
      const todo = state.todos.find(
        (todo) => todo.id === action.payload.todoId
      );
      if (todo && todo.steps !== undefined) {
        const step = todo?.steps.find(
          (step) => step.id === action.payload.stepId
        );
        if (step && step.completed !== undefined) {
          step.completed = !step.completed;
        }
      }
    },
    addStepReducer: (state, action: PayloadAction<payloadStep>) => {
      const todo = state.todos.find(
        (todo) => todo.id === action.payload.todoId
      );
      if (todo && action.payload.step !== undefined) {
        if (todo.steps === undefined) {
          todo.steps = [];
          todo.steps.push(action.payload.step);
        } else {
          todo.steps.push(action.payload.step);
        }
      }
    },
    deleteStepReducer: (state, action: PayloadAction<payloadStep>) => {
      const todo = state.todos.find(
        (todo) => todo.id === action.payload.todoId
      );
      if (todo) {
        todo.steps = todo.steps?.filter(
          (step) => step.id !== action.payload.stepId
        );
      }
    },
    addCategory: (state, action: PayloadAction<string>) => {
      if (state.categories) {
        state.categories = [
          ...state.categories,
          {
            id: Date.now(),
            name: action.payload,
          },
        ];
      } else {
        state.categories = [{ id: Date.now(), name: action.payload }];
      }
    },
    deleteCategory: (state, action: PayloadAction<number>) => {
      state.categories = state.categories?.filter(
        (c) => c.id !== action.payload
      );
    },
    updateCategory: (state, action: PayloadAction<{newName:string,id:number}>) => {
      const category = state.categories?.find((c)=> c.id === action.payload.id)
      if(category){
        category.name = action.payload.newName
      }
    }
  },
});

export const showTodo = (state: RootState) => state.todo.todos;
export const showCategories = (state: RootState) => state.todo.categories;
export const {
  addTodo,
  completeTodo,
  updateTodo,
  deleteTodo,
  updateStep,
  addStepReducer,
  deleteStepReducer,
  addCategory,
  deleteCategory,
  updateCategory
} = todoSlice.actions;
export default todoSlice.reducer;
