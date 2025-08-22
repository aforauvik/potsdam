import "./App.css";
import PrayerTime from "./PrayerTime";
import FAQ from "./FAQ";
import Hero from "./Hero";
import {useState, useEffect} from "react";
import Announcement from "./Announcement";

function App() {
	const [nextPrayer, setNextPrayer] = useState(null);
	const [timeUntilNext, setTimeUntilNext] = useState("");

	useEffect(() => {
		const timer = setInterval(() => {
			updateCountdown();
		}, 1000);

		return () => clearInterval(timer);
	}, [nextPrayer]);

	const updateCountdown = () => {
		if (!nextPrayer || !nextPrayer.dateTime) {
			setTimeUntilNext("Loading...");
			return;
		}

		const now = new Date();
		const nextPrayerTime = new Date(nextPrayer.dateTime);
		const timeDiff = nextPrayerTime - now;

		if (timeDiff <= 0) {
			setTimeUntilNext("Prayer time!");
		} else {
			const hours = Math.floor(timeDiff / (1000 * 60 * 60));
			const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

			if (hours > 0) {
				setTimeUntilNext(`${hours}h ${minutes}m ${seconds}s`);
			} else if (minutes > 0) {
				setTimeUntilNext(`${minutes}m ${seconds}s`);
			} else {
				setTimeUntilNext(`${seconds}s`);
			}
		}
	};

	const handlePrayerTimesUpdate = (prayerData) => {
		setNextPrayer(prayerData);
	};

	return (
		<div className="App pb-16">
			<Announcement />
			<Hero nextPrayer={nextPrayer} timeUntilNext={timeUntilNext} />
			<PrayerTime onPrayerTimesUpdate={handlePrayerTimesUpdate} />
			<FAQ />
		</div>
	);
}

export default App;
