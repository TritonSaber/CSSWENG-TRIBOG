<template>
  <CommonContainer>
    <CommonHeadingDetails
      :title="title"
    >
      <b-button
        squared size="sm" 
        class="d-flex align-items-center additem__button"
        @click="showAddProductModal"
      >
        Add New Product <em class="fas fa-plus-square ml-2"></em>
      </b-button>
    </CommonHeadingDetails>

    <b-container class="body__container shadow">
      <b-row class="table-bg">
        <b-col md="auto" class="my-2">
          <CommonSearchInput
            placeholder="Search Products"
            v-on:changed="search = $event"
          />
        </b-col>
      </b-row>

      <ProductsTable :search="searchParam" />
      
      <AddProductsTable />
    </b-container>
  </CommonContainer>
</template>

<script>
import AddProductsTable from './AddProductsTable';
import ProductsTable from './ProductsTable'

export default {
  components: { ProductsTable, AddProductsTable },

  data() {
    return {
      title: 'Product List',

      search: '',
    }
  },

  methods: {
    showAddProductModal() {
      this.$bvModal.show('add-product-modal')
    },
  },

  computed: {
    searchParam() {
      return this.search
    },
  },
}
</script>
