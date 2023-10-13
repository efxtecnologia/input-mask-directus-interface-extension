import cep from "../../src/logic/cep";

describe("CEP mask", () => {
    it("allows only numeric chars", () => {
        expect(cep("abc0d1e")).toBe("01");
    });

    it("formats a string of numbers as CEP", () => {
        expect(cep("043630")).toBe("04363-0");
        expect(cep("0436304")).toBe("04363-04");
        expect(cep("04363043")).toBe("04363-043");
    });

    it("doesn't let the length exceed max CEP length", () => {
        expect(cep("123456789")).toBe("12345-678");
    });
});
