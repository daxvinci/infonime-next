// import Image from "next/image";
"use client"

import { useEffect } from "react";
import { useThemeContext } from "./ThemeContext";
import Home from "./home/page";

export default function Index() {

  const {darkmode,setDarkMode=()=>{}} = useThemeContext()



  useEffect(()=>{
    const theme = localStorage.getItem('theme');
    if(theme){
      const setMode =(theme:string)=>{
        if(theme !== 'light'){
          setDarkMode(false);
        }else{
          setDarkMode(true)
        }
      }
      setMode(theme);
    }
  },[setDarkMode])

  return (
    <>

      <div className={`${darkmode ? 'bg-gray-800': 'bg-[#f9f9f9]'}`}>
        <Home/>
      </div>

    </>
  );
}

