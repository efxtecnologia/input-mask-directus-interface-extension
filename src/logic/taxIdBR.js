import { stripped } from "./common";

const cpfMask =  "000.000.000-00";
const cnpjMask = "00.000.000/0000-00";
const cpfLength = 11;
const cnpjLength = 14;

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
    if (s.length > cpfLength || s.length < 4) {
        return s;
    }
    return cpfMaskFn(s).reduce(withSeparator, "");
}

function asCnpj(s) {
    if (s.length > cnpjLength || s.length < 3) {
        return s;
    }
    return cnpjMaskFn(s).reduce(withSeparator, "");
}

const taxIdMask = _value => {
    const value = stripped(_value);

    if (value.length > cnpjLength) {
        return taxIdMask(value.slice(0, cnpjLength));
    }

    if (value.length <= cpfLength) {
        return asCpf(value);
    }

    return asCnpj(value);
};

export default taxIdMask;

export { asCpf, asCnpj };
