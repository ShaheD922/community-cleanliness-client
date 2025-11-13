import React from "react";

const categories = [
  { name: "Garbage", icon: "🗑️" },
  { name: "Illegal Construction", icon: "🏗️" },
  { name: "Broken Public Property", icon: "🏚️" },
  { name: "Road Damage", icon: "🛣️" },
];

const CategorySection = () => {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="border p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center justify-center gap-2"
          >
            <span className="text-4xl">{cat.icon}</span>
            <h3 className="font-semibold text-lg">{cat.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
