<template>
    <div>
        <label for="product">{{ label }} <span>*</span></label>

        <multiselect
            v-model="selectedProduct"
            :options="products"
            :multiple="multiple"
            :close-on-select="!multiple"
            :clear-on-select="false"
            :preserve-search="true"
            :placeholder="placeholder"
            track-by="name"
            label="name"
            :searchable="true"
            :showLabels="false"
            :disabled="disabled"
            :loading="fetchingResource"
            ref="productSelect"

        >
            <template slot="noOptions">
                <div v-if="fetchingResource">Loading {{ type }}</div>
                <div v-else>No {{ type }} found</div>
            </template>
        </multiselect>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect';

export default {
    components: {
        Multiselect,
    },

    props: {
        type: {
            type: String,
            default: 'type',
        },
        label: {
            type: String,
            default: 'Product',
        },
        placeholder: {
            type: String,
            default: 'Select Product',
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        }

    },

    data() {
        return {
            selectedProduct: null,

            data: [],

            isBusy: false,
            loading: true,
            hasError: false,

            fetchingResource: false,
        }
    },

    methods: { 
        async toggleBusy() {
            this.isBusy = !this.isBusy
        },

        async getProducts() {
            this.toggleBusy()

            try {
                const response = await this.$axios.$get(`${process.env.baseUrl}/products-collection`)

                this.data = response.data
                this.loading = false
            } catch (e) {
                console.log(e)

                this.loading = false
                this.hasError = true
            } finally {
                this.toggleBusy()
                this.loading = false
            }
        },

    },

    computed: {
        products() {
            return this.data.map((product) => ({
                id: product.id,
                name: product.product_name,
            }))
        },
    },

    watch: {
        selectedProduct(newValue){
            this.$emit('productChanges', newValue)
        }
    },

    mounted(){
        this.getProducts()
    },

}
</script>