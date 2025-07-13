import React from "react";
import { FaHeartPulse, FaMountainSun, FaMedal } from "react-icons/fa6";
import { TbHeartHandshake } from "react-icons/tb";

const features = [
  {
    title: "Healthy",
    description: "Nourishing, antioxidant-rich, invigorating, natural",
    icon: <FaHeartPulse className="h-10 w-10 text-green-600 mb-4" />,
  },
  {
    title: "Sustainable",
    description: "Eco-friendly, Sustainable sips",
    icon: <TbHeartHandshake className="h-10 w-10 text-green-600 mb-4" />,
  },
  {
    title: "Sourced from the Himalayas",
    description: "Himalayan-sourced tea with delightful flavor",
    icon: <FaMountainSun className="h-10 w-10 text-green-600 mb-4" />,
  },
  {
    title: "Premium Quality",
    description: "Exquisite, Rich, Finest, Luxurious, Superior",
    icon: <FaMedal className="h-10 w-10 text-green-600 mb-4" />,
  },
];

export default function WhyChooseSippure() {
  return (
    <section className="bg-gray-50 rounded-3xl px-8 py-12 max-w-7xl mx-auto shadow-sm mb-20">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
        Why choose Sippure?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {features.map((feature, idx) => (
          <div key={idx} className="flex flex-col items-center">
            {feature.icon}
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}