
export interface TodoProps {

}

export interface Todo extends InputValue {

}

export interface TodoCardProps {
    item: string;
    todo: any;
    setTodo: any;
}

export interface InputValue {
    id: string;
    title: string;
    type: string;
    date: Date | string;
}


export interface ItemCardProps {
    todoItems: { title: string, type: string, date: Date, id: string };
    idx: number;
    todo: any;
    setTodo: any;
}



