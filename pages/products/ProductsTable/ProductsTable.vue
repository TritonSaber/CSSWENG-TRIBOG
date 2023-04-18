<template>
  <div>
    <b-table
      responsive
      class="btable__container mb-0"
      :fields="fields"
      :items="products"
      :show-empty="!loading"
      :busy="isBusy"
      empty-text="There are no products found!"
      sort-icon-left
      ref="paginatedTable"
    >
    <!-- add new tag in id -->
    <template #cell(id)="row">
      <div 
        class="d-flex align-items-center"
        :class="[
          row.item.isNew
            ? 'justify-content-between'
            : 'justify-content-end',
        ]"
      >
        <div v-if="row.item.isNew" class="tag new mr-2">NEW</div>
        {{ row.item.id }}
      </div>
    </template>

    <!-- popper for product name and product category -->
    <template #cell(product_name)="row">
      <div class="product-description" v-b-popover.hover.top="row.item.product_name">
        {{ row.item.product_name }}
      </div>
    </template>
    <template #cell(product_line)="row">
      <div class="product-description" v-b-popover.hover.top="row.item.product_line">
        {{ row.item.product_line }}
      </div>
    </template>

    <!-- format cost -->
    <template #cell(cost)="row">
      PHP {{ numberFormat(row.item.cost) }}
    </template>

    <!-- format date -->
    <template #cell(created_at)="row">
      {{ row.item.created_at | formatDate }}
    </template>
    <template #cell(updated_at)="row">
      {{ row.item.updated_at | formatDate }}
    </template>

    <!-- actions button -->
    <template #cell(actions)="row">
      <div class="d-flex align-items-center justify-content-center bg-white">
        <CommonActionButton
          icon="edit bg-white"
          v-on:click="$event => showEditProductsModal(row.item)"
        />
        <CommonActionButton
          icon="trash bg-white"
          childClass="danger ml-3"
          v-on:click="$event => showDeleteProductsModal(row.item)"
        />
      </div>
    </template>
  </b-table>

  <CommonPagination 
    :currentPageCount="currentPageCount"
    :totalRows="totalRows"
    :perPage="limitPerPage"
    @pageChange="fetchPage"
  />

  <EditProductsModal :product="selectedProduct" />

  <CommonDeleteModal 
    type="Product"
    :isDeleting="isDeleting"
    v-on:click="deleteProduct"
  />
  </div>
  
</template>

<script>
import EditProductsModal from '../EditProductsModal/EditProductsModal'
import _ from 'lodash'
import Helpers from '~/mixins/Helpers'

export default {
  components: { EditProductsModal },

  mixins: [Helpers],

  props: {
    search: {
      type: String,
      default: '',
    }
  },

  data() {
    return {
      data: [],

      isBusy: false,
      loading: true,
      hasError: false,
      hasMore: true,

      limitPerPage: 25,
      currentPageCount: 0,
      currentPage: 1,
      totalRows: 0,

      fields: [
        { 
          label: 'Product ID',
          key: 'id', 
          sortable: true, 
          thClass: 'thead',
          tdClass: 'tbody',
        },
        {
          label: 'Product Name',
          key: 'product_name', 
          sortable: true,
          thClass: 'thead',
          tdClass: 'tbody text-center',
        },
        {
          label: 'Category',
          key: 'product_line', 
          sortable: true,
          thClass: 'thead',
          tdClass: 'tbody text-center',
        },
        {
          label: 'Quantity',
          key: 'quantity', 
          sortable: true,
          thClass: 'thead',
          tdClass: 'tbody text-right',
        },
        {
          label: 'Price',
          key: 'cost', 
          sortable: true,
          thClass: 'thead',
          tdClass: 'tbody text-right',
        },
        {
          label: 'Sold Items',
          key: 'quantity_sold', 
          sortable: true,
          thClass: 'thead',
          tdClass: 'tbody text-right',
        },
        {
          label: 'Created At',
          key: 'created_at', 
          sortable: true,
          thClass: 'thead',
          tdClass: 'tbody',
        },
        {
          label: 'Updated At',
          key: 'updated_at', 
          sortable: true,
          thClass: 'thead',
          tdClass: 'tbody',
        },
        {
          label: 'Actions',
          key: 'actions', 
          thClass: 'thead',
          tdClass: 'tbody',
        },
      ],

      selectedProduct: null,
      isDeleting: false,
      isAdding: false,
      isEditing: false,
    }
  },

  methods: {
    async toggleBusy() {
      this.isBusy = !this.isBusy
    },

    async getProducts() {
      this.toggleBusy()

      try {
        const response = await this.$axios.$get(`${process.env.baseUrl}/products-collection`, {
          params: {
            keyword: this.searchParams,
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

    async fetchPage(page) {
      this.currentPage = page
      await this.getProducts()
    },

    showEditProductsModal(product) {
      this.selectedProduct = product

      this.$bvModal.show('edit-product-modal')
    },

    showDeleteProductsModal(product) {
      this.selectedProduct = product

      this.$bvModal.show('delete-modal')
    },

    async deleteProduct() {
      this.isDeleting = true

      try {
        await this.$axios.$delete(`${process.env.baseUrl}/products-delete/${this.selectedProduct?.id}`)

        this.selectedProduct = null
      } catch (e) {
        console.log(e)
      } finally {
        this.$bvModal.hide('delete-modal')
        this.isDeleting = false

        this.getProducts()
      }
    }
  },

  computed: {
    products() {
      const products = this.data.map((product) => ({
        ...product,
        isNew: this.isNew(product.created_at),
      }))

      return _.sortBy(products, ['product_name'])
    },

    searchParams() {
      return this.search
    },
  },

  created() {
    this.$nuxt.$on('addedProduct', (isAdding) => {
      this.isAdding = isAdding
    })

    this.$nuxt.$on('editedProduct', (isEditing) => {
      this.isEditing = isEditing
    })
  },

  watch: {
    search() {
      this.getProducts()
    },

    isAdding() {
      this.getProducts()
      this.isAdding = false
    },

    isEditing() {
      this.getProducts()
      this.isEditing = false
    }
  },

  mounted() {
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
.tag.new {
  color: white;
  background-color: green;
  padding: 4px 10px;
  font-size: 8px;
  border-radius: 5px;
  letter-spacing: 1px;
  font-weight: 500;
}

.product-description {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>