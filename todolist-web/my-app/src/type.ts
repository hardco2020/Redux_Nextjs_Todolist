export interface payloadStep{
    todoId:number,
    stepId?:number,
    step?:step
}

//透過對應的category顯示頁面以及內容
//自創的話包含id和名稱 
export interface category{ 
    id:number;
    name:string;
}

export interface step {
    id:number,
    completed:boolean,
    title:string
}
export interface Todo {
    //
    id: number;
    completed: boolean;
    title: string;
    noticeTime?:string;
    dueTime?:string;
    note?:string;
    steps?:step[];
    categories?:number[]; //對應category的id去找名字
}