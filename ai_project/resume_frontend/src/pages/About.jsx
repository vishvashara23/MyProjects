import React from 'react'

function About() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-white shadow-md py-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold">We Build the Future</h2>
          <p className="text-lg mt-4">Empowering businesses with cutting-edge web solutions tailored for success.</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">Innovation</h3>
              <p className="text-gray-600">We constantly push boundaries to deliver state-of-the-art solutions.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">Scalability</h3>
              <p className="text-gray-600">Our solutions grow with your business, ensuring long-term success.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">Support</h3>
              <p className="text-gray-600">We provide round-the-clock support to ensure seamless operation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Meet Our Team</h2>
          <p className="text-gray-600 mb-8">Our team of experts is dedicated to delivering excellence.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">John Doe</h3>
              <p className="text-gray-600">CEO & Founder</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">Jane Smith</h3>
              <p className="text-gray-600">CTO</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">Alice Johnson</h3>
              <p className="text-gray-600">Lead Developer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <p className="text-gray-600">"This company transformed our business with their outstanding services!"</p>
              <h3 className="text-xl font-semibold text-gray-800 mt-4">- Michael Brown</h3>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <p className="text-gray-600">"Exceptional quality and great customer support. Highly recommend!"</p>
              <h3 className="text-xl font-semibold text-gray-800 mt-4">- Emily Davis</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-12">
        <p className="text-lg">&copy; 2025 Our Company. All Rights Reserved.</p>
      </footer>
    </div>
  )
}

export default About