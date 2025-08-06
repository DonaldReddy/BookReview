import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import ContributorsSection from "../components/ContributorsSection";

// ✅ Props type for Modal
interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

// ✅ Inline Modal Component
const Modal: React.FC<ModalProps> = ({ show, onClose, title, content }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 w-11/12 md:w-1/3 shadow-2xl relative 
                       text-gray-800 dark:text-gray-100"
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100vh", opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-3"> {title} </h2>
            <p className="mb-4"> {content} </p>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ✅ State type for Popup Data
interface PopupState {
  show: boolean;
  title: string;
  content: string;
}

// ✅ Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AboutUs: React.FC = () => {
  const [popupData, setPopupData] = useState<PopupState>({
    show: false,
    title: "",
    content: "",
  });

  const handleOpenPopup = (title: string, content: string) => {
    setPopupData({ show: true, title, content });
  };

  const handleClosePopup = () => {
    setPopupData({ ...popupData, show: false });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-100 via-indigo-200 to-violet-200 
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 py-16 px-6">

      {/* ✅ Header */}
      <motion.div
        className="text-center mt-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <motion.h1
          className="text-5xl font-bold mb-6 text-center hover:scale-105 transition-transform duration-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            className="inline-block rounded-full border-2 border-blue-400 px-6 py-2 
                       text-black dark:text-gray-100 font-serif shadow-lg hover:shadow-blue-400/50 transition"
            whileHover={{
              scale: 1.1,
              rotate: [0, 5, -5, 0],
              transition: { duration: 0.7, ease: "easeInOut" },
            }}
          >
            About Us
          </motion.span>
        </motion.h1>

        <h2 className="text-2xl md:text-3xl font-semibold text-blue-900 dark:text-blue-300 mb-6">
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

        {/* ✅ Welcome Section */}
        <motion.div
          className="relative max-w-2xl mx-auto p-5 rounded-xl shadow-md 
                     bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
                     cursor-pointer hover:from-blue-100 hover:to-blue-200 
                     dark:hover:bg-gray-700 hover:border-blue-400 hover:shadow-blue-400/30 
                     transition-all duration-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          onClick={() =>
            handleOpenPopup(
              "📚 Welcome to BookReview.in",
              "BookReview.in is more than a platform – it's a community where readers, developers, and open-source enthusiasts unite to share insights, contribute code, and grow together. Click through the sections to explore more!"
            )
          }
        >
          <motion.p
            className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Welcome to{" "}
            <span className="font-semibold text-blue-600 dark:text-yellow-400">
              BookReview.in
            </span>{" "}
            — a collaborative open-source platform for book lovers! Whether you're a curious
            reader, techie, or open-source contributor, we empower you to explore books,
            share reviews, and grow with a passionate community.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* ✅ Cards Section */}
      <div className="grid md:grid-cols-2 gap-10 mb-20">
        {/* Motto Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => handleOpenPopup("🌐 Our Motto", "Read. Contribute. Connect — open learning through books & tech.")}
          className="mt-16 cursor-pointer rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-md hover:shadow-2xl 
                     hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 
                     transition-all duration-300 text-gray-800 dark:text-gray-100"
        >
          <h3 className="text-2xl font-semibold text-blue-900 dark:text-blue-300 mb-3">🌐 Our Motto</h3>
          <p className="text-gray-600 dark:text-gray-300">
            <strong>"Read. Contribute. Connect."</strong> — We believe in open learning, shared ideas, and global connection through reading and technology.
          </p>
        </motion.div>

        {/* Open Source Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => handleOpenPopup("🔧 Open Source", "Explore, suggest features, and contribute to BookReview.in open-source community.")}
          className="mt-16 cursor-pointer rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-md hover:shadow-2xl 
                     hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 
                     transition-all duration-300 text-gray-800 dark:text-gray-100"
        >
          <h3 className="text-2xl font-semibold text-blue-900 dark:text-blue-300 mb-3">🔧 Open Source</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            BookReview.in is proudly open-source. Explore the code, suggest features, raise issues, or submit pull requests — every line of contribution counts.
          </p>
          <a
            href="https://github.com/DonaldReddy/BookReview.git"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 dark:text-green-400 hover:text-green-600 
                       font-medium transition-all duration-300 transform hover:scale-105"
          >
            Visit GitHub Repo <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>

      {/* ✅ Contributors Section */}
      <motion.div
        className="text-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10 
                   border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:shadow-blue-400/30 
                   transition-shadow duration-300 text-gray-800 dark:text-gray-100"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-3xl font-bold mb-4 tracking-tight text-blue-900 dark:text-blue-300 
                     transition-all duration-300 cursor-pointer"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{
            scale: 1.08,
            color: "#2563eb",
            textShadow: "0px 0px 8px rgba(37, 99, 235, 0.7)",
            transition: { duration: 0.3, ease: "easeInOut" }
          }}
          viewport={{ once: true }}
        >
          👥 Contributors
        </motion.h2>

        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
          A big thanks to all the amazing individuals who’ve helped shape BookReview.in into what it is today.
        </p>

        <ContributorsSection />
      </motion.div>

      {/* ✅ Modal Component */}
      <Modal show={popupData.show} onClose={handleClosePopup} title={popupData.title} content={popupData.content} />
    </div>
  );
};

export default AboutUs;
