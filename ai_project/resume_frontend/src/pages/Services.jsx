import React from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-white shadow-md py-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Our Services</h1>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold">Solutions Tailored for You</h2>
          <p className="text-lg mt-4">Empowering job seekers with AI-driven resume building solutions.</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Our AI Resume Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">AI-Powered Resume Generation</h3>
              <p className="text-gray-600">Create professional resumes instantly with AI suggestions.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">ATS-Friendly Formatting</h3>
              <p className="text-gray-600">Optimize your resume to pass Applicant Tracking Systems.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">Personalized Resume Templates</h3>
              <p className="text-gray-600">Choose from multiple templates customized for your industry.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-16 text-center">
        <h2 className="text-4xl font-bold">Ready to Elevate Your Career?</h2>
        <p className="text-lg mt-4">Get started with our AI-powered resume builder today.</p>
        <button 
          className="mt-6 px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-gray-200"
          onClick={() => navigate('/generate-resume')}
        >
          Create My Resume
        </button>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-12">
        <p className="text-lg">&copy; 2025 Our Company. All Rights Reserved.</p>
      </footer>
    </div>
  );
};


export default Services;
