import { useState } from "react";
import { api } from "../../api";
import Loader from "../Loader";
import { Book } from "../../types";

export default function EditBook({
	id,
	title,
	author,
	coverImage,
	description,
	featured,
	handleClose,
}: Book & {
	handleClose: () => void;
}) {
	const [bookInfo, setBookInfo] = useState({
		title: title || "",
		author: author || "",
		description: description || "",
		coverImage: coverImage || (null as File | null),
		featured: featured,
	});

	const [loading, setLoading] = useState(false);

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value, type } = e.target;
		if (type === "file" && e.target instanceof HTMLInputElement) {
			const { files } = e.target;
			console.log(files);
			if (files && files.length > 0) {
				setBookInfo((prev) => ({
					...prev,
					[name]: files[0],
				}));
			}
		} else {
			setBookInfo((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const handleImageUpload = async () => {
		try {
			const formData = new FormData();
			formData.append("file", bookInfo.coverImage as File);
			formData.append("upload_preset", "workelate");
			formData.append("cloud_name", "depjwhaxa");

			const response = await fetch(
				"https://api.cloudinary.com/v1_1/depjwhaxa/image/upload",
				{
					method: "POST",
					body: formData,
				},
			);

			const data = await response.json();
			return data.secure_url;
		} catch (error) {
			return null;
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		try {
			e.preventDefault();
			setLoading(true);
			if (bookInfo.coverImage instanceof File) {
				const imageUrl = await handleImageUpload();
				if (imageUrl) {
					setBookInfo((prev) => ({
						...prev,
						coverImage: imageUrl,
					}));
					const bookData = {
						...bookInfo,
						coverImage: imageUrl,
					};
					await api.put(`/api/v1/books/${id}`, bookData);
				} else {
					alert("Error uploading image. Please try again.");
					return;
				}
			} else {
				const bookData = {
					...bookInfo,
				};
				const response = await api.put(`/api/v1/books/${id}`, bookData);
				if (response.status === 200) {
					alert("Book updated successfully!");
				} else {
					alert("Failed to update the book. Please try again.");
				}
			}
		} catch (error) {
		} finally {
			setLoading(false);
			handleClose();
		}
	};

	return (
		<div className="fixed top-0 left-0 h-screen w-screen bg-black/40 flex justify-center items-center">
			<div className="bg-white dark:bg-neutral-900 w-3/4 h-4/5 rounded-lg shadow-md flex flex-col items-center  gap-4 p-4">
				<div className="flex justify-between items-center w-full">
					<h2 className="text-2xl underline underline-offset-5">Update Book</h2>
					<button
						className="ml-auto text-xl cursor-pointer underline"
						onClick={handleClose}
					>
						close
					</button>
				</div>
				<form className="w-full h-full flex  gap-4 " onSubmit={handleSubmit}>
					<div className="w-1/2 h-full flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<label htmlFor="title">Title</label>
							<input
								className="outline-none border border-black/20 dark:border-white/30 focus:border-black/40 dark:focus:border-white/50 rounded-md p-1"
								type="text"
								name="title"
								id="title"
								placeholder="Enter book title..."
								onChange={handleInputChange}
								value={bookInfo.title}
								required
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="author">Author</label>
							<input
								className="outline-none border border-black/20 dark:border-white/30 focus:border-black/40 dark:focus:border-white/50  rounded-md p-1"
								type="text"
								name="author"
								id="author"
								placeholder="Enter book author..."
								onChange={handleInputChange}
								value={bookInfo.author}
								required
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="description">Description</label>
							<textarea
								className="resize-none outline-none border border-black/20 dark:border-white/30 focus:border-black/40 dark:focus:border-white/50  rounded-md p-1"
								name="description"
								id="description"
								placeholder="Enter book description..."
								rows={9}
								cols={50}
								onChange={handleInputChange}
								value={bookInfo.description}
								required
							/>
						</div>
					</div>
					<div className="w-1/2 h-full flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<label htmlFor="coverImage">Cover Image</label>
							<input
								className="outline-none border border-black/20 dark:border-white/30 focus:border-black/40 dark:focus:border-white/50 rounded-md p-1"
								type="file"
								name="coverImage"
								accept="image/*"
								id="coverImage"
								onChange={handleInputChange}
								required={!bookInfo.coverImage}
							/>
						</div>

						{bookInfo.coverImage && bookInfo.coverImage instanceof File && (
							<div className="flex flex-col gap-2">
								<img
									className="w-1/2 h-48 object-contain"
									src={URL.createObjectURL(bookInfo.coverImage)}
									alt="Book cover"
								/>
							</div>
						)}

						{bookInfo.coverImage && typeof bookInfo.coverImage === "string" && (
							<div className="flex flex-col gap-2">
								<img
									className="w-1/2 h-48 object-contain"
									src={bookInfo.coverImage}
									alt="Book cover"
								/>
							</div>
						)}

						{!bookInfo.coverImage && <div className="w-1/2 h-[220px] "></div>}

						<div className="flex flex-col gap-2">
							<label htmlFor="featured">Featured</label>
							<select
								className="outline-none border border-black/20 dark:border-white/30 focus:border-black/40 dark:focus:border-white/50 rounded-md p-1"
								name="featured"
								id="featured"
								onChange={handleInputChange}
								value={bookInfo.featured}
							>
								<option value="NO">No</option>
								<option value="YES">Yes</option>
							</select>
						</div>
						<div className="flex flex-col justify-center items-center w-full">
							<button className="bg-black/80 dark:bg-white text-white dark:text-black rounded-md p-2 cursor-pointer hover:bg-black/100 transition-all duration-200 flex justify-center w-full max-w-[250px] ">
								{loading ? <Loader size={25} /> : "Update Book"}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
