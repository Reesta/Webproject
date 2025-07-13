
import  { useState } from "react";
import {
  Star,
  Plus,
  Minus,
  ShoppingCart,
  Check,
  Heart,
  Share2,
  Shield,
  Truck,
  RotateCcw,
} from "lucide-react";

export default function CartPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedHerb, setSelectedHerb] = useState("Chamomile");
  const [selectedSweetness, setSelectedSweetness] = useState("Normal");
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const product = {
    name: "Hibiscus Tea",
    basePrice: 250,
    originalPrice: 300,
    rating: 4.8,
    reviews: 214,
    description:
      "Experience the pure essence of nature with our Sippure Herbal Infusion — a premium blend of organic herbs carefully selected to relax your body and refresh your mind. Each cup delivers a perfect harmony of flavor and wellness benefits.",
    mainImage: "Images/piledhibis.png", 
    galleryImages: [
      "Images/MatchaMenu.png",
      "Images/PeachIced.png",
      "Images/MenuButterfly.png",
      "Images/Herbaltea.png",
    ],
    origin: "Himalayan Extracts",
    weight: "100g",
    servings: "30–40 cups",
  };

  const herbs = [
    {
      name: "Chamomile",
      image: "Images/3.webp",
      color: "bg-yellow-100 border-yellow-300",
    },
    {
      name: "Butterfly Tea",
      image: "Images/butterfly.jpg",
      color: "bg-blue-100 border-blue-300",
    },
    {
      name: "Rose Tea",
      image: "Images/rose-bio.jpg",
      color: "bg-pink-100 border-pink-300",
    },
    {
      name: "Matcha",
      image: "Images/Matcha.jpg",
      color: "bg-green-100 border-green-300",
    },
  ];

  const sweetnessLevels = ["No Sugar", "Less Sweet", "Normal", "Extra Sweet"];

  const getCurrentPrice = () => product.basePrice * quantity;
  const getSavings = () =>
    (product.originalPrice - product.basePrice) * quantity;

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-[#f3f8e9]">
      
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-emerald-800">Sippure</h1>
            <span className="text-sm text-gray-500">Premium Herbal Teas</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              className="p-2 text-gray-600 hover:text-emerald-600 transition-colors"
              aria-label="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className={`p-2 transition-colors ${
                isFavorited
                  ? "text-red-500"
                  : "text-gray-600 hover:text-red-500"
              }`}
              aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={isFavorited ? "fill-current" : ""} />
            </button>
          </div>
        </div>
      </header>

      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <div className="space-y-6">
            
            <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg flex items-center justify-center">
              <img
                src={product.mainImage}
                alt={product.name}
                className="w-full h-full object-contain p-4"
              />
            </div>

            
            <div className="grid grid-cols-4 gap-3">
              {product.galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden bg-white shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>

            
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm">
                <Shield className="w-8 h-8 text-emerald-600 mb-2" />
                <span className="text-sm font-medium text-gray-800">
                  100% Organic
                </span>
                <span className="text-xs text-gray-600">Certified Pure</span>
              </div>

              <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm">
                <Truck className="w-8 h-8 text-emerald-600 mb-2" />
                <span className="text-sm font-medium text-gray-800">
                  Free Shipping
                </span>
                <span className="text-xs text-gray-600">
                  Orders over Rs 500
                </span>
              </div>

              <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm">
                <RotateCcw className="w-8 h-8 text-emerald-600 mb-2" />
                <span className="text-sm font-medium text-gray-800">
                  Easy Returns
                </span>
                <span className="text-xs text-gray-600">
                  30-day policy
                </span>
              </div>
            </div>
          </div>

          
          <div className="space-y-8">
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-medium">
                  {product.origin}
                </span>
                <span className="text-gray-600">{product.weight}</span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-600">{product.servings}</span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900">
                {product.name}
              </h1>

              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-gray-800">
                  {product.rating}
                </span>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            
            <div className="bg-white p-6 rounded-2xl shadow-lg border">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-emerald-700">
                      Rs {getCurrentPrice().toLocaleString()}
                    </span>
                    <span className="text-xl line-through text-gray-400">
                      Rs {(product.originalPrice * quantity).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-emerald-600 font-semibold">
                    You save Rs {getSavings().toLocaleString()}{" "}
                    ({Math.round(
                      ((product.originalPrice - product.basePrice) /
                        product.originalPrice) *
                        100
                    )}
                    % off)
                  </div>
                </div>

                <div className="text-right">
                  <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold">
                    LIMITED OFFER
                  </div>
                </div>
              </div>
            </div>

            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Choose Your Herb Blend
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {herbs.map((herb) => (
                  <button
                    key={herb.name}
                    onClick={() => setSelectedHerb(herb.name)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedHerb === herb.name
                        ? `${herb.color} border-current scale-105 shadow-md`
                        : "border border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={herb.image}
                        alt={herb.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <span className="font-medium text-gray-800">
                        {herb.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Sweetness Level
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {sweetnessLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedSweetness(level)}
                    className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                      selectedSweetness === level
                        ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                        : "border border-gray-200 hover:border-gray-300 bg-white text-gray-700"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-md border">
                <span className="text-xl font-semibold text-gray-900">
                  Quantity
                </span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-5 h-5 text-gray-600" />
                  </button>
                  <span className="text-2xl font-bold text-gray-900 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAddedToCart}
                className={`w-full py-6 rounded-2xl font-bold text-xl transition-all duration-300 ${
                  isAddedToCart
                    ? "bg-emerald-300 text-white cursor-not-allowed"
                    : "bg-emerald-600 text-white hover:bg-emerald-700"
                }`}
              >
                {isAddedToCart ? (
                  <div className="flex items-center justify-center gap-2">
                    <Check className="w-6 h-6" /> Added to Cart
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <ShoppingCart className="w-6 h-6" /> Add to Cart
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}