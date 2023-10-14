import { stripped, commonMasker } from "./common";

const cpfMask =  "000.000.000-00";
const cnpjMask = "00.000.000/0000-00";
const cpfLength = 11;

const taxIdMask = _value => {
    const value = stripped(_value);

    if (value.length > cpfLength) {
        return commonMasker(cnpjMask, value);
    }

    return commonMasker(cpfMask, value);
};

export default taxIdMask;
