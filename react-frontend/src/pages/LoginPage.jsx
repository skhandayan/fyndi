import { useState } from "react"
import { ArrowLeft, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from '../store/authStore'

import AnimatedContent from "../components/AnimatedContent"
import Background from "../components/Background"
import Input from "../components/Input";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await login(email, password);

      if (loggedInUser.isVerified) {
        toast.success(`Welcome back, ${loggedInUser.firstName}`);
        navigate("/home");
      } else {
        toast.error("Please verify your email first");      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Background />

      <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
        <Link
          to="/"
          className="flex items-center px-3 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm hover:bg-gray-100 transition text-sm sm:text-base"
        >
          <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          <span className="ml-2 font-medium text-blue-600 hidden xs:inline">
            Back
          </span>
        </Link>
      </div>

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
                {isLoading ? "Logging In..." : "Login"}
              </button>

              <div className='py-4 flex justify-center'>
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
