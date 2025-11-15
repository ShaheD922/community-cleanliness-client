import React, { useState } from "react";
import { Zoom } from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter";

const categories = [
  {
    name: "Garbage",
    description:
      "Garbage buildup harms public health and the environment. Report overflowing bins, roadside dumps, or waste accumulation in your area to help keep the community clean and hygienic.",
    image: "https://i.ibb.co.com/TqB0cQq2/nathan-cima-TQuq2-Ot-LBNU-unsplash.jpg",
  },
  {
    name: "Illegal Construction",
    description:
      "Unauthorized buildings and structures disrupt urban planning and create safety risks. Report any illegal construction to ensure fair development and maintain city safety.",
    image: "https://i.ibb.co.com/fVQ7sN2P/avtoviski-barnaul-online-Vit-S4-Bec-Xv-Y-unsplash.jpg",
  },
  {
    name: "Broken Public Property",
    description:
      "Broken streetlights, benches, or public signs reduce safety and aesthetics. Report such issues to help keep shared spaces beautiful and functional for everyone.",
    image: "https://i.ibb.co.com/prfZ32n9/the-new-york-public-library-a-N5l5m-EF-ic-unsplash.jpg",
  },
  {
    name: "Road Damage",
    description:
      "Damaged roads, potholes, or uneven pavements cause accidents and traffic jams. Report such issues to encourage timely maintenance and safer travel for all.",
    image: "https://i.ibb.co.com/fdmM3GNh/erok-mule-d-C2fb-PZ8-Oec-unsplash.jpg",
  },
];

const CategorySection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (selectedCategory) {


    return (
      <div className="p-6 flex justify-center items-center min-h-[80vh] bg-white">
        <Zoom duration={800}>
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-3xl w-full">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={selectedCategory.image}
                alt={selectedCategory.name}
                className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-md"
              />
              <div className="flex flex-col justify-between w-full">
                <div>
                  <h2 className="text-2xl font-bold text-green-700 mb-3">
                    {selectedCategory.name}
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-justify">
                    {selectedCategory.description}
                  </p>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition-all duration-300"
                    onClick={() => setSelectedCategory(null)}
                  >
                     Back →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Zoom>
      </div>
    );
  }


  return (
    <section className="my-10 max-w-6xl mx-auto px-4 bg-white">
      <div>
        <h2 className="text-3xl font-bold mb-8 text-green-700 text-center">
          <Typewriter
            words={["Categories"]}
            loop={1}
            cursor
            cursorStyle=""
            typeSpeed={100}
          />
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {categories.map((cat, i) => (
          <Zoom key={i} duration={700} delay={i * 100} triggerOnce>
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] cursor-pointer">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-44 object-cover rounded-t-xl"
              />
              <div className="p-4 flex flex-col items-center text-center">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">
                  {cat.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-4">
                  {cat.description}
                </p>
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300"
                >
                  See More
                </button>
              </div>
            </div>
          </Zoom>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
