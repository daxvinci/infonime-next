"use client"
import Loading from "@/app/components/Loading"
import { useThemeContext } from "@/app/ThemeContext"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Profile = () => {

    const router = useRouter()
    const {setUser=()=>{},user,loading,setLoading=()=>{},darkmode} = useThemeContext()
    const [newUsername, setNewUsername] = useState<string | undefined>(user?.username);
    const [nameLoading, setNameLoading] = useState<boolean>();

    const handleSignOut =()=>{
        localStorage.removeItem("Otoken")
        setUser(undefined)
        router.replace("/")
    }

    const handleUsernameChange = async (e: React.FormEvent) => {
      e.preventDefault();
      setNameLoading(true);

      try {
        const res = await axios.patch("/api/user", {newUsername}, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Otoken")}`,
          },
        });
        const patchedUser = res.data

        if (patchedUser.status !== 200) {
          const { message } = await patchedUser;
          throw new Error(message || "Something went wrong");
        }

        setUser(patchedUser);
      } catch (err: any) {
        console.log("error: " + err.message)
      } finally {
        setNameLoading(false);
      }
    };


useEffect(() => {
  setLoading(true);
  const timeout = setTimeout(() => {
    setLoading(false);
  }, 900); // simulate brief check

  return () => clearTimeout(timeout);
}, []);



        if (loading)
          return (
            <div
              className={`${
                darkmode
                  ? "bg-gray-800 text-amber-50"
                  : "bg-[#f9f9f9] text-gray-700"
              }`}
            >
              <Loading />
            </div>
          );

    return (
      <>
        {!loading && user ? (
          <div className="profile p-4 h-full">
            <div className="profile-wrap">
              <div className="profile-view">
                <h1 className="text-4xl">Profile</h1>
                <button
                  onClick={handleSignOut}
                  className="sing-out px-2 hover:cursor-pointer active:translate-y-2 duration-300 transition-all py-1 rounded-2xl bg-red-500 text-black"
                >
                  sign out
                </button>
              </div>
              <div className="profile-info">
                <form onSubmit={handleUsernameChange}>
                  <input
                    type="text"
                    name="username"
                    onChange={(e) => setNewUsername(e.target.value)}
                    defaultValue={user.username}
                    id="profile-username"
                  />
                  <input
                    type="submit"
                    value={nameLoading ? "Updating..." : "Change"}
                    disabled={nameLoading}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 disabled:opacity-50"
                  />
                </form>
                <h2 className="profile-name">Name: {user.name} </h2>
              </div>
            </div>
          </div>
        ) : (
          <div className="profile p-4 h-full sm:mt-16 flex flex-col gap-4 justify-center items-center">
            <h1 className="text-4xl font-semibold text-gray-600">
              You're not signed in
            </h1>
            <p className="text-gray-600 text-lg">
              Please sign in to access your profile and other features.
            </p>
            <Link
              href="/"
              className="px-4 py-2 rounded-full bg-green-500 text-white font-medium hover:bg-green-600 active:scale-95 transition-transform"
            >
              Sign In
            </Link>
          </div>
        )}
      </>
    );
}
 
export default Profile;