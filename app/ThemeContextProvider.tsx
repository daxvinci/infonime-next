"use client"

import { useState } from "react";
import { ThemeContext } from "./ThemeContext";

type ThemeContextProps = {
    children:React.ReactNode;
}



export const ThemeContextProvider = ({children}:ThemeContextProps) => {
    const [darkmode,setDarkMode] = useState<boolean>(true)
    const [loading,setLoading] = useState<boolean>(true)


    return <ThemeContext.Provider value={{darkmode,setDarkMode,loading,setLoading}}>{children}</ThemeContext.Provider>
}


 
export default ThemeContextProvider;