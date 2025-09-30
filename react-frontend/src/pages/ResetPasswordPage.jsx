import Background from '../components/Background'
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate, useParams } from "react-router";
import Input from "../components/Input";
import { ArrowLeft, Lock } from "lucide-react";
import toast from "react-hot-toast";
import AnimatedContent from '../components/AnimatedContent';
import PasswordStrengthMeter from '../components/PasswordStrenghtMeter';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { resetPassword, error, isLoading, message } = useAuthStore();

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [formError, setFormError] = useState(""); // NEW
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

	const { token } = useParams();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
    setFormError("");

    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      toast.error("Failed to reset password")
      return;
    }

    if (!validatePassword(password)) {
      setFormError("Password does not meet all requirements");
      toast.error("Failed to reset password")
      return;
    }

		try {
			await resetPassword(token, password);

			toast.success("Password reset successfully, redirecting to login page...");
      
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		} catch (error) {
      console.error(error);

      const errorMsg = "Failed to reset password";

      toast.error(errorMsg);
    }

	};

  return (
    <>
      <Background />

      <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
        <Link
          to="/login"
          className="flex items-center px-3 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm hover:bg-gray-100 transition text-sm sm:text-base"
        >
          <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          <span className="ml-2 font-medium text-blue-600 hidden xs:inline">
            Back
          </span>
        </Link>
      </div>

      <div className="flex items-center justify-center h-dvh px-4">
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
          <div className="w-full max-w-md p-8 border bg-white/80 border-blue-100 backdrop-blur-xl rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-bold mb-2 text-center text-blue-600">
              Reset Password
            </h2>
            <p className="text-gray-500 text-sm text-center mb-6">
              Enter your new password below and confirm it to complete the reset.
            </p>
            {message && <p className='text-green-500 text-sm mb-4'>{message}</p>}

            <form onSubmit={handleSubmit}>
              <Input
                icon={Lock}
                type='password'
                placeholder='New Password'
                value={password}
                onChange={handlePasswordChange}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                required
              />

              {(isPasswordFocused || isTyping) && (
                <PasswordStrengthMeter password={password} />
              )}

              <Input
                icon={Lock}
                type='password'
                placeholder='Confirm New Password'
                value={confirmPassword}
                onChange={ (e) => {
                  setConfirmPassword(e.target.value);
                  if (error) {
                    setFormError("")
                  }
                      if (error) useAuthStore.setState({ error: "" });
                }}
                required
              />
              
              {formError && (
                <p className="text-xs ml-1 text-red-500 mt-3 mb-5">{formError}</p>
              )}

              {error && <p className='text-red-500 text-xs ml-1 mt-2'>{error}</p>}

              <button
                  className="w-full py-3 px-4 mt-5 bg-gradient-to-r from-[#10DE8F] to-[#3FAFFF] text-white 
                  font-bold rounded-lg shadow-lg hover:opacity-80 transition duration-200 cursor-pointer"
                  type="submit"
                >
                {isLoading ? "Resetting..." : "Set New Password"}
              </button>
              <p className="flex items-center justify-center text-xs mt-6 text-gray-600">
                <Link to="/login">
                  <ArrowLeft className="h-4 w-4 text-blue-500 mr-1" />
                </Link>
                Go back to{" "}
                <Link
                  to="/login"
                  className="ml-1 text-blue-600 font-semibold hover:underline"
                >
                  Login
                </Link>
              </p>

            </form>
          </div>
        </ AnimatedContent>
      </div>
    </>

  )
}

export default ResetPasswordPage