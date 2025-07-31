import FeaturedBooks from "../components/Home/FeaturedBooks";
import mainBg from "../assets/main-bg.jpg";
import { Sparkles } from "lucide-react";
import CategoryBooks from "../components/Home/CategoryBooks";
import ContactUs from "../components/Home/ContactUs";

export default function Home() {
  return (
    <div className="w-full min-h-dvh">
      {/* Hero Section */}
      <div className="h-[70vh] md:h-[80vh] relative">
        {/* Background Image */}
        <img
          src={mainBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Overlay Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <div className="mt-32 md:mt-40">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-pacifico font-bold text-shadow-black">
              Book Review Taken to Next Level with AI
              <Sparkles className="inline-block w-8 h-8 md:w-10 md:h-10 ml-2" />
            </h1>
            <p className="text-lg md:text-xl mt-6 md:mt-8 animate-pulse">
              Explore the latest reviews and insights powered by AI.
            </p>
            <p className="text-lg md:text-xl animate-pulse">
              Join us in discovering your next favourite book!
            </p>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="mt-12 px-4 sm:px-8">
        <CategoryBooks />
      </div>

      {/* Featured Section */}
      <div className="mt-20 px-4 sm:px-8">
        <FeaturedBooks />
      </div>

      {/* ContactUs Section */}
      <div className="mt-20 px-4 sm:px-8">
        <ContactUs />
      </div>
    </div>
  );
}
