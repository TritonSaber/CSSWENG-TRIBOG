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
            @infinite="loadMore"
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

            limitPerPage: 10,
            currentPageCount: 0,
            currentPage: 1,
            totalRows: 0,

            fetchingResource: false,
        }
    },

    methods: { 
        async toggleBusy() {
            this.isBusy = !this.isBusy
        },

        async getProducts(page) {
            this.toggleBusy()

            try {
                const response = await this.$axios.$get(`${process.env.baseUrl}/products-collection`,{
                    params: {
                        page: this.currentPage,
                    }
                })

                this.currentPageCount = response.meta.to
                this.totalRows = response.meta.total

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

        async loadMore() {
            const nextPage = this.page + 1
            const newProducts = await this.getProducts(nextPage)
            this.products = this.products.concat(newProducts)
            this.page = nextPage
        }

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
        this.getProducts(this.page)
    },

}
</script> 

<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>