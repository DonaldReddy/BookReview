import { CgSpinner } from "react-icons/cg";

export default function Loader({ size = 30 }: { size?: number }) {
    return (
        <div className="transition-transform duration-500 ease-in-out animate-spin w-20 flex items-center justify-center">
            <CgSpinner size={size} />
        </div>
    );
}
