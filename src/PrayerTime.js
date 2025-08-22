import React, {useState} from "react";
import PrayerDataTable from "./PrayerDataTable";
import {IoRefreshCircle} from "react-icons/io5";

const PrayerTime = ({onPrayerTimesUpdate}) => {
	const [lastUpdated, setLastUpdated] = useState(new Date());

	const handleRefresh = () => {
		setLastUpdated(new Date());
	};

	const formatDate = (date) => {
		return date.toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<div className="flex flex-col max-w-full mx-auto px-4 sm:px-4 lg:px-20">
			<div className="-m-1.5 overflow-x-auto">
				<div className="p-1.5 min-w-full inline-block align-middle">
					<div className="overflow-hidden">
						<div className="flex items-center justify-between pt-20 pb-6">
							<div className="flex flex-col">
								<h1 className="inline-block text-sm font-medium bg-clip-text bg-gradient-to-l from-blue-600 to-violet-500 text-transparent">
									Salah Time Table
								</h1>
								<p className="text-sm text-gray-600 mt-1">
									{formatDate(new Date())}
								</p>
							</div>
							<div className="flex items-center gap-1">
								<button
									onClick={handleRefresh}
									className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
									aria-label="Refresh prayer times"
								>
									<IoRefreshCircle className="w-5 h-5" />
								</button>
								<span className="text-xs text-gray-500">
									Last updated: {lastUpdated.toLocaleTimeString()}
								</span>
							</div>
						</div>
						<table className="min-w-full divide-y divide-gray-200">
							<thead>
								<tr>
									<th
										scope="col"
										className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
									>
										Salah
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
									>
										Athan Time
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
									>
										Salah Time
									</th>
								</tr>
							</thead>
							<PrayerDataTable
								key={lastUpdated.getTime()}
								onPrayerTimesUpdate={onPrayerTimesUpdate}
							/>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PrayerTime;
