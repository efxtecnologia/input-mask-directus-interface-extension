import { commonMasker, multiFormatter } from "./common";

const swappedKeysAndValues = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [v, k]));
const identity = x => x;

const types = {
    cep: "CEP",
    taxIdBR: "CNPJ/CPF",
    phoneNumberBR: "TEL", // formats land line or cell phone numbers accordingly
    cxA: "CXA",
    cxB: "CXB",
    currency: "$",
    formatedNumber: "#,##0.00", // formatted number with thousands separators and 2 digit precision
    integer: "I",
};

const maskFns = {
    cep: s => commonMasker("00000-000", s),
    taxIdBR: s => multiFormatter(["000.000.000-00", "00.000.000/0000-00"], s),
    phoneNumberBR: s => multiFormatter(["(00)0000-0000", "(00)00000-0000"], s),
    cxA: s => s.toUpperCase(),
    cxB: s => s.toLowerCase(),
    currency: identity,
    formatedNumber: identity,
    integer: identity,
};

const typesByMask = swappedKeysAndValues(types);

function trimmedOnSoftLength(softLength, value) {
    if ( ! softLength || softLength <= 0 ) {
        return value;
    }
    return value.slice(0, softLength);
}

function maskEditFn({ mask, softLength }, value) {
    const maskFn = maskFns[typesByMask[mask.toUpperCase()]] || identity;
    return trimmedOnSoftLength(softLength, maskFn(value));
}

export default maskEditFn;
