'use client'
import React, { createContext, useContext, useState } from 'react';
interface MessageContextProviderProps {
    children: React.ReactNode
}
export const InputContext = createContext<any>(undefined);
const MessageContextProvider: React.FC<MessageContextProviderProps> = ({ children }) => {
    const [inputValue, setInputValue] = useState<string | any>('');
    return (
        <InputContext.Provider value={{ inputValue, setInputValue }}>
            {children}
        </InputContext.Provider>
    )
}

const useInputContext = () => {
    const context = useContext(InputContext);

    if (!context) {
        throw new Error('useInputContext must be used within a MessageContextProvider');
    }

    return context;
}
export { useInputContext }
export default MessageContextProvider;

