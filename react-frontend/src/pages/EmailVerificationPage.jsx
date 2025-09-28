import { useEffect, useRef, useState } from "react";
import AnimatedContent from "../components/AnimatedContent"
import Background from "../components/Background"
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

const EmailVerificationPage = () => {
  const [code, setCode] = useState([  "", "", "", "", "", "" ]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const {error, isLoading, verifyEmail} = useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];

    if(value.length > 1) {
      const pasteCode = value.slice(0, 6).split('');
      for(let i = 0; i < 6; i++) {
        newCode[i] = pasteCode[i] || "";
      }
      setCode(newCode);
      
      // Focus the next empty input or the last one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();

    } else {
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  }

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join('');
    try {
      await verifyEmail(verificationCode);
      navigate("/home");
      toast.success("Email verified successfully", { duration: 2000 });
    } catch (error) {
      console.log(error);
      toast.error("Email verification failed. Please try again.");

    }
  }
  
  useEffect(() => {
    if(code.every(digit => digit !== "")) {
      // Automatically submit the form if all digits are filled
      handleSubmit(new Event('submit'));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[code]);

  return (
    <div>
      <Background />

      <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
        <Link
          to="/signup"
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
          <div className='max-w-md w-full md:w-screen p-8 border bg-white/70  border-blue-200 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
          >
            <h2 className='text-3xl font-bold mb-6 text-center text-blue-500'>Verify Your Email</h2>
            <p className="text-xs text-gray-500 text-center mt-2 mb-5">
              We've sent a 6-digit verification code to your email. <br />
              Please enter it below to continue.
            </p>

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='flex justify-between'>
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type='text'
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className='w-12 h-12 text-center text-2xl font-bold bg-white text-black border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none'
                  />
                ))}
              </div>
              {error && <p className="text-red-500 text-center text-xs font-medium">{error}</p>}
              <button
                className='w-full py-3 px-4 bg-gradient-to-r from-[#10DE8F] to-[#3FAFFF] text-white 
                font-bold rounded-lg shadow-lg hover:opacity-80 transition duration-200 cursor-pointer'
                type='submit'
              >
                {isLoading ? "Verifying..." : "Verify"}
              </button>
            </form>

            {/* Extra info */}
            <p className="text-xs text-gray-500 text-center mt-4">
              Didn’t get the email?{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline font-medium"
              >
                Resend code
              </a>
            </p>
          </div>
        </AnimatedContent>
      </div>
    </div>
  )
}

export default EmailVerificationPage

