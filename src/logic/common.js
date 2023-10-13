const stripped = s => s.replace(/\D/g, '');

function withSeparator(s, { separator, value }) {
    if (value === "") {
        return s;
    }
    return s + (s === "" ? "" : separator) + value;
}

function groupPart(separators, prior, group, index) {
    const start = prior.finish ? prior.finish : 0;
    const finish = (prior.finish ? prior.finish : 0) + group.length;
    const slicer = s => s.slice(start, finish);
    const separator = index > 0 ? separators[index-1] : "";
    return { group, slicer, separator, finish };
}

const parsedMask = mask => {
    const groups = mask.split(/[^0-9]/g);
    const separators = Array.from(mask.replace(/\d/g, ''));
    const maskMap = groups.reduce(
        (prior, group, index) => [
            ...prior, groupPart(separators, index > 0 ? prior[index-1] : {}, group, index)
        ],
        [],
    );
    return value => {
        return maskMap.map(groupPart => {
            return {
                value: groupPart.slicer(value),
                separator: groupPart.separator,
            };
        });
    };
};

export {
    stripped,
    withSeparator,
    parsedMask,
}
