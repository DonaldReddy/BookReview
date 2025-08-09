import React from "react";

const ContactCards = () => {
  return (
    <div
      id="ContactUscards"
      className="flex flex-col items-center gap-5 w-full"
    >
      {/* Card 1 */}
      <div className="w-[90%] bg-gradient-to-r from-blue-300 to-purple-300 hover:from-blue-400 hover:to-purple-400 transition-colors duration-300 p-5 rounded-lg flex gap-4 items-center shadow-md">
        <div className="text-[32px] text-blue-700">📖</div>
        <div>
          <h4 className="mb-[5px] font-semibold">Book Inquiries</h4>
          <p className="m-0">hello@bookreviw.com</p>
          <p className="mt-[5px] text-sm text-gray-600">Response within 2 hours</p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="w-[90%] bg-gradient-to-r from-blue-300 to-purple-300 hover:from-blue-400 hover:to-purple-400 transition-colors duration-300 p-5 rounded-lg flex gap-4 items-center shadow-md">
        <div className="text-[32px] text-blue-700">🌍</div>
        <div>
          <h4 className="mb-[5px] font-semibold">24/7 Support</h4>
          <p className="m-0">1800-100-100</p>
          <p className="mt-[5px] text-sm text-gray-600">Emergency assistance</p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="w-[90%] bg-gradient-to-r from-blue-300 to-purple-300 hover:from-blue-400 hover:to-purple-400 transition-colors duration-300 p-5 rounded-lg flex gap-4 items-center shadow-md">
        <div className="text-[32px] text-blue-700">📍</div>
        <div>
          <h4 className="mb-[5px] font-semibold">Visit Our Office</h4>
          <p className="m-0">Xyz, New Delhi</p>
          <p className="mt-[5px] text-sm text-gray-600">Mon-Sat: 9:00AM-6:00PM</p>
        </div>
      </div>
    </div>
  );
};

export default ContactCards;
