"use client"
import { useThemeContext } from "@/app/ThemeContext"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Profile = () => {
    const router = useRouter()
    const {setUser=()=>{},user} = useThemeContext()

    const handleSignOut =()=>{
        localStorage.removeItem("Otoken")
        setUser(undefined)
        router.replace("/")
    }

    return (
      <>
        {user ? (
          <div className="profile p-4">
            <h1 className="text-4xl">Profile</h1>
            <button
              onClick={handleSignOut}
              className="sing-out px-2 hover:cursor-pointer active:translate-y-2 duration-300 transition-all py-1 rounded-2xl bg-red-500 text-black"
            >
              sign out
            </button>
          </div>
        ) : (
          <div className="profile p-4">
            <h1 className="text-4xl">Profile</h1>
            <Link
              href="/"
              className="sing-out px-2 hover:cursor-pointer active:translate-y-2 duration-300 transition-all py-1 rounded-2xl bg-green-400 text-black"
            >
              sign in
            </Link>
          </div>
        )}
      </>
    );
}
 
export default Profile;