<template>
	<input :value="value" @input="handleChange($event.target.value)" />
</template>

<script>
    export default {
	      props: {
	          mask: {
		            type: String,
		            required: true,
	          },
		        value: {
			          type: [String, Number],
			          default: null,
		        },
	      },
	      emits: ['input'],
	      setup(props, { emit }) {
            console.log("Extenstion Setup");
		        return { handleChange };

		        function handleChange(value) {
                console.log(props.mask);

			          emit('input', value);
		        }
	      },
    };
</script>
