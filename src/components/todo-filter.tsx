import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Filter } from 'lucide-react';
import { Todo } from "@/interface"
import { useCallback, useEffect, useState } from "react"
import { SORT_TYPES } from "@/data"

interface TodoFilterProps {
    todo: Todo[];
    setTodo: (value: Todo[]) => void;
    item: string
}

type FilterType = {
    sort: string
}


export const TodoFilter: React.FC<TodoFilterProps> = ({ setTodo, todo, item }) => {
    const [filter, setFilter] = useState<FilterType>({ sort: "date-asc" })

    const onChangeFilter = (key: string, value: string) => setFilter((prevValue: any) => ({ ...prevValue, [key]: value }))

    const sort = useCallback((type?: string) => {
        const sortedValues = [...todo];
        const [filterWith, otherData] = sortedValues.reduce((acc: any, value) => {
            type === value.type ? acc[0]?.push(value) : acc[1]?.push(value);
            return acc;

        }, [[], []])
        const sortedFilterWith = filterWith.sort((a: any, b: any) => {
            if (filter?.sort.includes('date')) {
                return filter?.sort === 'date-asc' ? +new Date(a.date) - +new Date(b.date) : +new Date(b.date) - +new Date(a.date)
            } else {
                return filter?.sort === 'name-asc' ? a.title.localeCompare(b.title, undefined, { numeric: false }) : b.title.localeCompare(a.title)
            }
        });

        setTodo([...otherData, ...sortedFilterWith]);
    }, [filter?.sort, setTodo, todo]);

    useEffect(() => {
        sort(item)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter.sort]);


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild >
                <Button className=" text-sm font-serif p-1 h-6" >
                    <Filter size={14} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=' min-w-[16rem] hover:bg-white'>
                <DropdownMenuLabel className="font-serif">Filters</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={(e) => { e.preventDefault(); e.stopPropagation() }} className=' focus:bg-transparent' >
                    <Accordion type="single" collapsible className="w-full  hover:bg-white" >
                        <AccordionItem value="item-1" className='border-b-0'>
                            <AccordionTrigger className=' hover:no-underline font-serif'>Sort</AccordionTrigger>
                            <AccordionContent>
                                <RadioGroup value={filter?.sort} defaultValue={filter?.sort} onValueChange={(e) => onChangeFilter('sort', e)}>
                                    {SORT_TYPES.map(({ name, value }, index) => (
                                        <div className="flex items-center space-x-2" key={name + '' + index}>
                                            <RadioGroupItem value={value} id={name} />
                                            <Label htmlFor={name} className="font-serif">{name}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
