import React from 'react';
import { Shield, Eye, Lock, Users, Mail, Calendar, Database, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy = () => {
    const lastUpdated = "17 August, 2025";

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Header Section */}
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="bg-white/10 backdrop-blur-sm rounded-full inline-flex items-center px-6 py-3 mb-6 border border-white/20">
                        <Shield className="w-8 h-8 mr-3" />
                        <h1 className="text-3xl font-bold">Privacy Policy</h1>
                    </div>
                    <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                        BookReview.in
                    </h2>
                    <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-3xl mx-auto">
                        <p className="text-xl text-gray-100 italic leading-relaxed">
                            Your privacy is important to us. Learn how we protect and handle your data in our collaborative open-source platform for book lovers.
                        </p>
                    </div>
                    <p className="mt-6 text-blue-100 text-sm">
                        Last updated: {lastUpdated}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

                {/* Introduction */}
                <section>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                        <div className="flex items-center mb-6">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl mr-4">
                                <Eye className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Introduction</h2>
                        </div>
                        <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
                            <p>
                                Welcome to <span className="text-blue-600 dark:text-blue-400 font-semibold">BookReview.in</span> — a collaborative open-source platform for book lovers! This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you explore books, share reviews, and grow with our passionate community.
                            </p>
                            <p>
                                By using BookReview.in, you consent to the data practices described in this policy. We are committed to protecting your privacy and ensuring you have a positive experience on our platform.
                            </p>
                            <p>
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Two Column Layout for Main Sections */}
                <div className="grid lg:grid-cols-2 gap-8">

                    {/* Information We Collect */}
                    <section>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300 h-full">
                            <div className="flex items-center mb-6">
                                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl mr-4">
                                    <Database className="w-8 h-8 text-green-600 dark:text-green-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Information We Collect</h2>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">Personal Information</h3>
                                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 text-sm">
                                        <li>Name and email address</li>
                                        <li>Profile information you provide</li>
                                        <li>Book reviews and ratings</li>
                                        <li>Community interactions</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">Usage Data</h3>
                                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 text-sm">
                                        <li>Books you search and view</li>
                                        <li>Reading preferences</li>
                                        <li>Platform interactions</li>
                                        <li>Device and browser info</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* How We Use Information */}
                    <section>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300 h-full">
                            <div className="flex items-center mb-6">
                                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl mr-4">
                                    <Settings className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">How We Use Information</h2>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">Service Provision</h3>
                                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 text-sm">
                                        <li>Maintain your account</li>
                                        <li>Provide book recommendations</li>
                                        <li>Enable community features</li>
                                        <li>Process reviews and ratings</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">Platform Improvement</h3>
                                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 text-sm">
                                        <li>Analyze usage patterns</li>
                                        <li>Improve user experience</li>
                                        <li>Develop new features</li>
                                        <li>Ensure legal compliance</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Data Security */}
                <section>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                        <div className="flex items-center mb-6">
                            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-xl mr-4">
                                <Lock className="w-8 h-8 text-red-600 dark:text-red-400" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Data Security</h2>
                        </div>

                        <div className="space-y-6">
                            <p className="text-gray-600 dark:text-gray-300">
                                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                                    <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">Technical Measures</h3>
                                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                        <li>SSL/TLS encryption</li>
                                        <li>Encrypted data storage</li>
                                        <li>Regular security audits</li>
                                        <li>Secure infrastructure</li>
                                    </ul>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                                    <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">Organizational Measures</h3>
                                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                        <li>Limited data access</li>
                                        <li>Employee training</li>
                                        <li>Breach response procedures</li>
                                        <li>Privacy assessments</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* User Rights */}
                <section>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                        <div className="flex items-center mb-6">
                            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-xl mr-4">
                                <Users className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Your Rights</h2>
                        </div>

                        <div className="space-y-6">
                            <p className="text-gray-600 dark:text-gray-300">
                                You have the following rights regarding your personal information:
                            </p>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border-l-4 border-blue-500">
                                    <h3 className="font-semibold text-gray-700 dark:text-gray-200 text-sm">Access</h3>
                                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Request your data</p>
                                </div>

                                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border-l-4 border-green-500">
                                    <h3 className="font-semibold text-gray-700 dark:text-gray-200 text-sm">Rectification</h3>
                                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Correct your data</p>
                                </div>

                                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border-l-4 border-red-500">
                                    <h3 className="font-semibold text-gray-700 dark:text-gray-200 text-sm">Erasure</h3>
                                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Delete your data</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Information */}
                <section>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                        <div className="flex items-center mb-6">
                            <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-xl mr-4">
                                <Mail className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Contact Information</h2>
                        </div>

                        <div className="space-y-6">
                            <p className="text-gray-600 dark:text-gray-300">
                                If you have any questions about this Privacy Policy, your data, or our privacy practices, please:
                            </p>

                            <div className="grid md:grid-cols-2 gap-6">
                                <Link
                                    to="/contact"
                                    className="text-blue-600 hover:underline"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer Note */}
                <div className="text-center py-8">
                    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
                        <h3 className="text-xl font-semibold mb-3">Thank You for Your Trust</h3>
                        <p className="text-sm text-blue-100 leading-relaxed max-w-2xl mx-auto">
                            We are committed to protecting your privacy and providing a safe, secure environment for all BookReview.in users.
                            Your trust empowers us to build a better platform for book lovers everywhere.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;