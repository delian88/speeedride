import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { UserRole } from './types';
import { Button } from './components/Button';
import RiderDashboard from './pages/RiderDashboard';
import DriverDashboard from './pages/DriverDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { LandingPage } from './pages/LandingPage';
import { ChatBot } from './components/ChatBot';
import { ArrowLeft } from 'lucide-react';

// Login Page Component
const LoginPage = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (role: UserRole) => {
    setIsLoading(true);
    login(role);
    // Loading handled by auth context effect in real app, mock here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans relative">
      <button 
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 p-2 hover:bg-gray-200 rounded-full transition-colors"
      >
        <ArrowLeft className="w-6 h-6 text-gray-600" />
      </button>
      
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-2 tracking-tighter">Speedride<span className="text-blue-600">.</span></h1>
        <p className="text-gray-500 mb-8">Move fast, ride safe.</p>
        
        <div className="space-y-4">
          <div className="p-5 border rounded-xl hover:border-black hover:shadow-md transition-all cursor-pointer group text-left flex items-center" onClick={() => handleLogin(UserRole.RIDER)}>
             <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-black group-hover:text-white transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
             </div>
             <div>
                <h3 className="font-bold text-lg group-hover:text-black">Continue as Rider</h3>
                <p className="text-sm text-gray-400">Book rides instantly</p>
             </div>
          </div>
          
          <div className="p-5 border rounded-xl hover:border-blue-600 hover:shadow-md transition-all cursor-pointer group text-left flex items-center" onClick={() => handleLogin(UserRole.DRIVER)}>
             <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
             <div>
                <h3 className="font-bold text-lg group-hover:text-blue-600">Continue as Driver</h3>
                <p className="text-sm text-gray-400">Earn money driving</p>
             </div>
          </div>

          <div className="pt-6 mt-4 border-t">
             <button onClick={() => handleLogin(UserRole.ADMIN)} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
               Access Admin Panel
             </button>
          </div>
        </div>

        {isLoading && <p className="mt-4 text-sm text-blue-500 animate-pulse font-medium">Logging in...</p>}
      </div>
    </div>
  );
};

// Protected Route
const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role?: UserRole }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    // If user tries to access wrong dashboard, redirect to their own
    if (user?.role === UserRole.ADMIN) return <Navigate to="/admin" replace />;
    if (user?.role === UserRole.DRIVER) return <Navigate to="/driver" replace />;
    return <Navigate to="/rider" replace />;
  }

  return <>{children}</>;
};

// Logged In Redirect (prevents accessing login/landing if already logged in - Optional)
// We allow accessing landing page even if logged in, but login page might redirect
const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  if (isAuthenticated && user) {
    if (user.role === UserRole.ADMIN) return <Navigate to="/admin" replace />;
    if (user.role === UserRole.DRIVER) return <Navigate to="/driver" replace />;
    return <Navigate to="/rider" replace />;
  }
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthRedirect><LoginPage /></AuthRedirect>} />
      
      <Route path="/rider" element={<ProtectedRoute role={UserRole.RIDER}><RiderDashboard /></ProtectedRoute>} />
      <Route path="/driver" element={<ProtectedRoute role={UserRole.DRIVER}><DriverDashboard /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute role={UserRole.ADMIN}><AdminDashboard /></ProtectedRoute>} />
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <AppRoutes />
        <ChatBot />
      </HashRouter>
    </AuthProvider>
  );
};

export default App;