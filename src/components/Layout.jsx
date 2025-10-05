import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FileCode, Database, Bug, LogOut, User, Code, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    {
      path: '/',
      name: 'Dashboard',
      icon: Code,
      color: 'gray'
    },
    {
      path: '/code-generator',
      name: 'Code Generator',
      icon: FileCode,
      color: 'blue'
    },
    /*{
      path: '/sql-generator',
      name: 'SQL Generator',
      icon: Database,
      color: 'green'
    },*/
    {
      path: '/debugger',
      name: 'Debugger',
      icon: Bug,
      color: 'purple'
    }
  ];

  // Fixed color classes - using explicit classes instead of template strings
  const getNavItemClass = (item, isActive) => {
    const baseClass = "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors";
    
    if (isActive) {
      const colorClasses = {
        blue: 'bg-blue-100 text-blue-700',
        green: 'bg-green-100 text-green-700',
        purple: 'bg-purple-100 text-purple-700',
        gray: 'bg-gray-100 text-gray-700'
      };
      return `${baseClass} ${colorClasses[item.color] || colorClasses.blue}`;
    }
    
    return `${baseClass} text-gray-600 hover:text-gray-900 hover:bg-gray-100`;
  };

  const getMobileNavItemClass = (item, isActive) => {
    const baseClass = "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors w-full";
    
    if (isActive) {
      const colorClasses = {
        blue: 'bg-blue-100 text-blue-700 border-l-4 border-blue-500',
        green: 'bg-green-100 text-green-700 border-l-4 border-green-500',
        purple: 'bg-purple-100 text-purple-700 border-l-4 border-purple-500',
        gray: 'bg-gray-100 text-gray-700 border-l-4 border-gray-500'
      };
      return `${baseClass} ${colorClasses[item.color] || colorClasses.blue}`;
    }
    
    return `${baseClass} text-gray-600 hover:text-gray-900 hover:bg-gray-100`;
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Desktop Menu */}
            <div className="flex items-center">
              <Link 
                to="/" 
                className="text-xl font-bold text-gray-900 flex items-center gap-2"
                onClick={closeMobileMenu}
              >
                <Code className="h-6 w-6 text-blue-600" />
                AI Code Tools
              </Link>
              
              {/* Desktop Navigation Items */}
              <div className="hidden md:flex ml-10 space-x-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={getNavItemClass(item, isActive)}
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* User Section */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  {/* Desktop User Info */}
                  <span className="hidden sm:flex text-sm text-gray-700 items-center gap-1">
                    <User className="h-4 w-4" />
                    {user.email}
                  </span>
                  
                  {/* Desktop Logout */}
                  <button
                    onClick={handleLogout}
                    className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>

                  {/* Mobile Menu Button */}
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </button>
                </>
              ) : (
                <div className="flex space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-3 space-y-2">
              {/* Mobile Navigation Items */}
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={getMobileNavItemClass(item, isActive)}
                    onClick={closeMobileMenu}
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
              
              {/* Mobile User Info and Logout */}
              {user && (
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700">
                    <User className="h-4 w-4" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Bottom Navigation - Alternative Approach */}
      <div className="md:hidden bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-40">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 pb-20 md:pb-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;