// src/components/business-form/BusinessFormPage.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaStore, FaBox, FaPhone, FaCheck, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const BusinessFormPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessDescription: location.state?.businessDescription || '',
    location: '',
    businessName: '',
    businessType: '',
    products: '',
    contact: '',
    email: '',
  });
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  // Steps configuration
  const steps = [
    { id: 1, title: "Set Location", icon: <FaMapMarkerAlt /> },
    { id: 2, title: "Business Details", icon: <FaStore /> },
    { id: 3, title: "Products/Services", icon: <FaBox /> },
    { id: 4, title: "Contact Info", icon: <FaPhone /> },
    { id: 5, title: "Create Website", icon: <FaCheck /> },
  ];

  // Simulate location suggestions
  const fetchLocationSuggestions = (query) => {
    const suggestions = [
      "Hyderabad, Telangana",
      "Bangalore, Karnataka",
      "Chennai, Tamil Nadu",
      "Mumbai, Maharashtra",
      "Delhi",
      "Kolkata, West Bengal",
      "Pune, Maharashtra",
      "Ahmedabad, Gujarat"
    ];
    
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(suggestions.filter(loc => 
          loc.toLowerCase().includes(query.toLowerCase())
        ));
      }, 300);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'location' && value.length > 2) {
      setIsLoading(true);
      fetchLocationSuggestions(value).then(suggestions => {
        setLocationSuggestions(suggestions);
        setIsLoading(false);
      });
    } else if (name !== 'location') {
      setLocationSuggestions([]);
    }
  };

  const selectLocation = (loc) => {
    setFormData(prev => ({ ...prev, location: loc }));
    setLocationSuggestions([]);
    goToNextStep();
  };

  const goToNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Simulate sending confirmation email
  const sendConfirmationEmail = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        setEmailSent(true);
        resolve();
      }, 1500);
    });
  };

  const handleSubmit = async () => {
    setIsGenerating(true);
    
    // Simulate website generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate website URL
    const generatedUrl = `https://voicesite.in/${formData.businessName.replace(/\s+/g, '-').toLowerCase()}`;
    setWebsiteUrl(generatedUrl);
    
    // Send confirmation email
    await sendConfirmationEmail();
    
    setIsGenerating(false);
    goToNextStep();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-800">Where is your shop located?</h3>
            <p className="text-gray-600">
              Tell us your business location so customers can find you easily
            </p>
            
            <div className="relative">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter your city or area (e.g., Mumbai)"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
              {isLoading && (
                <div className="absolute right-3 top-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              )}
              
              {locationSuggestions.length > 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="absolute z-10 w-full bg-white shadow-lg rounded-lg mt-1 overflow-hidden"
                >
                  {locationSuggestions.map((loc, index) => (
                    <div
                      key={index}
                      className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onClick={() => selectLocation(loc)}
                    >
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="text-blue-500 mr-2" />
                        <span>{loc}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        );
        
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-800">Tell us about your business</h3>
            <p className="text-gray-600">
              This information will appear on your website homepage
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Shop/Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="e.g., Ramu Fruit Stall, Priya Beauty Parlor"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">What type of business do you have?</label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg bg-white"
                >
                  <option value="">Select your business type</option>
                  <option value="kirana">Kirana Store / General Store</option>
                  <option value="fruit">Fruit & Vegetable Shop</option>
                  <option value="beauty">Beauty Parlor / Salon</option>
                  <option value="restaurant">Restaurant / Food Stall</option>
                  <option value="clothing">Clothing Store</option>
                  <option value="electronics">Electronics Shop</option>
                  <option value="other">Other Business</option>
                </select>
              </div>
            </div>
          </motion.div>
        );
        
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-800">What do you sell or offer?</h3>
            <p className="text-gray-600">
              List your main products or services (separate with commas)
            </p>
            
            <div>
              <textarea
                name="products"
                value={formData.products}
                onChange={handleInputChange}
                placeholder="Examples: 
- For fruit shop: Mangoes, Bananas, Apples, Fresh Juices
- For beauty parlor: Haircut, Facial, Bridal Makeup, Waxing"
                className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>
          </motion.div>
        );
        
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-800">How can customers contact you?</h3>
            <p className="text-gray-600">
              We'll display this on your website so customers can reach you
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Mobile Number (WhatsApp)</label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="e.g., 9876543210"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
                <p className="text-gray-500 mt-2 text-sm">
                  Customers will be able to call or WhatsApp you directly from your website
                </p>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="yourname@example.com"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
                <p className="text-gray-500 mt-2 text-sm">
                  We'll send your website details and login information to this email
                </p>
              </div>
            </div>
          </motion.div>
        );
        
      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 text-center"
          >
            {isGenerating ? (
              <div className="py-12">
                <div className="flex justify-center mb-6">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Creating your business website...</h3>
                <p className="text-gray-600">Please wait while we set up your online presence</p>
              </div>
            ) : (
              <>
                <div className="bg-green-100 rounded-full p-4 inline-block mb-6">
                  <FaCheck className="text-green-600 text-4xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Your Business Website is Ready!</h3>
                <p className="text-gray-600 mb-6">
                  We've created a professional website for your {formData.businessType} business
                </p>
                
                <div className="bg-gray-100 rounded-xl p-6 mb-6">
                  <p className="text-lg font-medium mb-2">Your Website Address:</p>
                  <a 
                    href={websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 text-xl font-medium break-all"
                  >
                    {websiteUrl}
                  </a>
                  
                  {emailSent && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-center text-green-600">
                        <FaEnvelope className="mr-2" />
                        <span>We've sent website details to {formData.email}</span>
                      </div>
                      <p className="text-gray-500 text-sm mt-2">
                        Check your inbox (and spam folder) for login instructions
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4 max-w-md mx-auto text-left bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-lg">What's Next?</h4>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Visit your website and explore all pages</li>
                    <li>Check your email for admin login details</li>
                    <li>Update your business photos and offers</li>
                    <li>Share your website with customers</li>
                  </ol>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                  <button
                    onClick={() => window.open(websiteUrl, '_blank')}
                    className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-3 px-6 rounded-full shadow-lg"
                  >
                    Open My Website
                  </button>
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center justify-center"
                  >
                    <FaWhatsapp className="mr-2 text-xl" /> Share on WhatsApp
                  </button>
                </div>
              </>
            )}
          </motion.div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-blue-600 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span>Back</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-2 rounded-lg">
              <FaStore className="text-white text-xl" />
            </div>
            <span className="text-xl font-bold text-gray-800">Create Your Business Website</span>
          </div>
          
          <div></div> {/* Spacer */}
        </div>
      </header>
      
      {/* Progress Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between relative mb-12">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
          
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative">
              <motion.div
                animate={{ 
                  backgroundColor: currentStep >= step.id ? "#2563eb" : "#e5e7eb",
                  borderColor: currentStep >= step.id ? "#2563eb" : "#e5e7eb",
                  scale: currentStep === step.id ? 1.1 : 1
                }}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white mb-2 border-4 border-white shadow-md`}
              >
                {step.icon}
              </motion.div>
              <span className={`font-medium ${currentStep >= step.id ? 'text-gray-800' : 'text-gray-400'}`}>
                {step.title}
              </span>
              
              {index < steps.length - 1 && (
                <div 
                  className={`absolute top-6 left-full w-16 h-1 ${currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'}`}
                  style={{ left: 'calc(100% + 0.5rem)' }}
                ></div>
              )}
            </div>
          ))}
        </div>
        
        {/* Form Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: currentStep > 1 ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-3xl mx-auto"
        >
          {renderStepContent()}
          
          {/* Navigation Buttons */}
          {currentStep < 5 && !websiteUrl && (
            <div className="flex justify-between mt-8">
              <button
                onClick={goToPreviousStep}
                disabled={currentStep === 1}
                className={`py-3 px-6 rounded-lg font-medium ${currentStep === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
              >
                Back
              </button>
              
              <button
                onClick={goToNextStep}
                disabled={
                  (currentStep === 1 && !formData.location) ||
                  (currentStep === 2 && (!formData.businessName || !formData.businessType)) ||
                  (currentStep === 4 && (!formData.contact || !formData.email))
                }
                className={`py-3 px-6 rounded-lg font-medium ${
                  (currentStep === 1 && !formData.location) ||
                  (currentStep === 2 && (!formData.businessName || !formData.businessType)) ||
                  (currentStep === 4 && (!formData.contact || !formData.email))
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 shadow-lg'
                }`}
              >
                {currentStep === 4 ? 'Create My Website' : 'Continue'}
              </button>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 mt-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">© {new Date().getFullYear()} VoiceSite. Helping small businesses grow online.</p>
          <p className="text-gray-500 text-sm mt-2">Need help? Call us at 1800-123-4567</p>
        </div>
      </footer>
    </div>
  );
};

export default BusinessFormPage;