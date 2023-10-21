import InterfaceWebMRPMaskEdit from './interface.vue';

export default {
	  id: 'webmrp-maskedit',
	  name: 'Mask Edit Field',
	  icon: "box",
	  description: 'Masked edit field',
	  component: InterfaceWebMRPMaskEdit,
	  types: ['string', 'integer', 'bigInteger'],
    localTypes: ["standard"],
    group: "standard",
	  options: () => {
        return [
            {
                field: "mask",
                type: "string",
                name: "Mask",
                meta: {
                    interface: "input",
                    width: "half",
                    options: {
                        placeholder: "Enter a valid mask",
                    },
                },
            },
            {
                field: "validationRequestMethod",
                type: "string",
                name: "HTTP Method",
                meta: {
                    interface: "select-dropdown",
                    width: "half",
                    options: {
                        choices: [
                            { text: "GET", value: "GET" },
                            { text: "PUT", value: "PUT" },
                            { text: "POST", value: "POST" },
                        ]
                    },
                },
            },
            {
                field: "validationURL",
                type: "string",
                name: "URL",
                meta: {
                    interface: "input",
                    width: "full",
                    options: {
                        placeholder: "Validation URL",
                    },
                },
            },
        ];
    },
};
