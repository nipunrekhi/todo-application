'use client'
import { cn } from "@/lib/utils";
import moment from "moment";
import { useDrag, useDrop } from 'react-dnd';
import { ITEM_TYPE } from "@/lib/constants";
import { useCallback, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Trash2, X } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ToastAction } from "./ui/toast";
import { useToast } from "../hooks/use-toast";
import { ItemCardProps, Todo } from "@/interface";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"



export const ItemCard: React.FC<ItemCardProps> = ({ todoItems, idx, todo, setTodo }) => {
    const ref = useRef<HTMLDivElement>(null)
    const { toast } = useToast()
    const [editTodo, setEditTodo] = useState<any>("")

    const changeItemColumn = (currentItem: any, columnName: string) => {
        const newTodo = [...todo];
        const updatedTodo = newTodo.map((e: Todo) => {
            if (e.id === currentItem.id) {
                return {
                    ...e,
                    type: columnName
                };
            }
            return e;
        });
        setTodo(updatedTodo);
    }

    const moveTodo = (dragIndex: number, hoverIndex: number) => {
        setTodo((prevTodos: Todo[]) => {
            const newTodos = [...prevTodos];
            const [removed] = newTodos.splice(dragIndex, 1);
            newTodos.splice(hoverIndex, 0, removed);
            return newTodos;
        });
    };

    const handleDeleteTodo = (id: string) => {
        if (!id) return
        const prevTodo = todo
        const newTodo = [...todo]
        const index = newTodo?.findIndex(todo => todo?.id === id)
        newTodo.splice(index, 1)
        setTodo(newTodo)
        toast({
            title: "Todo has been deleted",
            description: moment(new Date()).format("MMMM Do YYYY, h:mm:ss a"),
            action: (
                <ToastAction altText="undo" className='bg-primary text-white' onClick={() => handleUndo(prevTodo)}>Undo</ToastAction>
            ),
        })
    }
    const handleEditTodo = (id: string) => {
        if (!id) return
        else if (editTodo) setEditTodo('')
        else setEditTodo(id)
    }



    const handleUndo = useCallback((prevTodo: Todo[]) => setTodo(prevTodo), [setTodo])

    const [{ isDragging }, dragRef] = useDrag({
        type: ITEM_TYPE,
        item: { id: todoItems.id, index: idx, column: todoItems?.type },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            const { name } = dropResult as any
            switch (name) {
                case 'In-Progress':
                    changeItemColumn(item, name);
                    break;
                case 'Todo':
                    changeItemColumn(item, name);
                    break;

                default:
                    changeItemColumn(item, name);
                    break;
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, dropRef] = useDrop({
        accept: ITEM_TYPE,
        hover: (item: any, monitor: any) => {
            if (ref?.current) {
                const dragIndex = item.index;
                const hoverIndex = idx;
                const hoverBoundingRect = ref?.current?.getBoundingClientRect();
                const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
                const hoverActualY = monitor?.getClientOffset().y - hoverBoundingRect.top

                // if dragging down, continue only when hover is smaller than middle Y
                if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
                // if dragging up, continue only when hover is bigger than middle Y
                if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return
                if (dragIndex === hoverIndex) {
                    return;
                }
                moveTodo(dragIndex, hoverIndex);
                item.index = hoverIndex;
            }
        },
        drop: (item, monitor) => {
            return item
        },
    });

    dragRef(dropRef(ref))

    const onBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
        try {
            const prevTodo = todo
            const updatedTitle = e.currentTarget.textContent;

            if (!updatedTitle) return;
            const updateTodo = todo.map((item: Todo) => {
                if (item?.id === todoItems?.id) {
                    return {
                        ...item,
                        title: updatedTitle
                    }
                }
                return item
            })
            setTodo(updateTodo)
            setEditTodo('')
            toast({
                title: "Todo has been updated",
                description: moment(new Date()).format("MMMM Do YYYY, h:mm:ss a"),
                duration: 1000,
                action: (
                    <ToastAction altText="undo" className='bg-primary text-white' onClick={() => handleUndo(prevTodo)}>Undo</ToastAction>
                ),
            })
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error?.message,
                action: <ToastAction altText="Try again" onClick={() => setEditTodo(todoItems?.id)}>Try again</ToastAction>,
            })
        }
    }, [handleUndo, setTodo, toast, todo, todoItems?.id])


    return (
        <div key={idx} ref={ref} className={cn("card bg-white rounded-md px-2 py-2 h-[100px] group relative min-w-40  max-h-72  lg:w-full lg:max-w-full ", { "bg-purple-100": isDragging })}>
            <div className="flex flex-col flex-grow  cursor-pointer " >
                {editTodo && editTodo === todoItems?.id ? (
                    <>
                        <div
                            contentEditable
                            onBlur={onBlur}
                            className="border rounded-md relative  w-full  no-scrollbar  lg:w-96 focus:outline-purple-500  scroll-smooth  overflow-y-auto text-wrap px-2 active:outline-none h-14"
                            suppressContentEditableWarning={true}
                            dangerouslySetInnerHTML={{ __html: todoItems.title }}
                        />
                        <X className=" absolute right-0 -top-0.5" size={22} onClick={() => setEditTodo('')} />
                    </>
                ) : (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <p className=" pre  text-md font-serif h-12 truncate cursor-pointer text-ellipsis text-pretty"
                                    onClick={() => handleEditTodo(todoItems?.id)}>
                                    {todoItems.title}
                                </p>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{todoItems.title}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </div>

            <div className="self-end">
                <span className="text-[10px] md:text-xs font-serif truncate">
                    {moment(todoItems.date).format("MMMM Do YYYY, h:mm:ss a")}
                </span>
            </div>

            <div className=" flex gap-2 justify-end absolute bottom-2 left-2 md:invisible md:group-hover:visible ">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="p-1 h-6  lg:block "> <Trash2 size={14} /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                account and remove your data.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteTodo(todoItems.id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    )
}
