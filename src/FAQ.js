import React, {useState} from "react";

const faqTable = [
	{
		question: "Is there a prayer section for women?",
		answer: "Yes, there is a separate prayer section for women.",
	},
	{
		question: "Do you offer 5 daily prayers?",
		answer: "Yes, we offer 5 daily prayers.",
	},
	{
		question: "Do you offer parking?",
		answer: "Yes, we offer free parking for all visitors.",
	},
];

const FAQ = () => {
	const [openIndex, setOpenIndex] = useState(null);

	const toggleAccordion = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className="max-w-full mx-auto px-4 sm:px-4 lg:px-20 hs-accordion-group">
			<h1 className="pt-20 pb-6 inline-block text-sm font-medium bg-clip-text bg-gradient-to-l from-blue-600 to-violet-500 text-transparent">
				FAQ
			</h1>
			{faqTable.map((item, index) => (
				<div
					key={index}
					className={`hs-accordion ${openIndex === index ? "active" : ""}`}
					id={`hs-basic-heading-${index}`}
				>
					<button
						className="hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none"
						aria-expanded={openIndex === index}
						aria-controls={`hs-basic-collapse-${index}`}
						onClick={() => toggleAccordion(index)}
					>
						<svg
							className={`size-3.5 ${openIndex === index ? "hidden" : "block"}`}
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
							<path d="M5 12h14"></path>
							<path d="M12 5v14"></path>
						</svg>
						<svg
							className={`size-3.5 ${openIndex === index ? "block" : "hidden"}`}
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
							<path d="M5 12h14"></path>
						</svg>
						{item.question}
					</button>
					<div
						id={`hs-basic-collapse-${index}`}
						className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${
							openIndex === index ? "block" : "hidden"
						}`}
						role="region"
						aria-labelledby={`hs-basic-heading-${index}`}
					>
						<p className="text-gray-800 mb-6">{item.answer}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default FAQ;
