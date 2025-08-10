import { FaEdit, FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router";
import { useState } from "react";
import EditBook from "../Admin/EditBook";
import { Book } from "../../types";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import Loader from "../Loader";
import { adminBookActions } from "../../redux/slices/adminBookSlice";

export default function BookCard({
    id,
    title,
    author,
    coverImage,
    description,
    rating,
    ratingCount,
    createdAt,
    featured,
}: Book) {
    console.log('BookCard props:', {
        id,
        title,
        author,
        coverImage,
        description,
        rating,
        ratingCount,
        createdAt,
        featured
    });
    console.log('Rating type:', typeof rating);
    console.log('Rating value:', rating);
    const router = useNavigate();
    const [showEdit, setShowEdit] = useState(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.adminBook);
    const { role } = useAppSelector((state) => state.auth.user);

    const handleDelete = () => {
        dispatch(adminBookActions.deleteBook(id))
            .unwrap()
            .then(() => {
                dispatch(adminBookActions.fetchBooks());
                setShowDeleteWarning(false);
            });
    };

    return (
        <div
            className="group p-4 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 w-[300px] bg-blue-50 dark:bg-gray-800 cursor-pointer"
            onClick={() => router(`/app/books/${id}`)}
        >
            <div className="flex items-center justify-center my-2">
                {coverImage && (
                    <img
                        src={
                            typeof coverImage === "string"
                                ? coverImage
                                : URL.createObjectURL(coverImage)
                        }
                        alt={title}
                        className="w-[180px] h-[280px]  transition-transform duration-300 group-hover:scale-105"
                    />
                )}
            </div>
            <h2 className="text-sm truncate ">{title}</h2>

            <p className="text-sm text-black dark:text-white my-1">
                by{" "}
                <span className="underline underline-offset-2 text-blue-950 dark:text-blue-300">
                    {author}
                </span>
            </p>
            <div className="flex items-center gap-2">
                <div
                    title={`Rated ${rating} out of 5`}
                    className="flex items-center gap-1"
                >
                    {Array(Math.min(Math.max(Math.round(rating), 0), 5))
                        .fill(null)
                        .map((_, index) => (
                            <span
                                key={index}
                                className="text-sm text-[#de7921]"
                            >
                                <FaStar />
                            </span>
                        ))}
                    {Array(Math.max(5 - Math.round(rating), 0))
                        .fill(null)
                        .map((_, index) => (
                            <span
                                key={index}
                                className="text-sm text-gray-400 dark:text-gray-600"
                            >
                                <FaStar />
                            </span>
                        ))}
                    {rating !== null && rating !== undefined && (rating < 0 || rating > 5) && (
                        <span className="text-red-500">Invalid rating: {rating}</span>
                    )}
                </div>
                <div className="w-full flex items-center justify-between gap-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {ratingCount}{" "}
                    </p>
                    {role == "ADMIN" && (
                        <div className=" items-center gap-1 hidden group-hover:flex">
                            <FaEdit
                                size={20}
                                className="text-blue-950 dark:text-blue-300"
                                onClick={() => setShowEdit(true)}
                            />
                            <MdDelete
                                size={20}
                                className="text-red-600 dark:text-red-400"
                                onClick={() => setShowDeleteWarning(true)}
                            />
                        </div>
                    )}
                </div>
            </div>
            {showEdit && (
                <EditBook
                    {...{
                        id,
                        title,
                        author,
                        coverImage,
                        description,
                        rating,
                        ratingCount,
                        createdAt,
                        featured,
                    }}
                    handleClose={() => {
                        dispatch(adminBookActions.fetchBooks());
                        setShowEdit(false);
                    }}
                />
            )}

            {role == "ADMIN" && showDeleteWarning && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-10">
                    <div className="bg-white dark:bg-gray-900 p-4 rounded shadow-md text-black dark:text-white">
                        <p>Are you sure you want to delete this book?</p>
                        <div className="flex gap-2 mt-2">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                                onClick={handleDelete}
                                disabled={isLoading}
                            >
                                {isLoading ? <Loader /> : "Delete"}
                            </button>
                            <button
                                className="bg-gray-300 dark:bg-gray-700 dark:text-white px-4 py-2 rounded cursor-pointer"
                                onClick={() => setShowDeleteWarning(false)}
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
