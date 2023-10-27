<template>
    <section>
    <v-input
        :model-value = "value"
        @update:model-value="handleChange($event)"
        @blur="onBlur"
    />
    <v-notice v-if="error" type="danger">{{ errorMessage }}</v-notice>
    </section>
</template>

<script>
    import { nextTick, ref } from "vue";
    import { useApi } from '@directus/extensions-sdk';
    import maskEditFn from "./logic/index";
    import validate from "./controller";
    export default {
	      props: {
	          mask: {
		            type: String,
		            required: true,
	          },
            validationRequestMethod: {
                type: String,
                required: false,
            },
            validationURL: {
                type: String,
                required: false,
            },
		        value: {
			          type: [String, Number],
			          default: null,
		        },
            error: {
                type: Boolean,
                default: false,
            },
            errorMessage: {
                type: String,
                default: null,
            },
	      },
	      emits: ['input'],
	      setup(props, context) {
            const api = useApi();
            const { emit } = context;
            const errorMessage = ref(null);
            const error = ref(false);
            let priorValue = props.value;

		        async function handleChange(_value) {
                const value = _value === null ? "" : _value;
                const newValue = maskEditFn(props.mask, value);
			          emit('input', value);
                await nextTick();
			          emit('input', newValue);
		        }

            const onBlur = async e => {
                const valueChanged = priorValue !== props.value;
                if (valueChanged) {
                    priorValue = props.value;
                    const validation = await validate(api, props);
                    // error.value = ! validation.valid;
                    error.value = true;
                    errorMessage.value = validation.result.message;
                } else {
                    // error.value = false;
                }
            };

		        return { handleChange, onBlur, error, errorMessage };
	      },
    };
</script>
