import { Category } from "./redux/categorySlice";

export interface payloadStep{
    todoId:string,
    stepId?:number,
    step?:step
}
export interface payloadLogin{
    account:string,
    password:string
}
//透過對應的category顯示頁面以及內容
//自創的話包含id和名稱 
export interface category{ 
    id:string;
    name:string;
}

export interface payloadAddCategory{
    userId:string;
    name:string;
}
export interface step {
    id:string,
    completed:boolean,
    title:string
}
export interface Todo {
    //
    id: string;
    completed: boolean;
    title: string;
    noticeTime?:string|null;
    dueTime?:string|null;
    note?:string;
    steps?:step[];
    categories?:Category[]; //對應category的id去找名字
}