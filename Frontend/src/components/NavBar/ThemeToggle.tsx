import { useAppDispatch, useAppSelector } from "../../redux/store";
import { generalActions } from "../../redux/slices/generalSlice";

export default function ThemeToggle() {
	const dispatch = useAppDispatch();
	const theme = useAppSelector((state) => state.general.theme);

	return (
		<label className="relative inline-flex items-center cursor-pointer">
			<input
				className="sr-only peer"
				type="checkbox"
				checked={theme === "dark"}
				onChange={() => dispatch(generalActions.toggleTheme())}
			/>
			<div className="w-15 h-8 rounded-full bg-gray-400 dark:bg-gray-400 transition-all duration-500 after:content-['☀️'] after:absolute after:top-0.5 after:left-1 after:bg-gray-600 border border-gray-600 dark:border-gray-300 after:rounded-full after:h-7 after:w-8 after:flex after:items-center after:justify-center after:transition-all after:duration-500 peer-checked:after:translate-x-5 peer-checked:after:content-['🌙'] peer-checked:after:bg-gray-500 after:shadow-md after:text-sm" />
		</label>
	);
}
