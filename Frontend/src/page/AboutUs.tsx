import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { ArrowRight } from "lucide-react";
import ContributorsSection from "../components/ContributorsSection";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AboutUs = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-violet-200 dark:from-[#4338ca]/90 to-yellow-100/60 dark:to-[#fde68a]/70 rounded-2xl py-16 px-6">
      {/* Header Section */}
      <motion.div
        className="text-center mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">About</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-blue-900/70 dark:text-[#a5b4fc] p-700 mb-6">
          <Typewriter
            words={["BookReview.in"]}
            loop={1}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={0}
            delaySpeed={1200}
          />
        </h2>

        <p className="text-gray-500 dark:text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
          Welcome to BookReview.in — a collaborative open-source platform for book lovers! Whether you're a curious
          reader, techie, or open-source contributor, we empower you to explore books, share reviews, and grow with a
          passionate community.
        </p>
      </motion.div>

      {/* Cards Section */}
      <div className="grid md:grid-cols-2 gap-10 mb-20">
        <motion.div
          className="rounded-2xl bg-white dark:bg-gray-300 p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-200 "
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-blue-900 hover:scale-105 transition-transform duration-300 mb-3 flex items-center gap-2">
            🌐 Our Motto
          </h3>
          <p className="text-gray-600 text-base leading-relaxed">
            <strong>"Read. Contribute. Connect."</strong> — We believe in open learning, shared ideas, and global
            connection through reading and technology.
          </p>
        </motion.div>

        <motion.div
          className="rounded-2xl bg-white dark:bg-gray-300 p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-200"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-2xl font-semibold text-blue-900 hover:scale-105 transition-transform duration-300 mb-3 flex items-center gap-2">
            🔧 Open Source
          </h3>
          <p className="text-gray-600 text-base leading-relaxed mb-4">
            BookReview.in is proudly open-source. Explore the code, suggest features, raise issues, or submit pull
            requests — every line of contribution counts.
          </p>
          <a
            href="https://github.com/DonaldReddy/BookReview.git"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Visit GitHub Repo <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>

      {/* Contributors Section */}
      <motion.div
        className="text-center bg-white dark:bg-gray-300 rounded-2xl shadow-md p-10 border border-gray-200 dark:border-gray-500 hover:shadow-xl transition-shadow duration-300"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-blue-900 mb-4 hover:scale-105 transition-transform duration-300">
          👥 Contributors
        </h2>
        <p className="text-gray-600 text-base mb-6 leading-relaxed max-w-xl mx-auto">
          A big thanks to all the amazing individuals who’ve helped shape BookReview.in into what it is today.
        </p>
        <ContributorsSection />
      </motion.div>
    </div>
  );
};

export default AboutUs;
