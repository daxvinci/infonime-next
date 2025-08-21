"use client";

import { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useThemeContext } from "../ThemeContext";
import axios from "axios";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const {darkmode,setUser=()=>{}} = useThemeContext()

            useEffect(() => {

              async function fetchUser() {
                try{
                  const token = localStorage.getItem("Otoken");
                  if (!token) {
                    return;
                  }
                  const result = await axios.get("/api/user", {
                    headers: { Authorization: `Bearer ${token}` },
                    timeout: 20000,
                  });
                  const fetchedUser = result.data.user
                  if(fetchedUser){
                    setUser(fetchedUser)
                  }else{
                    console.log("user not fetched successfully")
                  }
  
                }catch(err:any){
                  console.log("something wrong --> " + err?.message)
                }
                
              }

              fetchUser()
            },[])
  
  return (
    <>
      <div
        className={`layout-wrapper min-h-screen ${
          darkmode ? "bg-gray-800 text-white" : "bg-[#f9f9f9] text-gray-700"
        } flex flex-col`}
      >
        <Navbar />
        <main className={`flex-1 w-full h-full`}>{children}</main>
        <Footer />
      </div>
    </>
  );
}