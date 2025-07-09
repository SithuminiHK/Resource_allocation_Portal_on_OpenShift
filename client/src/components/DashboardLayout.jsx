import { useState, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import LogoutButton from '../components/LogoutButton';

export default function DashboardLayout({ 
  roleName, 
  children,
  welcomeMessage 
}) {
  const { keycloak } = useKeycloak();
  const [showWelcome, setShowWelcome] = useState(true);
  const username = keycloak.tokenParsed?.preferred_username || 'User';

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showWelcome) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        {/* Image container - added flex-col and padding */}
        <div className="mb-8 animate-pulse"> {/* Added bounce animation */}
          <img 
            src="/logo.png" 
            alt="Company Logo"
            className="h-32 w-auto" // Adjust size as needed
          />
        </div>

        {/* Welcome message */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-green-600 mb-4 animate-pulse">
            {welcomeMessage} {username}
          </h1>
          <p className="text-gray-600">Loading your {roleName.toLowerCase()} dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className>
            <img 
              src="/public/logo.png" 
              alt="Company Logo"
              className="h-10 w-auto" //size 
            />
          </div>
          <h1 className="text-2xl font-bold text-blue-600">Cloud Resources {roleName} Dashboard</h1>
          <LogoutButton />
        </div>
      </header>

      {/* User Info */}
      <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
        <p className="text-gray-600">Welcome back, <span className="font-medium text-green-600">{username}</span></p>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <a href="#" className="border-blue-500 text-blue-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              Compute Resources
            </a>
            <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              Storage
            </a>
            <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              Networking
            </a>
            <div className="flex-1 flex justify-end">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="block w-full pl-4 pr-12 py-2 border border-gray-300 rounded-md text-sm focus:ring-red-500 focus:border-red-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          {children}
        </div>
      </main>
    </div>
  );
}