// src/components/Footer/Footer.jsx
export default function Footer() {
	return (
		<footer className="w-full px-4 py-6 text-center text-sm text-gray-600 border-t mt-10">
			<div className="mb-2">
				Made with ⚡ by{" "}
				<a
					href="https://donaldreddy.xyz"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-500 underline hover:text-blue-700"
				>
					Donald Reddy
				</a>{" "}
				© {new Date().getFullYear()}
			</div>
			<div className="flex justify-center gap-4 text-blue-400 text-sm">
				<a href="https://github.com/DonaldReddy/BookReview" target="_blank" className="hover:underline">
					GitHub Repo
				</a>
				<a href="https://bookreview.donaldreddy.me" target="_blank" className="hover:underline">
					Live Demo
				</a>
				<a href="/privacy-policy" className="hover:underline">
					Privacy Policy
				</a>
			</div>
		</footer>
	);
}
