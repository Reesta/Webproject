import  { useState } from 'react';

function product() {
  const products = [
    {
      id: 1,
      name: "Hibiscus Tea",
      price: 300,
      image: "Images/piledhibis.png",
      description:
        "A tart and tangy herbal infusion made from dried hibiscus flowers, known for its vibrant color and refreshing taste.",
      benefits: [
        "Rich in antioxidants",
        "Helps lower blood pressure",
        "Supports liver health",
      ],
      rating: 4.5,
      nutritionalInfo: {
        calories: "2 kcal",
        protein: "0g",
        carbs: "0.5g",
        fat: "0g",
      },
    },
    {
      id: 2,
      name: "Butterfly Tea",
      price: 350,
      image: "Images/butterfly.jpg",
      description:
        "Also known as butterfly pea flower tea, this naturally blue tea changes color when lemon is added and has a mild earthy flavor.",
      benefits: [
        "Natural food coloring",
        "Rich in antioxidants",
        "May improve skin health",
      ],
      rating: 4.0,
      nutritionalInfo: {
        calories: "1 kcal",
        protein: "0g",
        carbs: "0.3g",
        fat: "0g",
      },
    },
    {
      id: 3,
      name: "Chamomile Tea",
      price: 300,
      image: "Images/3.webp",
      description:
        "A soothing caffeine-free herbal tea made from chamomile flowers, perfect for relaxation and sleep.",
      benefits: [
        "Promotes better sleep",
        "Reduces anxiety",
        "Anti-inflammatory properties",
      ],
      rating: 4.7,
      nutritionalInfo: {
        calories: "2 kcal",
        protein: "0g",
        carbs: "0.4g",
        fat: "0g",
      },
    },
    {
      id: 4,
      name: "Matcha Tea",
      price: 400,
      image: "Images/Matcha.jpg",
      description:
        "Finely ground green tea leaves whipped into a smooth, energizing drink with a rich umami flavor.",
      benefits: [
        "Boosts metabolism",
        "Provides calm alertness",
        "High in antioxidants",
      ],
      rating: 4.8,
      nutritionalInfo: {
        calories: "3 kcal",
        protein: "0.3g",
        carbs: "0.7g",
        fat: "0g",
      },
    },
    {
      id: 5,
      name: "Rose Tea",
      price: 450,
      image: "Images/rose-bio.jpg",
      description:
        "Sweet and fruity rose-flavored black tea served ice-cold for a refreshing treat.",
      benefits: [
        "Hydrating and cooling",
        "Mild source of vitamins",
        "Perfect for hot days",
      ],
      rating: 4.2,
      nutritionalInfo: {
        calories: "1 kcal",
        protein: "0g",
        carbs: "0.4g",
        fat: "0g",
      },
    },
    {
      id: 6,
      name: "Jasmine Tea",
      price: 450,
      image: "Images/jasmine.jpg",
      description:
        "A delicate and fragrant tea made from jasmine-scented green tea leaves.",
      benefits: [
        "Calming and soothing",
        "Enhances mood",
        "Rich in antioxidants",
      ],
      rating: 4.6,
      nutritionalInfo: {
        calories: "2 kcal",
        protein: "0g",
        carbs: "0.5g",
        fat: "0g",
      },
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);

  const addToCart = (product) => {
    alert(`Added "${product.name}" to cart for Rs ${product.price}`);
  };

  if (selectedProduct) {
    return (
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-[#f3f8e9] min-h-screen">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => setSelectedProduct(null)}
            className="text-gray-700 hover:text-green-700 underline text-lg mb-6 inline-flex items-center transition-all"
          >
            ← Back to Products
          </button>

          <div className="bg-white shadow-xl overflow-hidden rounded-3xl grid md:grid-cols-2 border border-gray-200">
            <div className="relative flex items-center justify-center p-6 bg-gray-50">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full max-w-xs md:max-w-sm lg:max-w-md aspect-[3/3] object-contain transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="p-8 md:p-10 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{selectedProduct.name}</h1>
                <p className="text-green-600 text-2xl font-semibold mb-4">Rs {selectedProduct.price}</p>
                <p className="text-gray-700 leading-relaxed mb-4">{selectedProduct.description}</p>
                <div className="text-yellow-500 font-medium mb-6 flex items-center gap-2">
                  ⭐ {selectedProduct.rating} / 5.0
                </div>
              </div>

              <div className="mb-6 bg-yellow-50 rounded-xl p-4 border border-yellow-100 shadow-inner">
                <h3 className="font-semibold text-lg text-yellow-700 mb-2">🍃 Nutritional Info (per serving):</h3>
                <ul className="text-gray-800 space-y-1">
                  <li><strong>Calories:</strong> {selectedProduct.nutritionalInfo.calories}</li>
                  <li><strong>Protein:</strong> {selectedProduct.nutritionalInfo.protein}</li>
                  <li><strong>Carbs:</strong> {selectedProduct.nutritionalInfo.carbs}</li>
                  <li><strong>Fat:</strong> {selectedProduct.nutritionalInfo.fat}</li>
                </ul>
              </div>

              <div className="mb-6 bg-green-50 rounded-xl p-5 border border-green-100 shadow-inner">
                <h3 className="font-semibold text-lg text-green-700 mb-3">🌿 Health Benefits:</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-800">
                  {selectedProduct.benefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => addToCart(selectedProduct)}
                className="mt-6 bg-[#8ec06c] hover:bg-[#74a758] text-white text-lg font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 hover:shadow-lg"
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
    <section id="products" className="py-12 px-4 bg-[#f3f8e9] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl mb-4 text-gray-800 font-semibold text-center">Our Products</h2>
        <h2 className="text-4xl mb-10 text-[#acd681] font-semibold text-center">Discover Our Best Sellers</h2>

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
                <div className="aspect-[4/3] relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-2xl"
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

export default product;