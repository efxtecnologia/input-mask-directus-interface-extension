const stripped = s => s.replace(/\D/g, '');

function withSeparator(s, { separator, value }) {
    if (value === "") {
        return s;
    }
    return s + (s === "" ? "" : separator) + value;
}

export {
    stripped,
    withSeparator,
}
