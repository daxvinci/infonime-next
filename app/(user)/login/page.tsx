"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UserLogin = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", form, {
        timeout: 20000,
      });
      if (response.data.success) {
        localStorage.setItem("Otoken", response.data.token);
        router.push("/home");
      }
      // alert(response.data.message);
      setIsLoading(false);
      // console.log("Server response:", response.data);
    } catch (error:any) {
      setIsLoading(false);
      if (axios.isAxiosError(error) && error.code === "ECONNABORTED") {
        alert("Request timed out. Please try again.");
      }else{
        console.log(error)
        alert("Error: " + (error?.response.data.message || error?.message))
      }
      // console.error("Error Logging admin:", error);
    }
  };

  return (
    <>
      <div className="flex min-h-screen gym-bg relative items-center justify-center p-6">
        <div className="login-wallpaper absolute z-10 inset-0"/>
        <div className="login-overlay bg-black/40 absolute z-20 inset-0"/>
        <div className="backdrop-blur-lg bg-white/10 border relative z-30 border-white/30 shadow-xl rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-center text-3xl font-bold text-black mb-6">
            Log in
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit} method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 bg-white/20 px-4 py-2 text-black placeholder-black/30 focus:ring-2 focus:ring-indigo-400"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-gray-500 hover:text-blue-600"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 bg-white/20 px-4 py-2 text-black placeholder-black/30 focus:ring-2 focus:ring-indigo-400"
                  placeholder="*****"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                  isLoading
                    ? "bg-indigo-400 cursor-not-allowed opacity-50"
                    : "bg-indigo-600 hover:bg-indigo-500 cursor-pointer"
                }`}
              >
                {isLoading ? "Loggin in..." : "Log in"}
              </button>
            </div>
          </form>
          <div className="my-4">Don't have an account?<Link href="/register" className="text-blue-500 italic ml-2">Register</Link></div>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
