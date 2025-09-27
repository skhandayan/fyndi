import { useState } from "react";
import Background from "../components/Background";
import { useAuthStore } from "../store/authStore";
import AnimatedContent from "../components/AnimatedContent";
import { ArrowLeft, Mail, MailCheck } from "lucide-react";
import Input from "../components/Input";
import { Link } from "react-router";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
      toast.success("Link sent successfully")
    } catch (err) {
      console.error(err);
      toast.error("Provide your verified email")
    }
  };

  return (
    <>
      <Background />

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
              Forgot Password
            </h2>
            <p className="text-gray-500 text-sm text-center mb-8">
              Reset your password in just a few steps.
            </p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-gray-600 mb-2"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    icon={Mail}
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <p className="text-gray-500 text-xs text-center leading-relaxed">
                  Enter your registered email address and we’ll send you a
                  secure link to reset your password.
                </p>

                <button
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#10DE8F] to-[#3FAFFF] text-white 
                  font-bold rounded-lg shadow-lg hover:opacity-80 transition duration-200 cursor-pointer"
                  type="submit"
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>
                <p className="flex items-center justify-center text-xs  text-gray-600">
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
            ) : (
              <div className="text-center">
                <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MailCheck className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Check Your Inbox
                </h3>
                <p className="text-gray-500 text-xs mt-3 leading-relaxed">
                  If{" "}
                  <span className="font-semibold text-gray-700">{email}</span>{" "}
                  is associated with an account, you’ll receive a password reset
                  link shortly.
                </p>
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

              </div>
            )}
          </div>
        </AnimatedContent>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
