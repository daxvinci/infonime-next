"use client"

import { useContext,createContext } from "react";
import { Bool } from "./lib/types";


export const ThemeContext = createContext<Bool | null>(null)


export const useThemeContext =()=>{
    const context = useContext(ThemeContext)
    if(!context) {
        throw new Error('Error context not truthy');
    }
    return context;
}