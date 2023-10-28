async function validate(api, props) {
    if (! props.validationURL || ! props.validationRequestMethod) {
        return { valid: true, success: { message: "Valid without calling the API" } };
    }

    const apiMethod = api[props.validationRequestMethod.toLowerCase()];
    const response = await apiMethod(props.validationURL, { type: props.mask, value: props.value });
    return response.data;
}

function setAdditionalFields({ emit }, { valid, result }) {
    const { payload } = result;
    if (! valid || ! payload || Object.keys(payload).length === 0) {
        return;
    }
    Object.keys(payload).forEach((k, v) => emit("setFieldValue", { field: k, value: v }));
}

export default validate;
export { setAdditionalFields };
