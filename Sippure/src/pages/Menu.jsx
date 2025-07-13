import React, { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Hibiscus Tea',
    slug: 'hibiscus-tea',
    price: 200,
    image: '/Images/MenuHIbis.png',
    description: 'A tart and tangy herbal infusion made from dried hibiscus flowers...',
    benefits: [
      'Rich in antioxidants',
      'Helps lower blood pressure',
      'Supports liver health',
    ],
    rating: 4.6,
    nutritionalInfo: {
      calories: 2,
      protein: '0g',
      carbs: '0.4g',
      fat: '0g',
    },
  },
  {
    id: 2,
    name: 'Iced Matcha',
    slug: 'iced-matcha',
    price: 300,
    image: '/Images/MatchaMenu.png',
    description: 'Finely ground green tea leaves whipped into a smooth iced drink...',
    benefits: [
      'Boosts metabolism',
      'Provides calm alertness',
      'High in antioxidants',
    ],
    rating: 4.8,
    nutritionalInfo: {
      calories: 70,
      protein: '1g',
      carbs: '9g',
      fat: '2g',
    },
  },
  {
    id: 3,
    name: 'Peach Iced Tea',
    slug: 'peach-iced-tea',
    price: 250,
    image: '/Images/PeachIced.png',
    description: 'Sweet and fruity peach-flavored black tea served ice-cold...',
    benefits: [
      'Hydrating and cooling',
      'Mild source of vitamins',
      'Perfect for hot days',
    ],
    rating: 4.5,
    nutritionalInfo: {
      calories: 80,
      protein: '0g',
      carbs: '20g',
      fat: '0g',
    },
  },
  {
    id: 4,
    name: 'Chamomile Tea',
    slug: 'chamomile-tea',
    price: 250,
    image: '/Images/ChamomileTea.png',
    description: 'A soothing caffeine-free herbal tea made from chamomile flowers...',
    benefits: [
      'Promotes better sleep',
      'Reduces anxiety',
      'Anti-inflammatory properties',
    ],
    rating: 4.7,
    nutritionalInfo: {
      calories: 1,
      protein: '0g',
      carbs: '0.2g',
      fat: '0g',
    },
  },
  {
    id: 5,
    name: 'Butterfly Tea',
    slug: 'butterfly-tea',
    price: 300,
    image: '/Images/MenuButterfly.png',
    description: 'Also known as butterfly pea flower tea, this naturally blue tea...',
    benefits: [
      'Natural food coloring',
      'Rich in antioxidants',
      'May improve skin health',
    ],
    rating: 4.9,
    nutritionalInfo: {
      calories: 3,
      protein: '0g',
      carbs: '0g',
      fat: '0g',
    },
  },
  {
    id: 6,
    name: 'Herbal Tea',
    slug: 'herbal-tea',
    price: 250,
    image: '/Images/Herbaltea.png',
    description: 'A caffeine-free blend of herbs and spices, designed for wellness...',
    benefits: [
      'Customizable blends',
      'Great for digestion',
      'Calming and soothing',
    ],
    rating: 4.4,
    nutritionalInfo: {
      calories: 5,
      protein: '0.1g',
      carbs: '1g',
      fat: '0g',
    },
  },
];

export default function MenuAndDetailPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addToCart = (product) => {
    alert(`Added "${product.name}" to cart for Rs ${product.price}`);
  };

  if (selectedProduct) {
    return (
      <div id="Menu" className="py-12 px-4 sm:px-6 lg:px-8 bg-[#f3f8e9] min-h-screen">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => setSelectedProduct(null)}
            className="text-[#8ec06c] hover:text-[#74a758] underline text-lg mb-8 inline-flex items-center transition-all"
          >
            ← Back to Menu
          </button>

          <div className="bg-white shadow-xl overflow-hidden rounded-3xl grid md:grid-cols-2 border border-gray-100">
            <div className="relative aspect-[4/3] md:aspect-auto md:h-full">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="p-8 md:p-10 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  {selectedProduct.name}
                </h1>
                <p className="text-green-600 text-2xl font-semibold mb-4">
                  Rs {selectedProduct.price}
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {selectedProduct.description}
                </p>
                <div className="text-yellow-500 font-medium mb-6 flex items-center gap-2">
                  ⭐ {selectedProduct.rating} / 5.0
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 shadow-sm">
                  <h3 className="font-semibold text-green-700 mb-2">🍃 Nutritional Info:</h3>
                  <ul className="text-gray-800 space-y-1">
                    <li><strong>Calories:</strong> {selectedProduct.nutritionalInfo.calories}</li>
                    <li><strong>Protein:</strong> {selectedProduct.nutritionalInfo.protein}</li>
                    <li><strong>Carbs:</strong> {selectedProduct.nutritionalInfo.carbs}</li>
                    <li><strong>Fat:</strong> {selectedProduct.nutritionalInfo.fat}</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-xl border border-green-100 shadow-sm">
                  <h3 className="font-semibold text-green-700 mb-2">🌿 Health Benefits:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-800">
                    {selectedProduct.benefits.map((benefit, idx) => (
                      <li key={idx}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => addToCart(selectedProduct)}
                className="mt-6 bg-[#8ec06c] hover:bg-[#74a758] text-white py-3 px-6 rounded-full shadow-md font-semibold transition-all transform hover:shadow-lg hover:-translate-y-0.5"
              >
                🛒 Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="menu" className="py-12 px-4 bg-[#f3f8e9] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-extrabold text-gray-800 text-center mb-8">
          Our Menu
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100"
            >
              <button
                onClick={() => setSelectedProduct(product)}
                className="block w-full relative group"
              >
                <div className="aspect-[3/3] relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </button>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-semibold text-lg">Rs {product.price}</span>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="bg-[#8ec06c] hover:bg-[#74a758] text-white px-5 py-2 rounded-full font-medium transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
