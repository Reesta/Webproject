import { useState, useEffect } from "react";


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

  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden bg-gray-200">
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
              <p className="text-white text-lg font-semibold">Image not available</p>
            </div>
          )}

          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-md">
              {slide.title}
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl drop-shadow-sm">
              {slide.description}
            </p>
          </div>
        </div>
      ))}

      
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
    </div>
  );
}