export default function BookPageSkeleton() {
	return (
		<div className="rounded-lg bg-blue-50 h-[80dvh] w-full  animated-background bg-gradient-to-r from-blue-200 via-blue-300 to-indigo-200 dark:from-slate-700 dark:via-slate-800 dark:to-slate-700 flex">
			<div className="flex flex-col  justify-center p-4 rounded-lg shadow-md w-full md:w-1/4">
				<div className="animate-pulse w-full h-full bg-white dark:bg-slate-600 rounded-lg mb-2"></div>
			</div>
			<div className="flex flex-col justify-between p-4 rounded-lg shadow-md w-full md:w-3/4">
				<div className="animate-pulse w-full h-[50px] bg-white dark:bg-slate-600 rounded-lg mb-2"></div>
				<div className="animate-pulse w-full h-[300px] bg-white dark:bg-slate-600 rounded-lg mb-2"></div>
				<div className="animate-pulse w-full h-[100px] bg-white dark:bg-slate-600 rounded-lg mb-2"></div>
			</div>
		</div>
	);
}
