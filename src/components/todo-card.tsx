'use client'
import { v4 as uuidv4 } from 'uuid';
import { ItemCard } from "./item-card";
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { cn } from '@/lib/utils';
import moment from 'moment';
import { ToastAction } from './ui/toast';
import { useToast } from '../hooks/use-toast';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from './ui/input';
import { Plus } from 'lucide-react';
import { InputValue, Todo, TodoCardProps } from '@/interface';
import { TodoFilter } from '@/components/todo-filter';
import { Window } from './window';

const initialInputValue: InputValue = {
    id: uuidv4(),
    title: '',
    type: '',
    date: new Date()
};

export const TodoCard: React.FC<TodoCardProps> = ({ item, todo, setTodo }) => {
    const { toast } = useToast()
    const [inputValue, setInputValue] = useState<InputValue>(initialInputValue)

    const handleUndo = (prevTodo: Todo[]) => setTodo(prevTodo)

    const handleSaveTodo = () => {
        try {
            if (!inputValue?.title) return

            const prevTodo = todo;

            const newInputValue = {
                ...inputValue,
                date: new Date(),
                id: uuidv4()
            };

            const todos: Todo[] = [...todo];
            todos.push(newInputValue);
            setTodo(todos)
            setInputValue(initialInputValue)
            const modal = document.getElementById('my_modal_1') as HTMLDialogElement | null
            if (modal) modal.close();
            toast({
                title: "Todo has been created",
                description: moment(new Date()).format("MMMM Do YYYY, h:mm:ss a"),
                action: (
                    <ToastAction altText="undo" className='bg-primary text-white' onClick={() => handleUndo(prevTodo)}>Undo</ToastAction>
                ),
            })
        } catch (error: any) {
            console.log(error?.message);
        }
    }


    return (
        <>
            <div className={cn(" w-full  max-h-fit   rounded-md min-w-40", { "opacity-35 ": false })}>
                <div
                    className={cn("flex justify-between px-3 py-2 gap-4  items-center   mb-2",
                        {
                            'bg-purple-300': item === 'Todo',
                            'bg-purple-400': item === 'In-Progress',
                            'bg-purple-500': item === 'Completed'
                        }
                    )}
                >
                    <Button className=" btn-ghost  p-2 text-md  font-serif text-nowrap text-white">{item}</Button>
                    <div className=' flex gap-2'>
                        {item === 'Todo' && (
                            <Button className=" text-sm font-serif p-1 h-6"
                                onClick={() => {
                                    const modal = document.getElementById('my_modal_1') as HTMLDialogElement | null;
                                    if (modal) modal.showModal();
                                }}
                            >
                                <Plus size={14} />
                            </Button>
                        )}
                        <TodoFilter todo={todo} setTodo={setTodo} item={item} />
                    </div>
                </div>
                <ScrollArea className="h-[700px] ">
                    <div className="flex flex-col gap-4 px-3 last:pb-4">
                        {todo && todo.length > 0 && todo.some((todoItems: any) => item === todoItems.type) ? (
                            todo.map((todoItems: any, idx: number) => (
                                item === todoItems.type &&
                                <ItemCard todoItems={todoItems} idx={idx} key={idx} todo={todo} setTodo={setTodo} />
                            ))
                        ) : (
                            null
                        )}
                    </div>
                </ScrollArea>
            </div>
            <Window handleSaveTodo={handleSaveTodo} item={item} setInputValue={setInputValue} inputValue={inputValue} />
        </>
    )
}



