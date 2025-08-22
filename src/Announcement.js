import React, {useState, useEffect} from "react";

const Announcement = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const announcements = [
		"Our Monthly Community Potluck is on Saturday, September 6th at 6:30 pm in Shaa Allah. Please, make sure you share only Halal food with the community.",
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) =>
				prevIndex === announcements.length - 1 ? 0 : prevIndex + 1
			);
		}, 5000); // Change every 5 seconds

		return () => clearInterval(interval);
	}, [announcements.length]);

	return (
		<div className="bg-gradient-to-r from-blue-600 to-violet-600 text-white py-2 sm:py-3 px-3 sm:px-4 shadow-lg">
			<div className="max-w-7xl mx-auto">
				<div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0">
					<div className="flex items-center space-x-2 sm:space-x-4 w-full">
						<div className="flex-shrink-0">
							<svg
								className="w-4 h-4 sm:w-5 sm:h-5 text-white"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<div className="flex-1 min-w-0 max-w-full">
							<div className="flex items-center justify-center sm:justify-start">
								<div
									key={currentIndex}
									className="text-sm sm:text-base font-medium break-words overflow-hidden text-ellipsis transition-opacity duration-500"
								>
									{announcements[currentIndex]}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Announcement;
