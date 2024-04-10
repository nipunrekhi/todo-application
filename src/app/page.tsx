'use client'
import React from 'react'
import { TODO_TYPE } from '@/data'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DropWrapper } from '@/components/drop-wrapper';
import { TodoCard } from '@/components/todo-card';
import { TodoProps } from '@/interface';
import useLocalStorage from '@/hooks/useLocalStorage';
import { STORAGE_KEY } from '@/lib/constants';

const initialValue = [{}]

const Todo = (): TodoProps => {
  const [value, setValue] = useLocalStorage(STORAGE_KEY, initialValue)

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='flex items-center gap-4 px-4  lg:px-32 lg:gap-20 py-4  lg:py-10 overflow-x-auto'>
        {TODO_TYPE.map((item: string, itemIdx: number) => (
          <DropWrapper item={item} key={itemIdx + "" + item}>
            <TodoCard
              item={item}
              todo={value}
              setTodo={setValue}
            />
          </DropWrapper>
        ))}
      </div>
    </DndProvider>
  )
}

export default Todo