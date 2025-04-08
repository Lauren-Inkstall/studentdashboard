import React from 'react';
import { LogIn, Lock, Mail } from 'lucide-react';

const LoginForm = () => {
  return (
    <div style={{ background: "linear-gradient(to bottom right, #ffcc0075, #fff)", width: "100vw"}} className="min-h-screen flex bg-gradient-to-br from-#ffcc00/20 to-#ffcc00/10 flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="card backdrop-blur-sm bg-white p-8 form-appear">
          <div className="flex flex-col items-center justify-center mb-12">
            <img 
              src="https://static.wixstatic.com/shapes/abaee8_dc6d6d64fba440848d2b9769e4f2e998.svg" 
              alt="Inkstall Logo" 
              className="w-48 h-auto mb-6"
            />
            <p className="mt-2 text-sm text-gray-600">Education Dashboard</p>
          </div>

          <form className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#ffcc00] hover:bg-[#ffcc09] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <LogIn className="h-5 w-5 mr-2" />
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;