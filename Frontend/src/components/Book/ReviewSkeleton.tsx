
export default function ReviewSkeleton() {
	return (
		<div className="rounded-lg bg-blue-50 h-[20dvh] w-full  animated-background bg-gradient-to-r from-blue-200 via-blue-300 to-indigo-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 flex gap-3 items-center justify-between p-3">
			<div className="animate-pulse w-[50px] h-[50px] bg-white dark:bg-gray-500 rounded-full mb-2"></div>
			<div className="w-full flex flex-col gap-2">
				<div className="animate-pulse w-full h-[20px] bg-white dark:bg-gray-500 rounded-lg mb-2"></div>
				<div className="animate-pulse w-full h-[15px] bg-white dark:bg-gray-500 rounded-lg mb-2"></div>
			</div>
		</div>
	);
}
