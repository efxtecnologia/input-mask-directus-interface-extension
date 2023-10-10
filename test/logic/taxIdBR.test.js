import taxIdMask from "../../src/logic/taxIdBR";
import { asCpf, asCnpj } from "../../src/logic/taxIdBR";

describe("asCpf mask", () => {
    it("should not add a mask if length is greater than 11 chars or less than 4", () => {
        expect(asCpf("123456789012")).toBe("123456789012");
        expect(asCpf("123")).toBe("123");
    });

    it("should add a partial mask when length exceeds 4", () => {
        expect(asCpf("1234")).toBe("123.4");
    });

    it("should add a more parts mask as length grows", () => {
        expect(asCpf("1234567")).toBe("123.456.7");
        expect(asCpf("1234567890")).toBe("123.456.789-0");
        expect(asCpf("12345678901")).toBe("123.456.789-01");
    });
});

describe("asCnpj mask", () => {
    it("should not add a mask if length is greater than 14 chars or less than 3", () => {
        expect(asCpf("123456789012345")).toBe("123456789012345");
        expect(asCpf("12")).toBe("12");
    });

    it("should add a partial mask when length exceeds 2", () => {
        expect(asCnpj("123")).toBe("12.3");
    });

    it("should add a more parts mask as length grows", () => {
        expect(asCnpj("1234567")).toBe("12.345.67");
        expect(asCnpj("1234567890")).toBe("12.345.678/90");
        expect(asCnpj("1234567890123")).toBe("12.345.678/9012-3");
        expect(asCnpj("12345678901234")).toBe("12.345.678/9012-34");
    });
});

describe("Brazilian taxId Mask", () => {
    describe("when length is less than the minimum for a mask", () => {
        it("Should remove all non numeric chars", () => {
            expect(taxIdMask("abc01")).toBe("01");
            expect(taxIdMask("/22")).toBe("22");
            expect(taxIdMask("084.")).toBe("084");
        });
    });

    describe("format as CPF or CNPJ depending on lenght", () => {
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
});
