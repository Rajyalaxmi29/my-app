// src/components/home/HomePage.js
import React, { useState } from 'react';
import { FaMicrophone, FaGlobe, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [language, setLanguage] = useState('en-IN');
  const [activeTab, setActiveTab] = useState('voice');
  const [businessDescription, setBusinessDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerateWebsite = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/create', {
        state: { 
          businessDescription: businessDescription 
        }
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 font-sans">
      {/* Navigation */}
      <nav className="flex justify-between items-center py-6 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 p-2 rounded-lg"
          >
            <FaMicrophone className="text-white text-xl" />
          </motion.div>
          <span className="text-xl font-bold text-gray-800">VoiceSite</span>
        </div>
        
        <div className="hidden md:flex space-x-6">
          <a href="#" className="font-medium hover:text-blue-600 transition-colors">Home</a>
          <a href="#" className="font-medium hover:text-blue-600 transition-colors">Examples</a>
          <a href="#" className="font-medium hover:text-blue-600 transition-colors">Pricing</a>
          <div className="flex items-center space-x-1">
            <FaGlobe className="text-blue-600" />
            <select 
              className="bg-transparent border-none focus:ring-0 text-gray-700"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en-IN">English</option>
              <option value="hi-IN">हिंदी</option>
              <option value="te-IN">తెలుగు</option>
              <option value="ta-IN">தமிழ்</option>
            </select>
          </div>
        </div>
        
        <button className="md:hidden text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6"
          >
            <span className="text-blue-600">Speak Your Business.</span> 
            <br className="hidden md:block" /> Get Your <span className="text-gradient bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">Website</span>.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-gray-600 mb-6"
          >
            No coding. No English needed. Just speak about your business in your language.
          </motion.p>
        </div>
        
        {/* Input Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mb-12"
        >
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-4 font-medium text-lg ${activeTab === 'voice' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('voice')}
            >
              <FaMicrophone className="inline-block mr-2" /> Voice
            </button>
            <button
              className={`flex-1 py-4 font-medium text-lg ${activeTab === 'text' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('text')}
            >
              <span className="inline-block mr-2">Aa</span> Type
            </button>
          </div>
          
          {/* Voice Input */}
          {activeTab === 'voice' && (
            <div className="p-6">
              <div className="flex items-center">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-1 bg-gray-50 rounded-lg p-4 flex items-center cursor-pointer`}
                >
                  <div className={`flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 mr-4`}>
                    <FaMicrophone className="text-xl text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-medium text-gray-800">
                      Click to speak about your business
                    </p>
                    <p className="text-gray-500">
                      (in Telugu, Hindi, or any language)
                    </p>
                  </div>
                </motion.div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-4 px-6 rounded-lg shadow-lg flex items-center"
                  onClick={handleGenerateWebsite}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span>Loading...</span>
                  ) : (
                    <>
                      <span>Get Started</span>
                      <FaArrowRight className="ml-2" />
                    </>
                  )}
                </motion.button>
              </div>
              
              {businessDescription && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-700">{businessDescription}</p>
                </div>
              )}
            </div>
          )}
          
          {/* Text Input */}
          {activeTab === 'text' && (
            <div className="p-6">
              <div className="flex items-start">
                <div className="flex-1">
                  <textarea
                    value={businessDescription}
                    onChange={(e) => setBusinessDescription(e.target.value)}
                    placeholder="Describe your business: What do you sell? Where are you located? What makes you special?"
                    className="w-full h-32 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  />
                  <p className="text-gray-500 mt-2 text-sm">
                    Example: "I run a fruit shop in Hyderabad near Charminar. We sell fresh mangoes, bananas, and seasonal fruits. Open from 7am to 9pm."
                  </p>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-4 px-6 rounded-lg shadow-lg flex items-center"
                  onClick={handleGenerateWebsite}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span>Loading...</span>
                  ) : (
                    <>
                      <span>Get Started</span>
                      <FaArrowRight className="ml-2" />
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
        
        {/* How It Works Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="max-w-5xl mx-auto mt-12"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Create Your Website in 3 Simple Steps</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Speak or Type",
                description: "Describe your business in your own language",
                color: "from-blue-500 to-blue-600"
              },
              {
                step: 2,
                title: "Get Your Website",
                description: "Our AI creates a professional website instantly",
                color: "from-purple-500 to-purple-600"
              },
              {
                step: 3,
                title: "Share & Grow",
                description: "Share on WhatsApp and get more customers",
                color: "from-green-500 to-green-600"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className={`bg-gradient-to-r ${item.color} h-16 w-16 rounded-full flex items-center justify-center text-white text-xl font-bold`}>
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Testimonials */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="max-w-4xl mx-auto mt-12"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Trusted by Thousands of Small Businesses</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Rajesh Fruit Stall",
                city: "Hyderabad",
                testimonial: "After creating my website with VoiceSite, my orders increased by 40%. Customers now see my daily specials!"
              },
              {
                name: "Priya Beauty Parlor",
                city: "Bangalore",
                testimonial: "My clients book appointments through my website. I saved ₹15,000 that I would have paid a web designer."
              },
              {
                name: "Mohan Kirana Store",
                city: "Delhi",
                testimonial: "The WhatsApp ordering feature changed my business. Now customers order groceries without calling repeatedly."
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800">{item.name}</h4>
                    <p className="text-gray-600">{item.city}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{item.testimonial}"</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-gray-200 py-10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-2 rounded-lg">
                <FaMicrophone className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold text-gray-800">VoiceSite</span>
            </div>
            
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Examples</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy</a>
            </div>
            
            <div className="text-gray-500 text-sm">
              © 2023 VoiceSite. Made with ❤️ for Indian small businesses.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;