import { Loader } from "lucide-react";

const LoadingSpinner = () => {
	return (
		<div className="relative h-screen w-screen flex items-center justify-center">
			<Loader className="animate-spin text-black" size={40} />
		</div>
	);
};

export default LoadingSpinner;
