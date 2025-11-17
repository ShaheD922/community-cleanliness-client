import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Navbar = () => {
  return (
    <div className="w-full mt-70 md:mt-4"> 
    
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full h-[400px] md:h-[500px]">
            <img
              src="https://i.ibb.co.com/TqB0cQq2/nathan-cima-TQuq2-Ot-LBNU-unsplash.jpg"
              alt="Clean Environment"
              className="w-full h-full object-cover rounded-lg brightness-75"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg">
                Together for a Cleaner Future
              </h2>
              <p className="text-lg md:text-xl max-w-2xl mb-5 drop-shadow-md">
                Join hands to keep our surroundings clean and green — because a healthy
                environment means a better tomorrow.
              </p>
              <button className="bg-green-700 hover:bg-green-500 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-md">
                Explore More
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative w-full h-[400px] md:h-[500px]">
            <img
              src="https://i.ibb.co.com/fVQ7sN2P/avtoviski-barnaul-online-Vit-S4-Bec-Xv-Y-unsplash.jpg"
              alt="Community Work"
              className="w-full h-full object-cover rounded-lg brightness-75"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg">
                Empowering Local Communities
              </h2>
              <p className="text-lg md:text-xl max-w-2xl mb-5 drop-shadow-md">
                Small efforts make big changes. Report issues and be part of the
                solution for a cleaner and safer city.
              </p>
              <button className="bg-green-700 hover:bg-green-500 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-md">
                Explore More
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative w-full h-[400px] md:h-[500px]">
            <img
              src="https://i.ibb.co.com/prfZ32n9/the-new-york-public-library-a-N5l5m-EF-ic-unsplash.jpg"
              alt="Awareness"
              className="w-full h-full object-cover rounded-lg brightness-75"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg">
                Awareness Starts With You
              </h2>
              <p className="text-lg md:text-xl max-w-2xl mb-5 drop-shadow-md">
                Learn, share, and act to build awareness about cleanliness and civic
                responsibility in your community.
              </p>
              <button className="bg-green-700 hover:bg-green-500 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-md">
                Explore More
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4 */}
        <SwiperSlide>
          <div className="relative w-full h-[400px] md:h-[500px]">
            <img
              src="https://i.ibb.co.com/fdmM3GNh/erok-mule-d-C2fb-PZ8-Oec-unsplash.jpg"
              alt="Team Effort"
              className="w-full h-full object-cover rounded-lg brightness-75"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg">
                A Greener Bangladesh Awaits
              </h2>
              <p className="text-lg md:text-xl max-w-2xl mb-5 drop-shadow-md">
                Let’s unite for a sustainable and cleaner Bangladesh — one step, one
                report, one action at a time.
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
//