<template>
  <div>
    <label for="product">{{ label }} <span>*</span></label>

    <multiselect
      id="product"
      v-model="selectedProduct"
      :options="products"
      :multiple="multiple"
      :close-on-select="!multiple"
      :clear-on-select="false"
      :preserve-search="true"
      :placeholder="placeholder"
      label="name"
      track-by="name"
      :searchable="true"
      @search-change="findProduct"
      :showLabels="false"
      :disabled="disabled"
      :preserveSearch="false"
      :loading="fetchingResource"
      ref="productSelect"
    >
      <template slot="singleLabel" slot-scope="{ option }">
        {{ option.name }}
      </template>

      <template slot="selection" slot-scope="{ values, isOpen }">
        <div v-if="values.length && !isOpen">
          <div v-if="values.length < 4">
            <div
              class="multiselect__single mb-2 dropdown-value"
              v-for="(value, key) in values"
              :key="key"
            >
              {{ value.name }}
            </div>
          </div>

          <div v-else>
            <div
              class="multiselect__single mb-2 dropdown-value"
              v-for="index in 3"
              :key="index"
            >
              {{ values[index - 1].name }}
            </div>

            <span
              class="multiselect__single mb-2 dropdown-value bold"
              v-if="values.length && !isOpen"
              >and {{ values.length - 3 }} more</span
            >
          </div>
        </div>
      </template>

      <template slot="noOptions">
        <div v-if="fetchingResource">Loading {{ type }}</div>
        <div v-else>No {{ type }} found</div>
      </template>
    </multiselect>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import _ from 'lodash'
import Helpers from '~/mixins/Helpers'

export default {
  components: {
    Multiselect,
  },

  mixins: [Helpers],

  props: {
    refName: {
      type: String,
      default: '',
    },

    type: {
      type: String,
      default: 'product',
    },

    label: {
      type: String,
      default: 'Products',
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
    },
  },

  data() {
    return {
      productCollection: [],

      selectedProduct: null,

      currentPage: 1,
      perSelect: 100,

      fetchingResource: false,
      search: null,

      hasMore: true,
      scrollLimit: -300,
    }
  },

  computed: {
    products() {
      return this.productCollection.map((product) => ({
        id: product.id,
        name: product.product_name,
        cost: product.cost
      }))
    },
  },

  methods: {
    async getProducts() {
      if (!this.hasMore) {
        return
      }

      this.fetchingResource = true

      try {
        const response = await this.$axios.$get(`${process.env.baseUrl}/products-collection`, {
          params: {
            keyword: this.search,
            page: this.currentPage,
          }
        })

        this.totalProductCount = response.meta.total
        this.productCollection = [...this.productCollection, ...response.data]

        this.checkIfHasMore(response.links.next)

        this.fetchingResource = false
      } catch (e) {
        this.fetchingResource = false
        console.log(e)
      }
    },

    checkIfCanLoadMore() {
      if (!this.fetchingResource) {
        this.getProducts()
      }
    },

    checkIfHasMore(nextLink) {
      if (nextLink) {
        this.currentPage++
      } else {
        this.hasMore = false
      }
    },

    findProduct(query) {
      this.fetchingResource = true
      this.debounceFindProduct(query)
    },

    debounceFindProduct: _.debounce(function (query) {
      this.search = query
      this.reset()
    }, 2000),

    reset() {
      this.currentPage = 1
      this.productCollection = []
      this.hasMore = true
      this.getProducts()
    },
  },

  watch: {
    selectedProduct(newValue) {
      this.$nuxt.$emit(`productChanges-${this.refName}`, newValue)
    },

    products(newValue) {
      this.$nuxt.$emit(
        `productCollectionChanges-${this.refName}`,
        newValue,
        this.totalProductCount
      )
    },

    // productCollection(newValue) {
    //   if (newValue?.length) {
    //     setTimeout(() => {
    //       this.infiniteScrollScrollPagination(
    //         this.$refs.productSelect.$el.querySelector(
    //           '.multiselect__content-wrapper'
    //         ),
    //         this.scrollLimit,
    //         this.checkIfCanLoadMore
    //       )
    //     }, 2000)
    //   }
    // }
  },

  created() {
    this.$nuxt.$on(`loadMore-${this.refName}`, () => this.checkIfCanLoadMore())
  },

  mounted() {
    if (!this.disabled) {
      this.getProducts()
    }

    this.$refs.productSelect.$refs.search.setAttribute('autocomplete', 'off')

    setTimeout(() => {
      this.infiniteScrollScrollPagination(
        this.$refs.productSelect.$el.querySelector(
          '.multiselect__content-wrapper'
        ),
        this.scrollLimit,
        this.checkIfCanLoadMore
      )
    }, 2000)
  },
}
</script>