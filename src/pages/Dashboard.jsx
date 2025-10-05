import React from 'react';
import { Link } from 'react-router-dom';
import { FileCode, Bug, Database, Zap } from 'lucide-react';

const Dashboard = () => {
  const features = [
    {
      name: 'Code Generation',
      description: 'Generate code in multiple programming languages from natural language descriptions',
      icon: FileCode,
      path: '/code-generator',
      color: 'bg-blue-500',
    },
    /*{
      name: 'SQL Query Generator',
      description: 'Create optimized SQL queries for various database systems',
      icon: Database,
      path: '/sql-generator',
      color: 'bg-green-500',
    },*/
    {
      name: 'Code Debugger',
      description: 'Identify and fix bugs in your code with AI-powered analysis',
      icon: Bug,
      path: '/debugger',
      color: 'bg-red-500',
    },
    {
      name: 'Code Explainer',
      description: 'Get detailed explanations of how your code works',
      icon: Zap,
      path: '/debugger',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to AI Code Generator</h1>
        <p className="text-gray-600 mt-2">Your AI-powered coding assistant for generating and debugging code</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.name}
              to={feature.path}
              className="block bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg ${feature.color} text-white`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-4">{feature.name}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="text-gray-500 text-center py-8">
          <p>Your recent code generation and debugging activities will appear here.</p>
        </div>
      </div>
    </div>
  );
};
// Add mobile wrapper classes
<div className="dashboard-mobile">
  <div className="mobile-grid">
    {/* Your content */}
  </div>
</div>

export default Dashboard;