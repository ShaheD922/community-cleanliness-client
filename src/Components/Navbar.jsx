import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
const Navbar = () => {
  return (
    <div className="w-full mt-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full h-[400px]">
            <img
              src="https://i.ibb.co.com/XZMp3zyn/krista-mangulsone-9gz3wf-Hr65-U-unsplash-1.jpg"
              alt="Slide 1"
              className="w-full h-full object-cover rounded-lg brightness-75"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg">
                Winter Pet Grooming
              </h2>
              <p className="text-lg md:text-xl max-w-2xl mb-5 drop-shadow-md">
                Keep your pet warm and stylish with our cozy winter grooming services.
              </p>
              <button className="bg-green-700 hover:bg-green-500 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-md">
                Explore More
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}

        <SwiperSlide>
          <div className="relative w-full h-[400px]">
            <img
              src="https://i.ibb.co.com/hJBspYYt/alvan-nee-T-0-EW-SEbs-E-unsplash-1.jpg"
              alt="Slide 2"
              className="w-full h-full object-cover rounded-lg brightness-75"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg">
                Playtime for Pets
              </h2>
              <p className="text-lg md:text-xl max-w-2xl mb-5 drop-shadow-md">
                Fun, safe, and happy moments for your furry friends — every single day!
              </p>
              <button className="bg-green-700 hover:bg-green-500 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-md">
                Explore More
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        
        <SwiperSlide>
          <div className="relative w-full h-[400px]">
            <img
              src="https://i.ibb.co.com/xtxgWwdt/matt-nelson-a-I3-EBLvcyu4-unsplash.jpg"
              alt="Slide 3"
              className="w-full h-full object-cover rounded-lg brightness-75"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg">
                Cozy Corners for Pets
              </h2>
              <p className="text-lg md:text-xl max-w-2xl mb-5 drop-shadow-md">
                Soft beds and warm love — everything your pet deserves this season.
              </p>
              <button className="bg-green-700 hover:bg-green-500 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-md">
              Explore More
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Navbar;