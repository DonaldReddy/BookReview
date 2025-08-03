import novelImg from "../../assets/novel.jpg";
import scienceImg from "../../assets/science.jpg";
import literatureImg from "../../assets/literature.jpg";
import fictionImg from "../../assets/fiction.jpg";

const categories = [
	{ name: "Novels", image: novelImg },
	{ name: "Science", image: scienceImg },
	{ name: "Literature", image: literatureImg },
	{ name: "Fiction", image: fictionImg },
];

function CategoryBooks() {
	return (
		<div className="text-center m-4">
			<h1 className="text-3xl md:text-4xl p-4">Categories</h1>
			<p className="text-gray-500 mb-6">Explore Books By Categories</p>

			<div className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
				{/* Search Box */}
				<div className="flex flex-col justify-center items-center w-full space-y-5 bg-pink-200 rounded-2xl p-6 mb-6">
					<label htmlFor="search-category" className="sr-only">
						Search Categories
					</label>
					<input
						id="search-category"
						className="border-2 w-full max-w-md h-10 p-2 hover:border-fuchsia-700 hover:text-pink-700 border-gray-400 rounded-md transition"
						type="search"
						name="search book"
						placeholder="Search category.."
					/>
					<h2 className="text-lg md:text-xl font-semibold text-gray-700 hover:scale-110 transition duration-300 ease-in-out text-center">
						All Novels, Science, Fiction, Literature...
					</h2>
				</div>

				{/* Categories Grid */}
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-screen-lg mx-auto">
					{categories.map((category, index) => (
						<div
							key={index}
							className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition transform cursor-pointer"
						>
							<img
								src={category.image}
								alt={category.name}
								className="h-40 w-full object-cover"
							/>
							<div className="p-4">
								<h3 className="text-lg font-semibold text-gray-800">
									{category.name}
								</h3>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default CategoryBooks;
