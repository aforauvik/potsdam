import React, {useState, useEffect} from "react";

const PrayerDataTable = ({onPrayerTimesUpdate}) => {
	const [prayerTimes, setPrayerTimes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentPrayer, setCurrentPrayer] = useState(null);
	const [nextPrayer, setNextPrayer] = useState(null);

	// Potsdam, NY coordinates and timezone
	const latitude = 44.6698;
	const longitude = -74.9813;
	const timezone = "America/New_York";

	useEffect(() => {
		fetchPrayerTimes();
	}, []);

	useEffect(() => {
		if (nextPrayer && onPrayerTimesUpdate) {
			onPrayerTimesUpdate(nextPrayer);
		}
	}, [nextPrayer, onPrayerTimesUpdate]);

	const fetchPrayerTimes = async () => {
		try {
			setLoading(true);
			setError(null);

			// Aladhan API endpoint (more reliable than IslamicFinder)
			const today = new Date();
			const date = `${today.getDate()}-${
				today.getMonth() + 1
			}-${today.getFullYear()}`;
			const apiUrl = `http://api.aladhan.com/v1/timings/${date}?latitude=${latitude}&longitude=${longitude}&method=3&school=1`;

			console.log("Fetching from:", apiUrl);
			const response = await fetch(apiUrl);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			console.log("API Response:", data);

			// Check if we have the expected data structure
			if (data && data.data && data.data.timings) {
				const times = data.data.timings;

				// Map API data to our format
				const prayerData = [
					{
						name: "Fajr",
						athan: times.Fajr || "N/A",
						prayer: times.Fajr || "N/A",
						time: times.Fajr || null,
					},
					{
						name: "Sunrise",
						athan: times.Sunrise || "N/A",
						prayer: times.Sunrise || "N/A",
						time: times.Sunrise || null,
					},
					{
						name: "Dhuhr",
						athan: times.Dhuhr || "N/A",
						prayer: times.Dhuhr || "N/A",
						time: times.Dhuhr || null,
					},
					{
						name: "Asr",
						athan: times.Asr || "N/A",
						prayer: times.Asr || "N/A",
						time: times.Asr || null,
					},
					{
						name: "Maghrib",
						athan: times.Maghrib || "N/A",
						prayer: times.Maghrib || "N/A",
						time: times.Maghrib || null,
					},
					{
						name: "Isha",
						athan: times.Isha || "N/A",
						prayer: times.Isha || "N/A",
						time: times.Isha || null,
					},
				];

				setPrayerTimes(prayerData);
				calculateCurrentPrayer(prayerData);
			} else {
				console.error("Unexpected API response structure:", data);
				throw new Error("Invalid API response structure");
			}
		} catch (err) {
			console.error("Error fetching prayer times:", err);
			setError("Failed to fetch prayer times. Please try again later.");

			// Fallback to static times if API fails
			const fallbackTimes = [
				{name: "Fajr", athan: "05:00 AM", prayer: "05:30 AM"},
				{name: "Dhuhr", athan: "01:30 PM", prayer: "01:45 PM"},
				{name: "Asr", athan: "05:00 PM", prayer: "05:30 PM"},
				{name: "Maghrib", athan: "08:30 PM", prayer: "08:35 PM"},
				{name: "Isha", athan: "10:00 PM", prayer: "10:30 PM"},
			];
			setPrayerTimes(fallbackTimes);
		} finally {
			setLoading(false);
		}
	};

	const calculateCurrentPrayer = (prayers) => {
		const now = new Date();
		const currentTime = now.getTime();

		console.log("Current time:", now.toLocaleString());

		let current = null;
		let next = null;

		// Convert prayer times to Date objects for comparison
		const prayerTimesWithDates = prayers.map((prayer) => {
			if (prayer.time && prayer.time !== "N/A") {
				// Parse time string (e.g., "05:30") and create Date object for today
				const [hours, minutes] = prayer.time.split(":");
				const prayerDate = new Date();
				prayerDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

				return {
					...prayer,
					dateTime: prayerDate,
				};
			}
			return prayer;
		});

		// Sort prayers by time
		const sortedPrayers = prayerTimesWithDates
			.filter((prayer) => prayer.dateTime)
			.sort((a, b) => a.dateTime - b.dateTime);

		console.log(
			"Sorted prayer times:",
			sortedPrayers.map((p) => ({
				name: p.name,
				time: p.time,
				dateTime: p.dateTime.toLocaleTimeString(),
			}))
		);

		// Find the next prayer (first prayer time that hasn't passed yet)
		for (let i = 0; i < sortedPrayers.length; i++) {
			const prayer = sortedPrayers[i];
			if (prayer.dateTime > currentTime) {
				next = prayer;
				break;
			}
		}

		// If no next prayer found today, next prayer is tomorrow's Fajr
		if (!next && sortedPrayers.length > 0) {
			const tomorrowFajr = new Date(sortedPrayers[0].dateTime);
			tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
			next = {
				...sortedPrayers[0],
				dateTime: tomorrowFajr,
			};
		}

		// Find current prayer (the prayer that was most recently completed)
		for (let i = sortedPrayers.length - 1; i >= 0; i--) {
			const prayer = sortedPrayers[i];
			if (prayer.dateTime <= currentTime) {
				current = prayer;
				break;
			}
		}

		console.log("Current prayer:", current?.name, current?.time);
		console.log("Next prayer:", next?.name, next?.time);

		setCurrentPrayer(current);
		setNextPrayer(next);
	};

	const formatTime = (timeString) => {
		if (!timeString) return "";
		// Convert 24-hour format to 12-hour format if needed
		return timeString;
	};

	if (loading) {
		return (
			<tbody>
				<tr>
					<td colSpan="3" className="px-6 py-8 text-center text-gray-500">
						<div className="flex items-center justify-center">
							<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
							<span className="ml-2">Loading prayer times...</span>
						</div>
					</td>
				</tr>
			</tbody>
		);
	}

	if (error) {
		return (
			<tbody>
				<tr>
					<td colSpan="3" className="px-6 py-8 text-center text-red-500">
						<div className="text-sm">
							<p>{error}</p>
							<button
								onClick={fetchPrayerTimes}
								className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
							>
								Retry
							</button>
						</div>
					</td>
				</tr>
			</tbody>
		);
	}

	return (
		<tbody>
			{prayerTimes.map((prayer, index) => (
				<tr
					key={prayer.name}
					className={`odd:bg-white even:bg-gray-100 ${
						currentPrayer?.name === prayer.name
							? "bg-blue-50 border-l-4 border-l-blue-600"
							: ""
					}`}
				>
					<td className="px-6 py-4 text-start whitespace-nowrap text-sm font-medium text-gray-800">
						<div className="flex items-center">
							{prayer.name}
							{currentPrayer?.name === prayer.name && (
								<span className="ml-2 px-2 py-1 text-xs bg-blue-600 text-white rounded-full">
									Current
								</span>
							)}
						</div>
					</td>
					<td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-800">
						{formatTime(prayer.athan)}
					</td>
					<td className="px-6 py-4 text-end whitespace-nowrap text-sm font-medium text-gray-800">
						{formatTime(prayer.prayer)}
					</td>
				</tr>
			))}
		</tbody>
	);
};

export default PrayerDataTable;
