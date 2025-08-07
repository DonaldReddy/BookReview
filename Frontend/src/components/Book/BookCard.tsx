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
			className="group p-4 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 w-[300px] bg-blue-50 cursor-pointer"
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
			<h2 className="text-sm truncate">{title}</h2>

			<p className="text-sm text-black my-1">
				by{" "}
				<span className="underline underline-offset-2 text-blue-950">
					{author}
				</span>
			</p>
			<div className="flex items-center gap-2 ">
				<div
					title={`Rated ${rating} out of 5`}
					className="flex items-center gap-1"
				>
					{Array(Math.floor(rating))
						.fill(null)
						.map((_, index) => (
							<span key={index} className="text-sm text-[#de7921]">
								<FaStar />
							</span>
						))}
					{Array(5 - Math.floor(rating))
						.fill(null)
						.map((_, index) => (
							<span key={index} className="text-sm text-gray-500">
								<FaStar />
							</span>
						))}
				</div>
				<div className="w-full flex items-center justify-between gap-1">
					<p className="text-sm text-gray-500">{ratingCount} </p>
					{role == "ADMIN" && (
						<div className=" items-center gap-1 hidden group-hover:flex">
							<FaEdit
								size={20}
								className="text-blue-950"
								onClick={() => setShowEdit(true)}
							/>
							<MdDelete
								size={20}
								className="text-red-600"
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
					<div className="bg-white p-4 rounded shadow-md">
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
								className="bg-gray-300 px-4 py-2 rounded cursor-pointer"
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
