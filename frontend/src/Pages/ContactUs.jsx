import React from 'react';
import { motion } from 'framer-motion';
import Image2 from "../assets/image2.jpg";

const ContactUs = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
      className="p-12 bg-gray-900 text-white min-h-screen flex flex-col md:flex-row items-center justify-center gap-12"
    >
      {/* Left Side - Heading, Description, Image */}
      <div className="w-full md:w-1/2 flex flex-col items-start">
        <h1 className="text-xl pt-15 font-medium text-amber-400">Contact Us</h1>
        <p className="mt-4 text-4xl font-serif text-gray-300">
          Get in touch with us for innovative and sustainable solutions.  
          We're here to help you build your dream home or commercial space.
        </p>
        <p className='pt-9 text-xl'>We are the leader with 25 years of experience in the construction market!</p>
        <div className="mt-6 w-full flex justify-start">
          <img 
            src={Image2}  
            alt="Contact Us" 
            className="rounded-lg pt-10 shadow-lg w-[80%] md:w-[90%] object-cover"
          />
        </div>
      </div>

      {/* Right Side - Contact Form */}
      <div className="w-full md:w-1/2">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <div className="flex flex-col">
            <input type="text" placeholder="Enter Full Name" className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-gray-700 text-white" />
            <input type="email" placeholder="Enter Email" className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-gray-700 text-white" />
            <input type="text" placeholder="Enter Mobile Number" className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-gray-700 text-white" />
            <textarea placeholder="Your Message" className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-gray-700 text-white"></textarea>
            <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600">
              Submit
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactUs;
