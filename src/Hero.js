import React from "react";
import Announcement from "./Announcement";

const Hero = ({nextPrayer, timeUntilNext}) => {
	return (
		<div className="relative overflow-hidden">
			{/* Next Prayer Timer - Top Right Corner */}
			{nextPrayer && (
				<div className="fixed bottom-4 right-4 z-40">
					<div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg">
						<div className=" gap-2 justify-center items-center text-center">
							<div className="text-sm font-semibold">
								Next: {nextPrayer.name}
							</div>
							<div className="text-lg font-semibold">
								{timeUntilNext || "Loading..."}
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Gradients */}
			<div
				aria-hidden="true"
				className="flex absolute -top-96 start-1/2 transform -translate-x-1/2"
			>
				<div className="bg-gradient-to-r from-violet-300/50 to-purple-100 blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]"></div>
				<div className="bg-gradient-to-tl from-blue-50 via-blue-100 to-blue-50 blur-3xl w-[90rem] h-[50rem] rounded-full origin-top-left -rotate-12 -translate-x-[15rem]"></div>
			</div>

			<div className="relative z-10">
				<div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
					<div className="max-w-2xl text-center mx-auto">
						<p className="inline-block text-sm font-medium bg-clip-text bg-gradient-to-l from-blue-600 to-violet-500 text-transparent">
							Welcome To
						</p>

						{/* Title */}
						<div className="mt-5 max-w-2xl">
							<h1 className="block font-semibold text-gray-800 text-4xl md:text-5xl lg:text-6xl">
								Potsdam Mosque, Potsdam, New York
							</h1>
						</div>
						{/* End Title */}

						<div className="mt-5 max-w-3xl">
							<p className="text-lg text-gray-600">
								Established in the 1990s by Clarkson University students, today
								the mosque serves students from SLU, SUNY Potsdam and Canton.
								The mosque also serves a small but growing number of families
								who permanently reside in the area.
							</p>
						</div>

						{/* Buttons */}
						<div className="mt-7 grid gap-3 sm:inline-flex">
							<a
								className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-700 text-white hover:bg-blue-800 focus:outline-none focus:bg-blue-800 disabled:opacity-50 disabled:pointer-events-none"
								href="https://maps.app.goo.gl/yL8HH6Z9bP3LY4RJ8"
							>
								Get Direction
								<svg
									className="shrink-0 size-4"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M9 18l6-6-6-6" />
								</svg>
							</a>
							<a
								className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
								href="https://telegram.org/"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-telegram"
									viewBox="0 0 16 16"
								>
									<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
								</svg>
								Join Telegram For Updates
							</a>
						</div>
						{/* End Buttons */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
