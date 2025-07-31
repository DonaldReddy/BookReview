import React from 'react';
import Contactbg from '../../assets/contactUs_bg.jpg';

function ContactUs() {
  return (
    <div className="w-full min-h-dvh bg-gray-100 p-4 sm:p-8 flex flex-col lg:flex-row items-center justify-center gap-8">
      {/* Image Section */}
      <div className="w-full lg:w-1/2">
        <img
          src={Contactbg}
          alt="Contact Us"
          className="w-full h-full max-h-[500px] object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold">Contact Us</h1>
          <p className="text-gray-500 text-lg">Give Us Your Valuable Feedback</p>
        </div>

        <form className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <label className="block text-lg font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full border-2 border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:border-purple-600"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-lg font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border-2 border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:border-purple-600"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-lg font-medium">Message</label>
            <textarea
              rows={4}
              placeholder="Type your message here..."
              className="w-full border-2 border-gray-300 rounded-md p-2 mt-1 resize-none focus:outline-none focus:border-purple-600"
            ></textarea>
          </div>

          {/* Send Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md text-lg font-semibold hover:bg-purple-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
