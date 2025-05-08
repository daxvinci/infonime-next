"use client"

import * as motion from "motion/react-client"
import { useThemeContext } from '../ThemeContext';



// type Dark = {
//     setDarkMode:React.Dispatch<React.SetStateAction<boolean>>,
//     darkmode:boolean
// }

const container = {
    width: 40,
    height: 20,
    backgroundColor: "#e6ccff",
    borderRadius: 50,
    cursor: "pointer",
    display: "flex",
    padding: 0,
}

const handle = {
    width: 20,
    height: 20,
    backgroundColor: "#9911ff",
    borderRadius: "50%",
}

const Footer = () => {
    const {darkmode,setDarkMode=()=>{}} = useThemeContext()


    const toggleTheme = ()=>{
        setDarkMode(!darkmode);
        localStorage.setItem('theme',darkmode ? 'dark':'light')
    }
    const year:Date = new Date
    return (
      <>
        <footer
          className={`flex gap-4 shadow-2xl ${
            darkmode
              ? "bg-gray-800 text-amber-50"
              : "bg-[#f9f9f9] text-gray-700"
          } justify-end p-6`}
        >
          <p className="self-center">
            &copy; {year.getFullYear()}{" "}
            <a href="https://daxvinci.github.io/portfolio/" className="border-b">Davinci</a> All
            rights reserved.
          </p>
          <div className="hover:cursor-pointer flex justify-center items-center gap-2">
            <p className="text-gray-400">{darkmode ? "Light" : "Dark"}</p>
            <button
              className="toggle-container"
              style={{
                ...container,
                justifyContent: "flex-" + (darkmode ? "start" : "end"),
              }}
              onClick={toggleTheme}
            >
              <motion.div
                className="toggle-handle"
                style={handle}
                transition={{
                  type: "spring",
                  visualDuration: 0.2,
                  bounce: 0.2,
                }}
              />
            </button>
          </div>
        </footer>
      </>
    );
}
 
export default Footer;