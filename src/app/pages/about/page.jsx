import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const AboutUs = () => {
  const developers = [
    { name: 'John Doe', title: 'Frontend Developer', imgSrc: '', github: '#', linkedin: '#' },
    { name: 'Jane Smith', title: 'Backend Developer', imgSrc: '', github: '#', linkedin: '#' },
    { name: 'Sam Wilson', title: 'UI/UX Designer', imgSrc: '', github: '#', linkedin: '#' },
    { name: 'Lisa Brown', title: 'Full Stack Developer', imgSrc: '', github: '#', linkedin: '#' },
    { name: 'Mike Johnson', title: 'DevOps Engineer', imgSrc: '', github: '#', linkedin: '#' },
  ];

  return (
    <section className="py-12 bg-gray-100">
      {/* About Us Section */}
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold mb-6">About Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* StockX Verified */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="/stockx-verified.png" alt="StockX Verified" className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">StockX Verified</h3>
            <p>Every item sold goes through our proprietary multi-step verification process with our team of experts.</p>
            <a href="#" className="text-green-600 mt-4 block">Learn More</a>
          </div>

          {/* Transparent Pricing */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="/transparent-pricing.png" alt="Transparent Pricing" className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
            <p>Our real-time marketplace allows you to buy and sell the most coveted items at their true market price.</p>
            <a href="#" className="text-green-600 mt-4 block">Learn More</a>
          </div>

          {/* Global Access */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="/global-access.png" alt="Global Access" className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Global Access</h3>
            <p>Our millions of customers from over 200 countries allow you to secure those hard-to-find items.</p>
            <a href="#" className="text-green-600 mt-4 block">Learn More</a>
          </div>
        </div>
      </div>

      {/* Developers Section */}
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Meet Our Developers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {developers.map((developer, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src={developer.imgSrc || '/placeholder.png'} // Fallback to a placeholder image if imgSrc is empty
                alt={developer.name}
                className="rounded-full w-24 h-24 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">{developer.name}</h3>
              <p className="text-gray-600 mb-4">{developer.title}</p>
              <div className="flex justify-center space-x-4">
                <a href={developer.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub size={24} className="text-gray-700 hover:text-black" />
                </a>
                <a href={developer.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={24} className="text-blue-600 hover:text-blue-800" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
