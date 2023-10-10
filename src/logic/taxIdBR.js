import { stripped } from "./common";

const cpfMask =  "000.000.000-00";
const cnpjMask = "00.000.000/0000-00";

const cpfMaskFn = s => [
    { value: s.slice(0, 3), separator: "." },
    { value: s.slice(3, 6), separator: "." },
    { value: s.slice(6, 9), separator: "." },
    { value: s.slice(9, 11), separator: "-" },
];

const cnpjMaskFn = s => [
    { value: s.slice(0, 2), separator: "." },
    { value: s.slice(2, 5), separator: "." },
    { value: s.slice(5, 8), separator: "." },
    { value: s.slice(8, 12), separator: "/" },
    { value: s.slice(12, 14), separator: "-" },
];

function withSeparator(s, { separator, value }) {
    if (value === "") {
        return s;
    }
    return s + (s === "" ? "" : separator) + value;
}

function asCpf(s) {
    if (s.length > 11 || s.length < 4) {
        return s;
    }
    return cpfMaskFn(s).reduce(withSeparator, "");
}

function asCnpj(s) {
    if (s.length > 14 || s.length < 3) {
        return s;
    }
    return cnpjMaskFn(s).reduce(withSeparator, "");
}

export default _value => {
    const value = stripped(_value);
    if (value.length < 12) {
        return asCpf(value);
    }
    return asCnpj(value);
}

export { asCpf, asCnpj };
