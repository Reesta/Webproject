import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "Fresh Spring Water",
    description: "Naturally sourced and filtered through layers of rock.",
    image: "/Images/slide1.jpg",
  },
  {
    id: 2,
    title: "Pure and Refreshing",
    description: "Hydrate your life with crystal-clear purity.",
    image: "/Images/slide2.jpg",
  },
  {
    id: 3,
    title: "Eco-Friendly Bottling",
    description: "Committed to sustainability from source to sip.",
    image: "/Images/slide3.jpg",
  },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const handleExploreClick = () => {
    navigate("/products");
  };
  
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden bg-gray-200">
        {/* Logo */}
        <img
          src="/Images/Sippurelogo.png"
          alt="Sippure Logo"
          className="absolute top-24 left-1/2 transform -translate-x-1/2 w-32 h-auto z-30"
        />

        {/* Background slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {!imageErrors[slide.id] ? (
              <div className="relative w-full h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  onError={() => handleImageError(slide.id)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-lime-600">
                <p className="text-white text-lg font-semibold">
                  Image not available
                </p>
              </div>
            )}
          </div>
        ))}

        {/* Slide text below logo */}
        <div className="absolute top-60 w-full flex flex-col items-center text-center px-6 z-30">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-md">
            {slides[current].title}
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl drop-shadow-sm mb-6">
            {slides[current].description}
          </p>
          <button
            onClick={handleExploreClick}
            className="bg-lime-700 text-white hover:bg-lime-800 font-semibold text-lg px-8 py-3 rounded-full transition-all"
          >
            Explore
          </button>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 w-full flex justify-center gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-3 h-3 rounded-full ${
                index === current ? "bg-white" : "bg-white/50"
              } transition`}
            />
          ))}
        </div>
        
        {/* Scroll down indicator */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <button 
            onClick={() => scrollToSection('our-mission')} 
            className="text-white flex flex-col items-center"
          >
            <span className="mb-2">Scroll Down</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Our Mission Section */}
      <section id="our-mission" className="py-20 px-6 md:px-12 bg-[#f3f8e9]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-lime-700 mb-4">Our Mission</h2>
            <div className="w-24 h-1 bg-lime-500 mx-auto"></div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
<img 
  src="/Images/galleryjs.jpg" 
  alt="Our Mission Image" 
  className="rounded-full shadow-xl w-full h-auto object-cover"
  onError={(e) => e.target.src = '/Images/Tea1.png'}
/>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Bringing Nature's Goodness to Your Cup</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                At Sippure, our mission is to provide the highest quality herbal teas that nourish both body and soul. We are committed to sourcing only the finest organic ingredients, supporting sustainable farming practices, and creating blends that promote wellness and balance in everyday life.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We believe that every cup of tea is an opportunity to pause, reflect, and reconnect with nature's healing properties. Our dedication to purity and authenticity ensures that each sip delivers the full benefits of nature's botanical treasures.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Sippure Section */}
      <section id="why-choose" className="py-20 px-6 md:px-12 bg-[#f3f8e9]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-lime-700 mb-4">Why Choose Sippure</h2>
            <div className="w-24 h-1 bg-lime-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-lime-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">100% Natural</h3>
              <p className="text-gray-600">Pure ingredients with no artificial additives, preservatives, or flavorings.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-lime-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Sustainably Sourced</h3>
              <p className="text-gray-600">Ethically harvested ingredients that support environmental conservation.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-lime-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Health Benefits</h3>
              <p className="text-gray-600">Carefully crafted blends that support wellness and vitality.</p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-lime-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Premium Quality</h3>
              <p className="text-gray-600">Exceptional taste and aroma from the highest quality ingredients.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
