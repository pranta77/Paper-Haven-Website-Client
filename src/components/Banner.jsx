"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slides = [
  {
    subtitle: "WELCOME TO PAPER HAVEN",
    title: "Discover Your Next Favorite Book",
    description:
      "Explore a world of stories, knowledge, and imagination. Find the perfect book for your next reading adventure.",
    emoji: "📚",
    bg: "from-[#285943] to-[#183D2D]",
  },
  {
    subtitle: "YOUR READING JOURNEY STARTS HERE",
    title: "Every Book Opens a New World",
    description:
      "From timeless classics to exciting new stories, discover books that inspire, entertain, and enrich your mind.",
    emoji: "📖",
    bg: "from-[#72543A] to-[#493522]",
  },
  {
    subtitle: "SHARE THE LOVE OF READING",
    title: "Borrow, Read, and Enjoy",
    description:
      "Find your favorite books, borrow them for a few days, and make reading a part of your everyday life.",
    emoji: "✨",
    bg: "from-[#3E526C] to-[#26364D]",
  },
];

const Banner = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        className="paperhaven-slider rounded-3xl overflow-hidden"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className={`bg-linear-to-r ${slide.bg} min-h-105 md:min-h-120 flex items-center px-8 py-12 md:px-16 lg:px-20 relative overflow-hidden`}
            >
              {/* Decorative Circles */}
              <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full border border-white/10" />
              <div className="absolute -right-10 -bottom-32 w-96 h-96 rounded-full border border-white/10" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full relative z-10">
                {/* Text Content */}
                <div className="text-white space-y-5 text-center md:text-left">
                  <span className="inline-block text-xs md:text-sm tracking-[3px] font-semibold text-[#D6A85F]">
                    {slide.subtitle}
                  </span>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                    {slide.title}
                  </h1>

                  <p className="text-white/75 text-sm md:text-base leading-7 max-w-lg mx-auto md:mx-0">
                    {slide.description}
                  </p>

                  <Link
                    href="/all-books"
                    className="btn bg-[#D6A85F] hover:bg-[#E5BB79] border-none text-[#1F2933] rounded-full px-8 font-bold"
                  >
                    Browse Books
                    <span className="text-lg">→</span>
                  </Link>
                </div>

                {/* Decorative Book Illustration */}
                <div className="hidden md:flex justify-center items-center">
                  <div className="relative">
                    <div className="w-64 h-72 lg:w-72 lg:h-80 bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl flex flex-col justify-center items-center shadow-2xl rotate-3">
                      <span className="text-8xl lg:text-9xl">
                        {slide.emoji}
                      </span>

                      <p className="text-[#D6A85F] text-lg font-bold mt-5">
                        Paper Haven
                      </p>

                      <span className="text-white/60 text-xs tracking-widest mt-2">
                        A WORLD OF STORIES
                      </span>
                    </div>

                    <div className="absolute -bottom-5 -left-8 bg-[#D6A85F] text-[#1F2933] px-5 py-3 rounded-xl shadow-lg -rotate-6 font-semibold text-sm">
                      Happy Reading! ❤️
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
