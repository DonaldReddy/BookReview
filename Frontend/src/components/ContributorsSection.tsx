import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

type Contributor = {
	login: string;
	avatar_url: string;
	html_url: string;
};

const CONTRIBUTORS_PER_PAGE = 6;

// ✅ Animation Variants for Heading Letters
const letterVariant = {
	hidden: { opacity: 0, y: 10 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { delay: i * 0.05, duration: 0.3 },
	}),
};

const ContributorsSection: React.FC = () => {
	const [contributors, setContributors] = useState<Contributor[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [selectedContributor, setSelectedContributor] =
		useState<Contributor | null>(null);

	const repoOwner = "DonaldReddy";
	const repoName = "BookReview";

	useEffect(() => {
		const fetchContributors = async () => {
			try {
				const { data } = await axios.get<Contributor[]>(
					`https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
				);

				if (!Array.isArray(data)) {
					console.error("Unexpected response:", data);
					setContributors([]);
					return;
				}
				setContributors(data);
			} catch (error) {
				console.error("Failed to fetch contributors:", error);
			}
		};

		fetchContributors();
	}, []);

	const totalPages = Math.ceil(contributors.length / CONTRIBUTORS_PER_PAGE);
	const startIndex = (currentPage - 1) * CONTRIBUTORS_PER_PAGE;
	const currentContributors = contributors.slice(
		startIndex,
		startIndex + CONTRIBUTORS_PER_PAGE,
	);

	const headingText = "Our Contributors";

	return (
		<section className="bg-gray-100 dark:bg-gray-900 py-10 px-4 md:px-6">
			{/* ✅ External Container */}
			<div
				className="max-w-5xl mx-auto text-center rounded-2xl p-6 shadow-lg 
                      bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm 
                      border border-gray-300 dark:border-gray-700 
                      transition-all duration-500 hover:shadow-2xl hover:border-blue-400"
			>
				{/* ✅ Animated Heading with Reduced Size */}
				<motion.h2
					className="text-2xl md:text-3xl font-bold mb-6 tracking-tight flex justify-center gap-1 flex-wrap 
                          transition-all duration-300"
					initial="hidden"
					animate="visible"
				>
					{headingText.split("").map((char, index) => (
						<motion.span
							key={index}
							variants={letterVariant}
							custom={index}
							className="transition-colors duration-300 hover:text-blue-500 
                         text-gray-900 dark:text-white cursor-pointer"
							whileHover={{
								scale: 1.1,
								textShadow: "0px 0px 6px rgba(0, 123, 255, 0.8)",
							}}
						>
							{char === " " ? "\u00A0" : char}
						</motion.span>
					))}
				</motion.h2>

				{/* ✅ Contributors Grid */}
				<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
					{currentContributors.map((contributor) => (
						<div
							key={contributor.login}
							onClick={() => setSelectedContributor(contributor)}
							className="relative cursor-pointer p-4 rounded-lg 
                        bg-white dark:bg-gray-700 
                        border border-gray-200 dark:border-gray-600 
                        shadow-sm hover:shadow-xl 
                        hover:bg-blue-50 dark:hover:bg-gray-600 
                        transition-all duration-300 transform hover:scale-105"
						>
							<img
								src={contributor.avatar_url}
								alt={contributor.login}
								className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-blue-200 dark:border-gray-500 shadow"
							/>
							<h3 className="text-base font-semibold text-gray-800 dark:text-white">
								{contributor.login}
							</h3>
							<p className="text-xs text-gray-500 dark:text-gray-300">
								GitHub Contributor
							</p>
						</div>
					))}
				</div>

				{/* ✅ Pagination */}
				{totalPages > 1 && (
					<div className="mt-6 flex justify-center items-center space-x-2">
						<button
							onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
							disabled={currentPage === 1}
							className={`px-5 py-2 rounded-md text-sm font-medium shadow transition 
                ${
									currentPage === 1
										? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
										: "bg-blue-600 text-white hover:bg-blue-800"
								}`}
						>
							⬅️ Previous
						</button>

						<span className="text-sm px-3 py-1 rounded bg-white dark:bg-gray-700 border text-gray-700 dark:text-gray-300 shadow">
							Page {currentPage} / {totalPages}
						</span>

						<button
							onClick={() =>
								setCurrentPage((prev) => Math.min(prev + 1, totalPages))
							}
							disabled={currentPage === totalPages}
							className={`px-5 py-2 rounded-md text-sm font-medium shadow transition 
                ${
									currentPage === totalPages
										? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
										: "bg-blue-600 text-white hover:bg-blue-800"
								}`}
						>
							Next ➡️
						</button>
					</div>
				)}
			</div>

			{/* ✅ Popup Modal */}
			{selectedContributor && (
				<div
					className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 transition-opacity duration-300"
					onClick={() => setSelectedContributor(null)}
				>
					<div
						className="bg-white dark:bg-gray-800 rounded-lg p-5 w-72 shadow-2xl relative animate-fade-in-up"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-lg font-bold"
							onClick={() => setSelectedContributor(null)}
						>
							✖
						</button>
						<img
							src={selectedContributor.avatar_url}
							alt={selectedContributor.login}
							className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-blue-400 shadow-md"
						/>
						<h3 className="text-lg font-semibold text-center text-blue-700 dark:text-yellow-300">
							{selectedContributor.login}
						</h3>
						<a
							href={selectedContributor.html_url}
							target="_blank"
							rel="noopener noreferrer"
							className="block mt-3 text-center text-white bg-blue-600 hover:bg-blue-800 px-3 py-1.5 rounded-md text-sm shadow"
						>
							View GitHub Profile
						</a>
					</div>
				</div>
			)}
		</section>
	);
};

export default ContributorsSection;
