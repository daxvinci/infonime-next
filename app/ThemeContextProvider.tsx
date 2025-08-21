"use client"

import { useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { UserDetails } from "./lib/types";

type ThemeContextProps = {
    children:React.ReactNode;
}



export const ThemeContextProvider = ({children}:ThemeContextProps) => {
    const [darkmode,setDarkMode] = useState<boolean>(true)
    const [loading,setLoading] = useState<boolean>(true)
    const [searchValue, setSearchValue] = useState<string>('')
    const [user,setUser] = useState<UserDetails | undefined>(undefined)


    return (
      <ThemeContext.Provider
        value={{
          darkmode,
          setDarkMode,
          loading,
          setLoading,
          searchValue,
          setSearchValue,
          user,
          setUser,
        }}
      >
        {children}
      </ThemeContext.Provider>
    );
}


 
export default ThemeContextProvider;