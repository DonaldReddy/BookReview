import FeaturedBooks from "../components/Home/FeaturedBooks";
import { Sparkles } from "lucide-react";
import ContactUs from "../components/Home/ContactUs";

export default function Home() {
    return (
        <div className="w-full min-h-dvh">
            <div className="h-[60dvh] md:h-[80dvh] flex flex-col items-center justify-center from-violet-200 to-yellow-100/60 rounded-2xl bg-[url('/main-bg.webp')] bg-cover bg-center bg-no-repeat">
                <div className="flex items-center justify-center gap-3   ">
                    <h1 className="text-4xl md:text-6xl bg-gradient-to-r bg-clip-text text-transparent text-white ">
                        Book Review Taken to Next level with AI
                    </h1>
                    <Sparkles className="text-4xl md:text-6xl text-blue-800 animate-pulse" />
                </div>
                <div className="flex flex-col items-center justify-center mt-4 space-y-2">
                    <p className="text-lg text-center md:text-left text-white ">
                        Explore the latest reviews and insights powered by AI.
                    </p>
                    <p className="text-md text-center md:text-left text-white ">
                        Join us in discovering your next favorite book!
                    </p>
                </div>
            </div>

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
