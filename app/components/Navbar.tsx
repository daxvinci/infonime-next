"use client"

import  Link  from "next/link";
import { useThemeContext } from "../ThemeContext";
import { FaBars, FaTimes } from 'react-icons/fa';
import React, { useEffect, useRef, useState } from "react";
import * as motion from "motion/react-client"

const Navbar = () => {
        const {darkmode} = useThemeContext()
        const [isOpen, setIsOpen] = useState<boolean>(false);
        const [isSticky, setIsSticky] = useState<boolean>(false); // State for sticky navbar
        const [prevScrollY, setPrevScrollY] = useState<number>(0);
        const navRef = useRef<HTMLDivElement>(null)

        const toggleDropdown = () => {
            setIsOpen(!isOpen);
          };

        const handleChange =(e:React.SyntheticEvent)=>{
          const {value} = e.target as HTMLInputElement;
          console.log(value)
        }

          const handlePage =()=>{
            localStorage.setItem('homePersist','0')
          }

          useEffect(() => {
            const handleScroll = () => {
              const currentScrollY = window.scrollY;
        
              if (currentScrollY === 0) {
                // User has scrolled to the top of the page
                setIsSticky(false); // Reset sticky state
              } else if (currentScrollY > prevScrollY) {
                // Scrolling down
                setIsSticky(false);
              } else if (currentScrollY < prevScrollY) {
                // Scrolling up
                setIsSticky(true);
              }
        
              setPrevScrollY(currentScrollY); // Update previous scroll position
            };
        
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
          }, [prevScrollY]);
    
    return ( 
        <>
        {/* Placeholder to preserve navbar space */}

        {isSticky && <div className="bg-gray-800" style={{ height: navRef.current?.offsetHeight || 0 }} />}

         <motion.nav 
         ref={navRef} 
         className={`flex flex-col sm:flex-row ${
        isSticky ? 'fixed top-0' : 'relative'
      } right-0 left-0 z-50 shadow-2xl ${
        darkmode ? 'text-white bg-black' : 'text-black bg-white'
      } sm:justify-between sm:items-center gap-4 p-6 `}
      initial={{ y: -100 }} // Initial position (off-screen)
      animate={{
        y: isSticky || prevScrollY === 0 ? 0 : -100, // Animate to 0 when sticky, off-screen otherwise
      }}
      transition={{
        type: 'spring', // Use spring animation for bounce effect
        stiffness: 200, // Adjust stiffness for bounce intensity
        damping: 10, // Adjust damping for bounce smoothness
      }}
      >
      {/* Logo */}
      <div className="flex justify-between items-center">
        <Link onClick={handlePage} href="/">
          <h2 className="text-3xl">Infonime</h2>
        </Link>
        {/* Hamburger Icon (Mobile Only) */}
        <button
          onClick={toggleDropdown}
          className="sm:hidden focus:outline-none cursor-pointer"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Nav Links and Search (Desktop) */}
      <div className="nav-links hidden sm:flex sm:justify-between sm:flex-row gap-6 sm:w-[50%]">
        <div className="links flex flex-col text-xl sm:justify-between sm:flex-row gap-4 sm:gap-16">
          <Link href="/popular">Popular</Link>
          <Link href="/genre">Genre</Link>
        </div>
        <div className="search w-[90%] sm:w-[60%]">
          <input
            className={`outline-none border ${darkmode ? 'placeholder:text-gray' : 'placeholder:text-black'} placeholder:italic rounded-2xl w-full px-2 py-1 ring-blue-500`}
            type="search"
            name="search"
            placeholder="search..."
            id="search"
          />
        </div>
      </div>

      {/* Dropdown Menu (Mobile Only) */}
      {isOpen && (
        <div className="sm:hidden flex flex-col gap-4 mt-4">
          <Link href="/popular" className="text-xl">
            Popular
          </Link>
          <Link href="/genre" className="text-xl">
            Genre
          </Link>
          <div className="search w-full">
            <input
              className={`outline-none border ${darkmode ? 'placeholder:text-gray' : 'placeholder:text-black'} placeholder:italic rounded-2xl w-full px-2 py-1 ring-blue-500`}
              type="search"
              name="search"
              placeholder="search..."
              id="search"
              onChange={(e)=>handleChange(e)}
            />
          </div>
        </div>
      )}
    </motion.nav>
        </>
     );
}
 
export default Navbar;