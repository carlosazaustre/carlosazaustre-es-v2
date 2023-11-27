import { formatDate } from "@/app/helpers/formatDate";

describe("formatDate", () => {
	it("should format the date correctly when it is in the past", () => {
		const result = formatDate("2021-01-01");
		expect(result).toBe("1 de enero de 2021 (Hace 1 año)");
	});

	it("should format the date correctly when it is today", () => {
		const today = new Date().toLocaleDateString("es-ES", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
		const result = formatDate(today);
		expect(result).toBe(`${today} (Hoy)`);
	});

	it("should format the date correctly when it is in the future", () => {
		const result = formatDate("2023-12-31");
		expect(result).toBe("31 de diciembre de 2023 (En el futuro)");
	});
});
