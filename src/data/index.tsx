import { Heart, Plus } from 'lucide-react';
import React from 'react';

const NAV_ITEMS: { name: string, icon: React.ReactElement | string }[] = [
    { name: "New Chat", icon: <Plus className='w-4 h-4 mr-2' /> },
    { name: "My Favorites", icon: <Heart strokeWidth={0} className='w-4 h-4 mr-2  fill-red-500 ' /> },
] as const

const RECENT_HISTORY = [
    { title: "Creating a Perfectly Styled Custom Checkbox User: improved code: .custom-check:ch" },
    { title: "Creating a Perfectly Styled Custom Checkbox User: improved code: .custom-check:ch" },
    { title: "Creating a Perfectly Styled Custom Checkbox User: improved code: .custom-check:ch" },
    { title: "Creating a Perfectly Styled Custom Checkbox User: improved code: .custom-check:ch" },
    { title: "Creating a Perfectly Styled Custom Checkbox User: improved code: .custom-check:ch" }
] as const


const TODO_TYPE = ['Todo', 'In-Progress', 'Completed'] as const;

const SORT_TYPES=[
    { name: 'By Date (Asc)', value:'date-asc'},
    { name: 'By Date (Desc)', value: 'date-desc' },
    { name: 'By Name (Asc)', value: 'name-asc' },
    { name: 'By Name (Desc)', value: 'name-desc' },
] as const

const TODO_ITEMS = [
    { title: "Go for a run", type: "Todo", date: "04-04-2024" },
    { title: "Grocery shopping", type: "Todo", date: "04-04-2024" },
    { title: "Read a book", type: "Todo", date: "04-04-2024" },
    { title: "Call mom", type: "Todo", date: "04-04-2024" },
    { title: "Workout", type: "Todo", date: "04-04-2024" },
    { title: "Cook dinner", type: "In-Progress", date: "04-04-2024" },
    { title: "Write journal", type: "In-Progress", date: "04-04-2024" },
    { title: "Study Spanish", type: "In-Progress", date: "04-04-2024" },
    { title: "Clean the house", type: "In-Progress", date: "04-04-2024" },
    { title: "Watch a movie", type: "Todo", date: "04-04-2024" },
    { title: "Complete project report", type: "Todo", date: "04-04-2024" },
    { title: "Practice guitar", type: "Todo", date: "04-04-2024" },
    { title: "Plan weekend trip", type: "Completed", date: "04-04-2024" },
    { title: "Attend team meeting", type: "Completed", date: "04-04-2024" },
    { title: "Yoga session", type: "Completed", date: "04-04-2024" }
] as const


export {
    NAV_ITEMS,
    RECENT_HISTORY,
    TODO_TYPE,
    TODO_ITEMS,
    SORT_TYPES
}