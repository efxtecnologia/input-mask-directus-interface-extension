import taxIdBR from "./taxIdBR";

const swappedKeysAndValues = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [v, k]));
const identity = x => x;

const types = {
    cep: "CEP",
    taxIdBR: "CNPJ/CPF",
    cxA: "CXA",
    cxB: "CXB",
    currency: "$",
};

const maskFns = {
    cep: identity,
    taxIdBR: identity,
    cxA: identity,
    cxB: identity,
    currency: identity,
};

const maskTypes = swappedKeysAndValues(types);
