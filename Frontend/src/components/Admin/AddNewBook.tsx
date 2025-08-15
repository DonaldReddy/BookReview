import { useState } from "react";
import { api } from "../../api";
import Loader from "../Loader";
import axios from "axios";

export default function AddNewBook({
    handleClose,
}: {
    handleClose: () => void;
}) {
    const [bookInfo, setBookInfo] = useState({
        title: "",
        author: "",
        description: "",
        genre: "",
        coverImage: null as File | null,
        featured: "NO",
    });

    const [loading, setLoading] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value, type } = e.target;
        if (type === "file" && e.target instanceof HTMLInputElement) {
            const { files } = e.target;
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

            const { data } = await axios.post(
                "https://api.cloudinary.com/v1_1/depjwhaxa/image/upload",
                formData
            );

            return data.secure_url;
        } catch (err: unknown) {
            // Optional: log error without changing website
            console.error("Image upload error:", err);
            return null;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const coverImageUrl = await handleImageUpload();
            if (coverImageUrl) {
                const bookData = {
                    ...bookInfo,
                    coverImage: coverImageUrl,
                };
                await api.post("/api/v1/books", bookData);
            }
        } catch (err: unknown) {
            // Optional: log error safely
            console.error("Add book error:", err);
        } finally {
            handleClose();
            setLoading(false);
        }
    };

    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-black/40 dark:bg-white/50 flex justify-center items-center">
            <div className="bg-white dark:bg-black w-3/4 h-4/5 rounded-lg shadow-md flex flex-col items-center  gap-4 p-4">
                <div className="flex justify-between items-center w-full">
                    <h2 className="text-2xl underline underline-offset-5">
                        Add New Book
                    </h2>
                    <button
                        className="ml-auto text-xl cursor-pointer underline"
                        onClick={handleClose}
                    >
                        close
                    </button>
                </div>
                <form
                    className="w-full h-full flex  gap-4 "
                    onSubmit={handleSubmit}
                >
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
                                className="outline-none border border-black/20 dark:border-white/30 focus:border-black/40 dark:focus:border-white/50 rounded-md p-1"
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
                                className="resize-none outline-none border border-black/20 dark:border-white/30 focus:border-black/40 dark:focus:border-white/50 rounded-md p-1"
                                name="description"
                                id="description"
                                placeholder="Enter book description..."
                                rows={4}
                                cols={50}
                                onChange={handleInputChange}
                                value={bookInfo.description}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="genre">Genre</label>
                            <input
                                className="outline-none border border-black/20 dark:border-white/30 focus:border-black/40 dark:focus:border-white/50 rounded-md p-1"
                                type="text"
                                name="genre"
                                placeholder="Enter genre separated by commas... action,adventure,etc."
                                id="genre"
                                onChange={handleInputChange}
                                value={bookInfo.genre}
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
                                required
                            />
                        </div>

                        {bookInfo.coverImage && (
                            <div className="flex flex-col gap-2">
                                <img
                                    className="w-1/2 h-48 object-contain"
                                    src={URL.createObjectURL(
                                        bookInfo.coverImage
                                    )}
                                    alt="Book cover"
                                />
                                <p className="text-sm text-gray-500">
                                    {bookInfo.coverImage.name}
                                </p>
                            </div>
                        )}

                        {!bookInfo.coverImage && (
                            <div className="w-1/2 h-[220px] "></div>
                        )}

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
                            <button className="bg-black/80 dark:bg-white text-white dark:text-black rounded-md p-2 cursor-pointer hover:bg-black/100 dark:hover:bg-gray-200 transition-all duration-200 flex justify-center w-full max-w-[250px] ">
                                {loading ? <Loader size={25} /> : "Add Book"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
