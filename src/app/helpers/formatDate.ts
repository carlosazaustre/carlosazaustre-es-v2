/**
 * Formats a date string into a human-readable format with a relative time description.
 * @param date - The date string to be formatted.
 * @returns The formatted date string with a relative time description.
 */
export function formatDate(date: string) {
	let currentDate = new Date();
	let targetDate = new Date(date);

	let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
	let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
	let daysAgo = currentDate.getDate() - targetDate.getDate();

	let formattedDate = "";

	if (yearsAgo > 0) {
		formattedDate = `Hace ${yearsAgo} año${yearsAgo > 1 ? "s" : ""}`;
	} else if (monthsAgo > 0) {
		formattedDate = `Hace ${monthsAgo} mes${monthsAgo > 1 ? "es" : ""}`;
	} else if (daysAgo > 0) {
		formattedDate = `Hace ${daysAgo} día${daysAgo > 1 ? "s" : ""}`;
	} else {
		formattedDate = "Hoy.";
	}

	let fullDate = targetDate.toLocaleDateString("es-ES", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	return `${fullDate} (${formattedDate})`;
}
