import React from "react";
import Image from "../Components/Image";

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Carlos
        </h1>
        <p className="text-xl text-gray-600">
          Cybersecurity Specialist & Data Analyst
        </p>
      </div>

      {/* Introduction */}
      <div className="prose prose-lg max-w-none mb-16">
        <p className="text-gray-700 leading-relaxed">
          Hello! I'm Carlos, a passionate cybersecurity professional with a deep interest in 
          Security Information and Event Management (SIEM) and data analysis. My journey in 
          the tech world is driven by a constant curiosity about how we can better protect 
          and understand our digital landscape.
        </p>
      </div>

      {/* Expertise Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="text-blue-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Cybersecurity</h3>
          <p className="text-gray-600">
            Specialized in threat detection, incident response, and security architecture. 
            Passionate about protecting systems and data from emerging threats.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="text-blue-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Data Analysis</h3>
          <p className="text-gray-600">
            Expert in transforming complex data into actionable insights. 
            Skilled in data visualization and statistical analysis.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="text-blue-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">SIEM</h3>
          <p className="text-gray-600">
            Proficient in Security Information and Event Management systems. 
            Experienced in log analysis and security monitoring.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-blue-50 p-8 rounded-xl mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">My Mission</h2>
        <p className="text-gray-700">
          I'm dedicated to helping organizations strengthen their security posture through 
          innovative solutions and data-driven insights. My goal is to bridge the gap between 
          security and business objectives, ensuring that security measures enhance rather than 
          hinder organizational growth.
        </p>
      </div>

      {/* Contact Section */}
      <div className="text-center flex flex-col items-center space-y-4 px-4 pt-2 pb-8r">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Let's Connect</h2>
        <p className="text-gray-600 mb-6">
          I'm always interested in discussing cybersecurity, data analysis, and SIEM solutions.
        </p>
        <div className="flex space-x-6">
          {/* LinkedIn */}
          <a 
            href="https://www.linkedin.com/in/carlos-marzal/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center space-x-2 bg-gray-500 hover:bg-gray-800 backdrop-blur-sm rounded-xl px-4 py-3 transition-all duration-300 hover:scale-105 border border-white/20"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span className="text-white font-medium">LinkedIn</span>
          </a>
          
          {/* GitHub */}
          <a 
            href="https://github.com/cMarzal" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center space-x-2 bg-gray-500 hover:bg-gray-800 backdrop-blur-sm rounded-xl px-4 py-3 transition-all duration-300 hover:scale-105 border border-white/20"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="text-white font-medium">GitHub</span>
          </a>

          {/* Email */}
          <a 
            href="mailto:cmr.maro@gmail.com" 
            className="group flex items-center space-x-2 bg-gray-500 hover:bg-gray-800 backdrop-blur-sm rounded-xl px-4 py-3 transition-all duration-300 hover:scale-105 border border-white/20"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-white font-medium">Email</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;