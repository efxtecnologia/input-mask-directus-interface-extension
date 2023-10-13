import { stripped, withSeparator } from "./common";

const cepLength = 8;

const maskFn = s => [
    { value: s.slice(0, 5), separator: "" },
    { value: s.slice(5, 8), separator: "-" },
];

const cep = (s) => {
    const value = stripped(s);

    if (value.length > cepLength) {
        return cep(value.slice(0, cepLength));
    }

    if (value.length < 6 || value.length > cepLength) {
        return value;
    }
    return maskFn(value).reduce(withSeparator, "");
};

export default cep;
