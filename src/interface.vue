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
    import maskEditFn from "./logic/index";
    import { nextTick, ref } from "vue";
    import { useApi } from '@directus/extensions-sdk';
    export default {
	      props: {
	          mask: {
		            type: String,
		            required: true,
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
                    if (props.validationURL) {
                        const response = await api.get(props.validationURL);
                        console.log(response);
                    }
                    error.value = true;
                    errorMessage.value = "O valor mudou";
                } else {
                    // error.value = false;
                }
            };

		        return { handleChange, onBlur, error, errorMessage };
	      },
    };
</script>
