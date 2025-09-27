import { useState } from "react"
import { Lock, Mail } from "lucide-react";
import { Link } from "react-router";
import { useAuthStore } from '../store/authStore'

import AnimatedContent from "../components/AnimatedContent"
import Background from "../components/Background"
import Input from "../components/Input";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login( email, password);
    toast.success(`Welcome back ${email}`);
  }

  return (
    <>
      <Background />

      <div className="flex items-center justify-center h-dvh">
        <AnimatedContent
          distance={200}
          direction="vertical"
          reverse={false}
          duration={0.8}
          ease="power3.out"
          initialOpacity={6}
          animateOpacity
          scale={1.1}
          threshold={0.2}
          delay={0.2}
        >
          <div className="max-w-md w-full md:w-screen p-8 border bg-white/70 border-blue-200 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
          >
            <h2 className='text-3xl font-bold mb-6 text-center text-blue-500'>Login</h2>
            <form onSubmit={handleLogin}>
              <Input
                icon={Mail}
                type='email'
                placeholder='Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                icon={Lock}
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p className="text-red-500 font-medium text-xs mt-2">{error}</p>}

              <div className="flex items-center justify-end mt-3">
                <Link to='/forgot-password' className='text-xs text-blue-500 font-medium hover:underline'>
                  Forgot Password?
                </Link>
              </div>

              <button
                className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-[#10DE8F] to-[#3FAFFF] text-white 
                font-bold rounded-lg shadow-lg hover:opacity-80 transition duration-200 cursor-pointer'
                type='submit'
              >
                {isLoading ? "Loging In..." : "Login"}
              </button>

              <div className='px-8 py-4 flex justify-center'>
                <p className='text-xs text-gray-600'>
                  Don't have an account yet?{" "}
                  <Link to={"/signup"} className='text-blue-500 font-medium hover:underline'>
                    Create One
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </AnimatedContent>
      </div>
    </>
  )
}

export default LoginPage
