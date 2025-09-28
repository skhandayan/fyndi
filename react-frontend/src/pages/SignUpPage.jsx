import React from 'react'
import Background from '../components/Background'
import AnimatedContent from '../components/AnimatedContent'
import { useState } from 'react';
import { ArrowLeft, Loader, Lock, LockIcon, Mail, User } from 'lucide-react';
import Input from '../components/Input';
import { Link, useNavigate } from 'react-router';
import PasswordStrengthMeter from '../components/PasswordStrenghtMeter';
import { useAuthStore } from '../store/authStore';
import toast from "react-hot-toast"; 

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();
  const { signup, isLoading } = useAuthStore();

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  let typingTimeout = null;

  // Handle typing
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsTyping(true);
    if (typingTimeout) clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  const validatePassword = (password) => {
    return (
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    );
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setFormError("");

    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    if (!validatePassword(password)) {
      setFormError("Password does not meet all requirements");
      return;
    }

    try {
      await signup(firstName, lastName, email, password, confirmPassword);

      toast.success("Account created successfully! Please verify your email.", { duration: 2000 });

      navigate("/verify-email");
    } catch (error) {
      setFormError(error.response?.data?.message || "Error creating account");
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
          <div className="max-w-md w-full md:w-screen p-8 border bg-white/70 border-blue-200 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">Create Account</h2>

            <form onSubmit={handleSignUp}>
              <Input
                icon={User}
                type="text"
                placeholder="First Name"
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                icon={User}
                type="text"
                placeholder="Last Name"
                value={lastName}
                required
                onChange={(e) => setLastName(e.target.value)}
              />
              <Input
                icon={Mail}
                type="email"
                placeholder="Email Address"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                icon={Lock}
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={handlePasswordChange}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
              />

              {(isPasswordFocused || isTyping) && <PasswordStrengthMeter password={password} />}

              <Input
                icon={LockIcon}
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {/* Show validation error under password section */}
              {formError && (
                <p className="text-xs ml-1 text-red-500 mt-3 mb-5">{formError}</p>
              )}

              <p className="text-[10px] text-gray-600 my-4">
                <label className="flex items-center cursor-pointer space-x-2">
                  <input type="checkbox" required className="form-checkbox" />
                  <span>
                    You agree to Fyndi's{" "}
                    <a href="/terms" className="text-blue-500 font-medium hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-blue-500 font-medium hover:underline">
                      Privacy Policy
                    </a>.
                  </span>
                </label>
              </p>

              <button
                className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-[#10DE8F] to-[#3FAFFF] text-white 
                font-bold rounded-lg shadow-lg hover:opacity-80 transition duration-200 cursor-pointer"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Sign Up"}
              </button>

              <div className="py-4 flex justify-center">
                <p className="text-xs text-gray-600">
                  Already have an account?{" "}
                  <Link to={"/login"} className="text-blue-500 font-medium hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </AnimatedContent>
      </div>
    </>
  );
};

export default SignUpPage


