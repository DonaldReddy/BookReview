import React from "react";
import { Link } from "react-router-dom";
import spark from "../../assets/spark.svg";

const Footer: React.FC = () => {
    return (
        <footer className="w-full px-4 py-8 ">
            <div className="w-full mx-auto rounded-2xl bg-gray-100 dark:bg-gray-600 shadow-md p-6 text-gray-600 dark:text-gray-100">
                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-gray-300 dark:divide-gray-500">
                    {/* BookReview - spans 2 columns on medium screens and up */}
                    <div className="md:col-span-2 space-y-2 pr-0 md:pr-6">
                        <div className="flex justify-center md:justify-start">
                            <img
                                src={spark}
                                alt="spark"
                                className="w-8 h-8 mb-2"
                            />
                        </div>
                        <h3 className="text-xl font-bold">BookReview</h3>
                        <p className="text-sm">
                            Discover, review, and share your favorite books with
                            the community.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="space-y-2 md:px-6 pt-6 md:pt-0">
                        <h4 className="text-md font-semibold">Explore</h4>
                        <ul className="space-y-1 text-sm">
                            <li>
                                <Link to="/" className="hover:underline">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/app/books?page=1"
                                    className="hover:underline"
                                >
                                    Browse Books
                                </Link>
                            </li>
                            <li>
                                <Link to="/sign-in" className="hover:underline">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:underline">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/ai-suggestions"
                                    className="hover:underline"
                                >
                                    AI Suggestions
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-2 md:px-6 pt-6 md:pt-0">
                        <h4 className="text-md font-semibold">Support</h4>
                        <ul className="space-y-1 text-sm">
                            <li>
                                <Link
                                    to="/contact us"
                                    className="hover:underline"
                                >
                                    contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="hover:underline">
                                    Privacy Policy
                                </Link>
                            </li>

                            <li>
                                <Link to="/T&C" className="hover:underline">
                                    Terms & conditions
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/help center"
                                    className="hover:underline"
                                >
                                    Help center
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Created By */}
                    <div className="space-y-2 md:pl-6 pt-6 md:pt-0">
                        <h4 className="text-md font-semibold">Created By</h4>
                        <p className="text-sm">
                            <a
                                href="https://donaldreddy.xyz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                Donald Reddy
                            </a>
                        </p>
                        <div className="flex space-x-4 mt-2">
                            <a
                                href="https://github.com/DonaldReddy"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                            >
                                <img
                                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                                    alt="GitHub"
                                    className="w-5 h-5"
                                />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/donald-reddy-indelu/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                            >
                                <img
                                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                                    alt="LinkedIn"
                                    className="w-5 h-5"
                                />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <hr className="my-4 border-t border-gray-300 dark:border-gray-500" />

                <div className="flex justify-between items-center">
                    {/* Rights Reserved */}
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        &copy; {new Date().getFullYear()}{" "}
                        <strong>BookReview.in</strong> All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
