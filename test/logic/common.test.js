import { parsedMask, commonMasker } from "../../src/logic/common";

describe("parsedMask", () => {
    it("converts a string representation of a mask into a masking function", () => {
        const maskFn = parsedMask("000-00");
        expect(maskFn("12345")).toEqual([
            { value: "123", separator: "" },
            { value: "45", separator: "-" },
        ]);
    });

    it("converts any string into the corresponding masking function", () => {
        expect(parsedMask("00000-000")("04363040")).toEqual([
            { value: "04363", separator: "" },
            { value: "040", separator: "-" },
        ]);

        expect(parsedMask("(00)00000-0000")("11945678901")).toEqual([
            { value: "(", separator: "" },
            { value: "11", separator: "" },
            { value: "94567", separator: ")" },
            { value: "8901", separator: "-" },
        ]);

        expect(parsedMask("00.000.000/0000-00")("11063892000196")).toEqual([
            { value: "11", separator: "" },
            { value: "063", separator: "." },
            { value: "892", separator: "." },
            { value: "0001", separator: "/" },
            { value: "96", separator: "-" },
        ]);
    });
});

describe("Common masker", () => {
    it("applies a mask to a value", () => {
        expect(commonMasker("00000-000", "04363040")).toBe("04363-040");
        expect(commonMasker("00.000.000/0000-00", "11063892000196")).toBe("11.063.892/0001-96");
        expect(commonMasker("(00)0000-0000", "11954321234")).toBe("(11)9543-2123");
        expect(commonMasker("(00)00000-0000", "11954321234")).toBe("(11)95432-1234");
    });

    it("applies a mask to a partial value", () => {
        expect(commonMasker("00000-000", "043630")).toBe("04363-0");
        expect(commonMasker("00000-000", "04360")).toBe("04360");
        expect(commonMasker("00000-000", "0436")).toBe("0436");
        expect(commonMasker("00.000.000/0000-00", "11063892")).toBe("11.063.892");
    });

    it("allows only numbers", () => {
        expect(commonMasker("00000-000", "a043630")).toBe("04363-0");
        expect(commonMasker("00000-000", "043630z")).toBe("04363-0");
    });

    it("limits length to the max length of mask", () => {
        expect(commonMasker("00000-000", "043630401")).toBe("04363-040");
        expect(commonMasker("(00)00000-0000", "119543212345")).toBe("(11)95432-1234");
    });

    it("returns empty string if value is empty", () => {
        expect(commonMasker("000.000.000-00", "")).toBe("");
    });
});
