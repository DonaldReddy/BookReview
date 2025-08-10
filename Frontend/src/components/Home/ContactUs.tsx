import { useState } from "react";
import { api } from "../../api";
import { toast } from "react-toastify";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    query: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await api.post("/api/v1/query", formData);
      toast.success("Message sent successfully!");
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full min-h-dvh bg-gray-100 dark:bg-gray-900 p-4 sm:p-8 flex flex-col lg:flex-row items-center justify-center gap-8">
      {/* Image Section */}
      <div className="w-full lg:w-1/2"></div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Contact Us
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Give Us Your Valuable Feedback
          </p>
        </div>

        <div id="formContainer">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-lg font-medium text-gray-900 dark:text-gray-100">
                Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter your full name"
                className="w-full rounded-md p-2 mt-1 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-purple-600 dark:focus:border-purple-500"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-lg font-medium text-gray-900 dark:text-gray-100">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-md p-2 mt-1 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-purple-600 dark:focus:border-purple-500"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-lg font-medium text-gray-900 dark:text-gray-100">
                Message
              </label>
              <textarea
                name="query"
                rows={4}
                placeholder="Type your message here..."
                value={formData.query}
                className="w-full rounded-md p-2 mt-1 resize-none border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-purple-600 dark:focus:border-purple-500"
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Send Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md text-lg font-semibold hover:bg-purple-700 transition focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
