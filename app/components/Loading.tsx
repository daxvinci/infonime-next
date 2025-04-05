"use client"

import * as motion from "motion/react-client"
import { useThemeContext } from '../ThemeContext';


const Loading = () => {
    const {darkmode} = useThemeContext()
    
    return ( 
        <div className={`${darkmode ? 'bg-black text-amber-50 ': 'bg-[#f9f9f9] text-gray-700'} h-screen fixed inset-0 bg-opacity-50 flex flex-col items-center justify-center`}>
        {/* Spinner Container */}
        <motion.div
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        {/* Loading Text */}
        <p className="mt-4 text-blue-500">Loading...</p>
      </div>
     );
}
 
export default Loading;