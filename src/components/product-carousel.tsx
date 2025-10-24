"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Thermometer, Wind, Zap } from "lucide-react";
import { useTranslations } from 'next-intl';

const productKeys = ['daikinFit', 'vrv', 'thermostat', 'aurora', 'rebel'];
const productIcons = [Thermometer, Wind, Zap, Wind, Thermometer];

export default function ProductCarousel() {
  const t = useTranslations();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % productKeys.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? productKeys.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % productKeys.length);
  };

  const currentProductKey = productKeys[currentIndex];
  const Icon = productIcons[currentIndex];

  return (
    <section className="py-16 bg-gradient-to-br from-[#F5F8FF] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#003D7A] mb-4">
            {t('home.products.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('home.products.subtitle')}
          </p>
        </div>

        <div 
          className="relative bg-white rounded-2xl shadow-xl overflow-hidden"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Product Image */}
            <div className="relative h-96 lg:h-[500px] bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-[#003D7A] rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Icon className="h-16 w-16 text-white" />
                  </div>
                  <p className="text-gray-500">Product Image</p>
                </div>
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#003D7A] rounded-full p-3 shadow-lg transition-all duration-200"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#003D7A] rounded-full p-3 shadow-lg transition-all duration-200"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Category Badge */}
              <div className="absolute top-6 left-6">
                <span className="bg-[#003D7A] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {t(`products.${currentProductKey}.category`)}
                </span>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-6">
                <h3 className="text-3xl font-bold text-[#003D7A] mb-4">
                  {t(`products.${currentProductKey}.name`)}
                </h3>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < 4 // Simplified rating for now
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">
                    4.8 out of 5
                  </span>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {t(`products.${currentProductKey}.description`)}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-[#003D7A] mb-3">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Array.isArray(t.raw(`products.${currentProductKey}.features`)) && 
                      (t.raw(`products.${currentProductKey}.features`) as string[]).map((feature: string, index: number) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-[#0052CC] rounded-full mr-3"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))
                    }
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-2xl font-bold text-[#003D7A]">
                    {t(`products.${currentProductKey}.price`)}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="px-6 py-3 bg-[#003D7A] text-white rounded-lg hover:bg-[#0052CC] transition-colors font-medium flex-1">
                    Learn More
                  </button>
                  <button className="px-6 py-3 border-2 border-[#003D7A] text-[#003D7A] rounded-lg hover:bg-[#F5F8FF] transition-colors font-medium flex-1">
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-3">
              {productKeys.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-[#003D7A]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid Preview */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4">
          {productKeys.map((productKey, index) => {
            const ProductIcon = productIcons[index];
            return (
              <button
                key={productKey}
                onClick={() => setCurrentIndex(index)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  index === currentIndex
                    ? "border-[#003D7A] bg-[#F5F8FF]"
                    : "border-gray-200 bg-white hover:border-[#0052CC]"
                }`}
              >
                <div className="text-center">
                  <div className={`w-12 h-12 mx-auto rounded-lg flex items-center justify-center mb-2 ${
                    index === currentIndex ? "bg-[#003D7A]" : "bg-gray-100"
                  }`}>
                    <ProductIcon className={`h-6 w-6 ${
                      index === currentIndex ? "text-white" : "text-gray-600"
                    }`} />
                  </div>
                  <p className={`text-sm font-medium ${
                    index === currentIndex ? "text-[#003D7A]" : "text-gray-700"
                  }`}>
                    {t(`products.${productKey}.name`).length > 15 
                      ? `${t(`products.${productKey}.name`).substring(0, 15)}...` 
                      : t(`products.${productKey}.name`)
                    }
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}