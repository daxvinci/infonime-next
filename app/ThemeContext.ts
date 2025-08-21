"use client"

import { useContext,createContext } from "react";
import { ContextType } from "./lib/types";


export const ThemeContext = createContext<ContextType | null>(null)


export const useThemeContext =()=>{
    const context = useContext(ThemeContext)
    if(!context) {
        throw new Error('Error context not truthy');
    }
    return context;
}