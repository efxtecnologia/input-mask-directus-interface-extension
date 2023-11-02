import { nextTick } from "vue";

async function validate(api, props) {
    if (! props.validationURL || ! props.validationRequestMethod) {
        return { valid: true, result: { message: "Valid without calling the API", payload: {} } };
    }

    const apiMethod = api[props.validationRequestMethod.toLowerCase()];
    const response = await apiMethod(props.validationURL, { type: props.mask, value: props.value });
    return response.data;
}

async function setAdditionalFields(values, { emit, attrs }, { result }) {
    const { payload } = result;
    if (! payload || Object.keys(payload).length === 0) {
        return;
    }

    for await (const k of Object.keys(payload)) {
        if (attrs.field !== k && values.value[k] !== undefined) {
            await nextTick();
            emit("setFieldValue", { field: k, value: payload[k] });
        }
    }
}

export default validate;
export { setAdditionalFields };
