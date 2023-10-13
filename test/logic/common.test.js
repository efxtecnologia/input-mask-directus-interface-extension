import { parsedMask } from "../../src/logic/common";

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
            { value: "", separator: "" },
            { value: "11", separator: "(" },
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
