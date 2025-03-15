import React from 'react';
import { motion } from 'framer-motion';
import visionImage from "../assets/image1.png";
import { FaSolarPanel, FaPaintBrush, FaRulerCombined, FaHome, FaLightbulb, FaLeaf, FaDollarSign, FaUsers } from "react-icons/fa";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.05, transition: { duration: 0.3 } }
};

const AboutUs = () => {
  return (
    <motion.div initial="hidden" animate="visible" className="w-full">

      {/* About Us Section */}
      <motion.div variants={fadeIn} className="px-6 py-24 bg-[#cba228] text-neutral-800 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center">About Us</h1>
        <p className="text-justify mt-4 text-gray-950 max-w-3xl">
          Welcome to <b>NextGen Construction</b>, your trusted partner in innovative and sustainable construction solutions.
          With years of expertise in the industry, we specialize in solar panel installations, interior design,
          material estimation, and home price prediction to help you build a future-ready home or commercial space.
        </p>
      </motion.div>

      {/* Our Vision Section */}
      <motion.div variants={fadeIn} className="px-6 py-16 bg-gray-200 text-neutral-800 flex flex-col md:flex-row items-center justify-between w-full gap-10">
        <div className="w-full md:w-1/2 text-left">
          <h1 className="text-3xl font-bold">Our Vision</h1>
          <p className="mt-4 text-gray-900">
            We aim to revolutionize the construction industry by integrating cutting-edge technology,
            eco-friendly solutions, and precise data-driven insights to deliver top-quality projects that exceed expectations.
          </p>
        </div>
        <motion.img
          variants={fadeIn}
          src={visionImage}
          alt="Our Vision"
          className="rounded-lg shadow-lg w-full max-w-[250px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px] h-auto"
        />
      </motion.div>

      {/* Why Choose Us Section */}
      <motion.div variants={fadeIn} className="py-16 bg-gray-50 text-neutral-800 w-full">
        <h1 className="text-4xl font-bold text-center">Why Choose Us?</h1>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {[
            { icon: <FaLightbulb className="text-yellow-500 text-5xl mx-auto" />, title: "Expertise & Innovation", text: "A team of industry professionals with cutting-edge technology solutions." },
            { icon: <FaLeaf className="text-green-500 text-5xl mx-auto" />, title: "Sustainability", text: "Eco-friendly solutions that reduce environmental impact." },
            { icon: <FaDollarSign className="text-blue-500 text-5xl mx-auto" />, title: "Cost Efficiency", text: "Smart planning and material estimation for budget-friendly projects." },
            { icon: <FaUsers className="text-purple-500 text-5xl mx-auto" />, title: "Customer-Centric Approach", text: "We prioritize your vision and needs to deliver customized solutions." },
          ].map((item, index) => (
            <motion.div key={index} variants={cardVariants} whileHover="hover" className="p-6 bg-white rounded-lg text-center shadow-lg w-full">
              {item.icon}
              <h2 className="text-xl font-bold mt-4">{item.title}</h2>
              <p className="text-gray-700 mt-2">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>


      {/* Our Services Section */}
      <motion.div variants={fadeIn} className="w-full py-16 bg-white text-neutral-800">
        <h1 className="text-4xl font-bold text-center">Our Services</h1>
        <p className="text-center text-gray-600 mt-2">Explore Our Offerings</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-8 max-w-6xl mx-auto">
          {[
            { icon: <FaSolarPanel className="text-yellow-500 text-5xl mx-auto" />, title: "Solar Panel Installation", text: "We provide high-quality solar energy solutions that help homeowners and businesses reduce energy costs while promoting sustainability." },
            { icon: <FaPaintBrush className="text-yellow-500 text-5xl mx-auto" />, title: "Interior Design", text: "Transform your living or working space with our creative interior design solutions that blend aesthetics with functionality." },
            { icon: <FaRulerCombined className="text-yellow-500 text-5xl mx-auto" />, title: "Material Estimation", text: "Our expert estimation services ensure accurate calculations of materials required, helping to minimize waste and reduce costs." },
            { icon: <FaHome className="text-yellow-500 text-5xl mx-auto" />, title: "Home Price Prediction", text: "Leveraging advanced analytics and real estate insights, we provide precise home price predictions for buyers and investors." },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="w-full md:w-[80%] border border-yellow-500 p-6 rounded-lg text-center shadow-lg bg-gray-100"
            >
              {item.icon}
              <h2 className="text-xl font-bold mt-4">{item.title}</h2>
              <p className="text-gray-700 mt-2">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>


    </motion.div>
  );
};

export default AboutUs;
