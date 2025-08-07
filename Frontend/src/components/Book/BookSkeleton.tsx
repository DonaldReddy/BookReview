export default function BookSkeleton() {
    return (
        <div className="flex flex-col  justify-center p-4 rounded-lg shadow-md bg-blue-50 dark:bg- w-[300px]  animated-background bg-gradient-to-r from-blue-200 via-blue-300 to-indigo-200 dark:from-slate-700 dark:via-slate-800 dark:to-slate-700">
            <div className="animate-pulse w-full h-[30px] bg-white dark:bg-slate-600 rounded-lg mb-2"></div>
            <div className="animate-pulse w-full h-[280px] bg-white dark:bg-slate-600 rounded-lg mb-2"></div>
            <div className="animate-pulse w-[120px] h-[20px] bg-white dark:bg-slate-600 rounded-lg mb-2"></div>
            <div className="animate-pulse w-full h-[30px] bg-white dark:bg-slate-600 rounded-lg mb-2"></div>
        </div>
    );
}
