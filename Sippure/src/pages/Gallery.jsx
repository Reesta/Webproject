import React from 'react';
import { motion } from 'framer-motion';

const Gallery = () => {
  const images = [
    { src: 'Images/Gallery1.png', alt: 'Staff serving customers' },
    { src: 'Images/gallery2.png', alt: 'Tea brewing process' },
    { src: 'Images/gallery3.png', alt: 'Herbal tea ingredients' },
    { src: 'Images/gallery4.png', alt: 'Customer receiving tea' },
    { src: 'Images/gallery5.png', alt: 'Tea leaves and cups' },
    { src: 'Images/gallery6.jpg', alt: 'Tea shop ambiance' },
  ];

  return (
    <div className="bg-[#f3f8e9] min-h-screen">
      <div id="gallery" className="max-w-screen-xl mx-auto px-6 py-12">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">Our Gallery</h1>
          <p className="text-lg md:text-xl text-black leading-relaxed">
            Welcome to our gallery — A curated collection of the moments, herbs, and hands 
            behind every soothing cup. From the lush fields where our ingredients grow 
            to the warm glow of tea steeping at home, each image captures the heart of what we do.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, idx) => (
            <motion.div
              key={idx}
              className="rounded-xl overflow-hidden shadow-md h-[340px] cursor-pointer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;