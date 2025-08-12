import React from "react";
import { Link } from "react-router-dom";
import spark from "../../assets/spark.svg";

const Footer: React.FC = () => {
    return (
        <footer className="w-full px-4 sm:px-6 lg:px-8 py-12">
            <div className="rounded-2xl shadow-lg bg-gradient-to-b from-white to-blue-100 text-gray-800 p-12 md:p-16 transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">


                <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                    {/* BookReview Info */}
                    <div className="space-y-4 md:w-1/3">
                        <div className="flex items-center gap-3">
                            <span className="text-4xl text-blue-700 -mt-1">✦</span>
                            <h3 className="text-2xl font-bold tracking-wider">

                                BookReview
                            </h3>
                        </div>
                        <p className="text-gray-600 text-sm">

                            Discover, review, and share your favorite books with
                            the community.
                        </p>
                    </div>

                    {/* Links Sections */}
                    <div className="flex flex-wrap justify-between md:justify-end gap-10 md:gap-20 md:w-2/3 text-sm">
                        {[
                            {
                                title: "Explore",
                                links: [
                                    { to: "/", label: "Home" },
                                    {
                                        to: "/app/books?page=1",
                                        label: "Browse Books",
                                    },
                                    { to: "/sign-in", label: "Login" },
                                    { to: "/about", label: "About Us" },
                                    {
                                        to: "/ai-suggestions",
                                        label: "AI Suggestions",
                                    },
                                ],
                            },
                            {
                                title: "Support",
                                links: [
                                    { to: "/contact us", label: "Contact Us" },
                                    {
                                        to: "/privacy policy",
                                        label: "Privacy Policy",
                                    },
                                    {
                                        to: "/T&C",
                                        label: "Terms & Conditions",
                                    },
                                    {
                                        to: "/help center",
                                        label: "Help Center",
                                    },
                                ],
                            },
                        ].map((section) => (
                            <div key={section.title} className="space-y-4">
                                <h4 className="text-lg font-semibold tracking-wide">
                                    {section.title}
                                </h4>
                                <ul className="space-y-2">
                                    {section.links.map((link) => (
                                        <li key={link.to}>
                                            <Link
                                                to={link.to}
                                                className="text-gray-600 hover:text-blue-600 transition-all duration-300 hover:pl-2"
                                            >
                                                {link.label}
                                            </Link>

                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Created By */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold tracking-wide">
                                Created By
                            </h4>
                            <a
                                href="https://donaldreddy.xyz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-blue-600 transition-all duration-300 inline-block"
                            >
                                Donald Reddy
                            </a>

                            <div className="flex space-x-4 pt-2">
                                <a
                                    href="https://github.com/DonaldReddy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                    className="transform hover:scale-110 transition-transform duration-300"
                                >
                                    <img
                                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                                        alt="GitHub"
                                        className="w-6 h-6"
                                    />
                                </a>

                                <a
                                    href="https://www.linkedin.com/in/donald-reddy-indelu/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className="transform hover:scale-110 transition-transform duration-300"
                                >
                                    <img
                                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                                        alt="LinkedIn"
                                        className="w-6 h-6"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider and Copyright */}
                <hr className="my-8 border-t border-gray-300" />
                <div className="text-center text-gray-500 text-sm">

                    &copy; {new Date().getFullYear()}{" "}
                    <strong>BookReview.in</strong> All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
