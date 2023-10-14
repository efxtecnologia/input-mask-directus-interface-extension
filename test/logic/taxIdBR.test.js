import taxIdMask from "../../src/logic/taxIdBR";

describe("Brazilian taxId Mask", () => {
    describe("when length is less than the minimum for a mask", () => {
        it("Should remove all non numeric chars", () => {
            expect(taxIdMask("a")).toBe("");
            expect(taxIdMask("abc01")).toBe("01");
            expect(taxIdMask("/22")).toBe("22");
            expect(taxIdMask("084.")).toBe("084");
        });
    });

    describe("format as CPF or CNPJ depending on length", () => {
        it("formats as CPF if length is 11", () => {
            expect(taxIdMask("12345678901")).toBe("123.456.789-01");
        });
        it("formats as CNPJ if length is 14", () => {
            expect(taxIdMask("12345678901234")).toBe("12.345.678/9012-34");
        });
    });

    describe("decide how to format an incomplete value depending on its length", () => {
        it("formats as CPF if length is less than 11", () => {
            expect(taxIdMask("1234567890")).toBe("123.456.789-0");
        });

        it("formats as CNPJ if length is more than 11", () => {
            expect(taxIdMask("123456789012")).toBe("12.345.678/9012");
        });
    });

    describe("max length", () => {
        it("doesn't allow length of raw string to go beyond CNPJ length", () => {
            expect(taxIdMask("12.345.678/9012-34")).toBe("12.345.678/9012-34");
            expect(taxIdMask("12.345.678/9012-345")).toBe("12.345.678/9012-34");
        });
    });
});
