"use client";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useThemeContext } from "../ThemeContext";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {darkmode} = useThemeContext()
  
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