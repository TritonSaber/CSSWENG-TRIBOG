<template>
  <CommonContainer>
    <CommonHeadingDetails
      :title="title"
      :details="details"
      :route="route"
    />

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
    </b-container>
  </CommonContainer>
</template>

<script>
import ProductsTable from './ProductsTable'

export default {
  components: { ProductsTable },

  data() {
    return {
      title: 'Product List',
      details: 'Add New Product',
      route: '/addProduct',

      search: '',
    }
  },

  computed: {
    searchParam() {
      return this.search
    },
  },
}
</script>
