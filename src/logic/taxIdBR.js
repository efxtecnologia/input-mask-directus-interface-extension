import { stripped } from "./common";

const cpfMask = "___.___.___-__";
const cnpjMask = "__.___.___/____-__";

function asCpf(s) {
    
}

export default value => {
    // remove all separators
    // clear non number chars - allow only numbers
    stripped(value)
    // set separators depending on value length
    return value;
}
