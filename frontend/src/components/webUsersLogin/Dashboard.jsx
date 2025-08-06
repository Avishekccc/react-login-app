import React from "react";
import NavLinks from "../router/NavLinks";
// import MyLink from '../../dashboard/MyLink'

const Dashboard = () => {
  const stats = [
    {
      label: "Total Users",
      value: "1,234",
      icon: "👥",
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Active Sessions",
      value: "89",
      icon: "🔄",
      color: "from-green-500 to-green-600",
    },
    {
      label: "System Status",
      value: "Online",
      icon: "✅",
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Last Login",
      value: "Today",
      icon: "🕒",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const features = [
    {
      title: "User Management",
      description:
        "Complete user registration, authentication, and profile management system.",
      icon: "👤",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Security Features",
      description:
        "Password encryption, session management, and secure authentication.",
      icon: "🔒",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Admin Dashboard",
      description:
        "Comprehensive admin panel for managing users and system settings.",
      icon: "📊",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Responsive Design",
      description:
        "Mobile-first design that works seamlessly across all devices.",
      icon: "📱",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl shadow-2xl p-8 lg:p-12 mb-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <span className="text-2xl">🖥️</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Welcome to the Dashboard
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-6 leading-relaxed">
              A comprehensive Login Management System built to demonstrate
              modern web development skills and best practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                Get Started
              </button>
              <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-700 transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center text-white text-xl`}
                >
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              System Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore the comprehensive features built into this login
              management system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center text-white text-xl flex-shrink-0`}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Portfolio Project
          </h3>
          <p className="text-gray-600 mb-4">
            This project showcases modern web development techniques including
            React, TypeScript, responsive design, and user authentication.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "React",
              "Tailwind CSS",
              "Authentication",
              "Responsive Design",
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
