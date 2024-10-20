import Navbar from '@/app/components/header/Navbar';
import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const AboutUs = () => {
  const developers = [
    { name: 'Suyash Labde', title: 'Frontend Developer', imgSrc: 'https://firebasestorage.googleapis.com/v0/b/stealyourkicks.appspot.com/o/TeamImages%2FWhatsApp%20Image%202024-10-16%20at%2023.38.39.jpeg?alt=media&token=ef5daded-ca39-4381-8d32-a80c7333b3fb', github: '#', linkedin: '#' },
    { name: 'Vaibhav Sutar', title: 'Backend Developer', imgSrc: 'https://firebasestorage.googleapis.com/v0/b/stealyourkicks.appspot.com/o/TeamImages%2FWhatsApp%20Image%202024-10-16%20at%2023.37.37.jpeg?alt=media&token=d2eca631-c625-48ca-a5bc-c24f92e9be7d', github: '#', linkedin: '#' },
    { name: 'Mrudul Khandve', title: 'UI/UX Designer', imgSrc: 'https://firebasestorage.googleapis.com/v0/b/stealyourkicks.appspot.com/o/TeamImages%2FWhatsApp%20Image%202024-10-16%20at%2023.29.12.jpeg?alt=media&token=60b6129a-c639-4716-a164-a91967324f4d', github: '#', linkedin: '#' },
    { name: 'Joshua Binoy', title: 'Assistant Frontend Developer', imgSrc: 'https://firebasestorage.googleapis.com/v0/b/stealyourkicks.appspot.com/o/TeamImages%2FWhatsApp%20Image%202024-10-16%20at%2023.36.58.jpeg?alt=media&token=31f2813f-a5a5-405b-8cdb-81405793db3f', github: '#', linkedin: '#' },
    { name: 'Manav Limbachiya', title: 'Marketing', imgSrc: 'https://firebasestorage.googleapis.com/v0/b/stealyourkicks.appspot.com/o/TeamImages%2FWhatsApp%20Image%202024-10-16%20at%2023.29.34.jpeg?alt=media&token=edc7c4e1-23d9-43d5-8f74-dc0f80e99b1a', github: '#', linkedin: '#' },
  ];

  return (
    <>
    
    
    <Navbar/>
    <section className="py-12 ">
      {/* About Us Section */}
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold mb-6">About Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* StockX Verified */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src='/verify-black.png' alt="StockX Verified" className="mx-auto size-40 mb-4" />
            <h3 className="text-xl font-semibold mb-2">StealYourKicks Verified</h3>
            <p>Every item sold goes through our proprietary multi-step verification process with our team of experts.</p>
            <a href="#" className="text-green-600 mt-4 block">Learn More</a>
          </div>

          {/* Transparent Pricing */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="/price.png" alt="Transparent Pricing" className="mx-auto size-40 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
            <p>Our real-time marketplace allows you to buy and sell the most coveted items at their true market price.</p>
            <a href="#" className="text-green-600 mt-4 block">Learn More</a>
          </div>

          {/* Global Access */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="/access.png" alt="Global Access" className="mx-auto size-40 mb-4" />
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
    </>
  );
};

export default AboutUs;
