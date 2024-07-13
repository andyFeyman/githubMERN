import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

export function formatMemberSince(inputDateString) {
	const options = { month: "short", day: "2-digit", year: "numeric" };
	const formattedDate = new Date(inputDateString).toLocaleDateString("en-US", options);
	return formattedDate;
}

export function formatDate(inputDateString) {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const date = new Date(inputDateString);
	const monthName = months[date.getMonth()];
	const day = date.getDate();
	const year = date.getFullYear();

	// Function to add ordinal suffix to day
	function getOrdinalSuffix(day) {
		if (day >= 11 && day <= 13) {
			return day + "th";
		}
		switch (day % 10) {
			case 1:
				return day + "st";
			case 2:
				return day + "nd";
			case 3:
				return day + "rd";
			default:
				return day + "th";
		}
	}

	const formattedDate = `${monthName} ${getOrdinalSuffix(day)}, ${year}`;
	return formattedDate;
}

export function timeStampFormatter(timestamp) {
	//Date 構造函數期望的時間戳是毫秒，而提供的 timestamp 是以秒為單位的時間戳。這會導致生成的日期非常小，結果是 1970-01-21。
	const date = new Date(parseInt(timestamp*1000));
	if (isNaN(date)) {
		return 'Invalid Date:'+timestamp+"this is type of"+typeof(timestamp);
	  }
	const formattedDate = format(date, "MMMM d, yyyy, h:mm a");
	return formattedDate;
  };
  
  