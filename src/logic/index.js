import taxIdBR from "./taxIdBR";

const swappedKeysAndValues = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [v, k]));
const identity = x => x;

const types = {
    cep: "CEP",
    taxIdBR: "CNPJ/CPF",
    cxA: "CXA",
    cxB: "CXB",
    currency: "$",
    formatedNumber: "#,##0.00", // formatted number with thousands separators and 2 digit precision
    integer: "I",
    phoneNumberBR: "TEL", // formats land line or cell phone numbers accordingly
};

const maskFns = {
    cep: identity,
    taxIdBR,
    cxA: identity,
    cxB: identity,
    currency: identity,
    formatedNumber: identity,
    integer: identity,
    phoneNumberBR: identity,
};

const typesByMask = swappedKeysAndValues(types);

function maskEditFn(maskId, value) {
    const maskFn = maskFns[typesByMask[maskId.toUpperCase()]] || identity;
    return maskFn(value);
}

export default maskEditFn;
