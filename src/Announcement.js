import React, {useState, useEffect} from "react";

const Announcement = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAutoRotating, setIsAutoRotating] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

	const announcements = [
		{
			title: "Jumma Prayer every Friday at 1:15 PM",
			description:
				"Join us every Friday at 1:15 PM for Jumma Prayer. This is a special congregational prayer that brings our community together. Please arrive 10-15 minutes early to prepare for prayer.",
		},
		{
			title: "Community Potluck on Saturday, September 6th at 6:30 PM",
			description:
				"Our Monthly Community Potluck is on Saturday, September 6th at 6:30 pm in Shaa Allah. Please, share only Halal food with the community. This is a great opportunity to meet fellow community members and share delicious food together.",
		},
	];

	useEffect(() => {
		if (!isAutoRotating) return;

		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) =>
				prevIndex === announcements.length - 1 ? 0 : prevIndex + 1
			);
		}, 5000); // Change every 5 seconds

		return () => clearInterval(interval);
	}, [announcements.length, isAutoRotating]);

	const handleNext = () => {
		setIsAutoRotating(false);
		setCurrentIndex((prevIndex) =>
			prevIndex === announcements.length - 1 ? 0 : prevIndex + 1
		);
	};

	const handlePrevious = () => {
		setIsAutoRotating(false);
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? announcements.length - 1 : prevIndex - 1
		);
	};

	const handleResumeAuto = () => {
		setIsAutoRotating(true);
	};

	const handleAnnouncementClick = (announcement) => {
		if (announcement.description) {
			setSelectedAnnouncement(announcement);
			setIsModalOpen(true);
		}
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedAnnouncement(null);
	};

	return (
		<>
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
								<div className="flex items-center justify-between">
									<div
										key={currentIndex}
										className={`text-sm sm:text-base font-medium break-words overflow-hidden text-ellipsis transition-opacity duration-500 flex-1 ${
											announcements[currentIndex].description
												? "cursor-pointer hover:text-blue-200 transition-colors"
												: ""
										}`}
										onClick={() =>
											handleAnnouncementClick(announcements[currentIndex])
										}
									>
										{announcements[currentIndex].title}
									</div>

									{/* Navigation Controls */}
									<div className="flex items-center space-x-2 ml-4">
										<button
											onClick={handlePrevious}
											className="p-1 text-white hover:text-gray-200 transition-colors rounded-full hover:bg-white/10"
											aria-label="Previous announcement"
										>
											<svg
												className="w-4 h-4"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fillRule="evenodd"
													d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
													clipRule="evenodd"
												/>
											</svg>
										</button>

										<span className="text-xs text-white/70">
											{currentIndex + 1} / {announcements.length}
										</span>

										<button
											onClick={handleNext}
											className="p-1 text-white hover:text-gray-200 transition-colors rounded-full hover:bg-white/10"
											aria-label="Next announcement"
										>
											<svg
												className="w-4 h-4"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fillRule="evenodd"
													d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
													clipRule="evenodd"
												/>
											</svg>
										</button>

										{!isAutoRotating && (
											<button
												onClick={handleResumeAuto}
												className="p-1 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10 text-xs"
												aria-label="Resume auto-rotation"
												title="Resume auto-rotation"
											>
												▶
											</button>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Modal */}
			{isModalOpen && selectedAnnouncement && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
						<div className="p-6">
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-lg font-semibold text-gray-900">
									{selectedAnnouncement.title}
								</h3>
								<button
									onClick={closeModal}
									className="text-gray-400 hover:text-gray-600 transition-colors"
									aria-label="Close modal"
								>
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
							<div className="text-gray-700 leading-relaxed">
								{selectedAnnouncement.description}
							</div>
							<div className="mt-6 flex justify-end">
								<button
									onClick={closeModal}
									className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
								>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Announcement;
