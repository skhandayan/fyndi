import { Routes, Route, Navigate } from "react-router";
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import PublicRoute from "./components/PublicRoute";
import LoadingSpinner from "./components/LoadingSpinner";

const App = () => {

  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) return <LoadingSpinner  />;

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <PublicRoute>
              <SignUpPage />
            </PublicRoute> 
          } 
        />
        <Route 
          path="/verify-email" 
          element={
            <PublicRoute>
              <EmailVerificationPage />
            </PublicRoute>
          } 
        />
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>            
          } 
        />
        <Route 
          path="/forgot-password" 
          element={
            <PublicRoute>
              <ForgotPasswordPage />
            </PublicRoute>
          } 
        />
        <Route 
          path="/reset-password/:token" 
          element={
            <PublicRoute>
              <ResetPasswordPage />
            </PublicRoute>          
          } 
        />

        {/* Protected Route */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: "",
          style: {
            width: "90%",
            maxWidth: "420px",  
            borderRadius: "12px",
            padding: "12px 16px",
            fontSize: "14px",
          },
          success: {
            style: {
              background: "#ECFDF5",
              color: "#065F46",
              border: "1px solid #34D399",
              fontWeight: "500",
            },
            iconTheme: {
              primary: "#10B981",
              secondary: "#ffffff",
            },
          },
          error: {
            style: {
              background: "#FEF2F2",
              color: "#991B1B",
              border: "1px solid #F87171",
            },
            iconTheme: {
              primary: "#EF4444",
              secondary: "#ffffff",
            },
          },
        }}
      />

    </>
  );
};

export default App;


