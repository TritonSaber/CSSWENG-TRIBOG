<template>
  <b-modal
    id="edit-product-modal"
    centered
    title="Edit Product"
    modal-class="generic-modal"
  >
    <!-- edit form -->
    <b-form class="generic-form">
      <b-form-group>
        <b-row>
          <b-col>
            <label for="product-name">Product Name <span>*</span></label>
            <b-form-input
              id="product-name"
              type="text"
              placeholder="Enter Product Name"
              required
              v-model="formData.product_name"
            ></b-form-input>
          </b-col>
          <b-col>
            <CommonCategorySelect
              type="category"
              v-on:categoryChanges="$event => setCategory($event)"
            />
          </b-col>
        </b-row>
      </b-form-group>

      <b-form-group>
        <b-row>
          <b-col>
            <label for="quantity">Quantity <span>*</span></label>
            <b-form-input
              id="quantity"
              type="number"
              min="0"
              placeholder="Enter Quantity"
              required
              v-model="formData.quantity"
              @keydown="preventDecimal"
              @blur="setQuantityToZero"
            ></b-form-input>
          </b-col>
          <b-col>
            <label for="price">Price <span>*</span></label>
            <b-form-input
              id="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="Enter Price"
              required
              v-model="formData.cost"
              @blur="setCostToZero"
            ></b-form-input>
          </b-col>
          <b-col>
            <label for="quantity_sold">Quantity Sold <span>*</span></label>
            <b-form-input
              id="quantity_sold"
              type="number"
              step="1"
              min="0"
              placeholder="Enter Quantity Sold"
              required
              v-model="formData.quantity_sold"
              @keydown="preventDecimal"
              @blur="setQuantitySoldToZero"
            ></b-form-input>
          </b-col>
        </b-row>
      </b-form-group>
    </b-form>

    <!-- edit modal buttons -->
    <template #modal-footer="{ cancel }">
      <b-button @click="cancel()"> Cancel </b-button>
      <b-button
        type="submit"
        class="btn-info"
        @click="submit"
        :disabled="submitting || !enableSubmit"
      >
        Update
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import Helpers from '~/mixins/Helpers'

export default {
  mixins: [Helpers],

  props: {
    product: {
      type: Object | null,
      required: true,
    }
  },

  data() {
    return {
      submitting: false,

      formData: {
        product_name: '',
        product_line: '',
        quantity: 0,
        cost: this.numberFormat(0),
        quantity_sold: 0,
        updated_at: new Date(),
      }
    }
  },

  methods: {
    async submit() {
      this.submitting = true

      try {
        await this.$axios.$put(`${process.env.baseUrl}/products-update/${this.product.id}`, this.requestParams)
      } catch (e) {
        console.log(e)
      } finally {
        this.submitting = false

        this.$bvModal.hide('edit-product-modal')

        this.$nuxt.$emit('editedProduct', true)

        this.resetFormData()
      }
    },

    setCategory(category) {
      this.formData.product_line = category ? category.name : '';
    },

    setQuantityToZero() {
      if (!this.formData.quantity) {
        this.formData.quantity = 0;
      }
    },

    setCostToZero() {
      if (!this.formData.cost) {
        this.formData.cost = this.numberFormat(0);
      }
    },

    setQuantitySoldToZero() {
      if (!this.formData.quantity_sold) {
        this.formData.quantity_sold = 0;
      }
    },

    resetFormData() {
      this.formData = {
        product_name: '',
        product_line: '',
        quantity: 0,
        cost: this.numberFormat(0),
        quantity_sold: 0,
        updated_at: new Date(),
      }
    }
  },

  computed: {
    enableSubmit() {
      return (
        this.formData.product_name && 
        this.formData.product_line &&
        this.quantityParams &&
        this.costParams &&
        this.quantitySoldParams
      )
    },

    quantityParams() {
      return (this.formData.quantity >= 0)
    },

    costParams() {
      return (this.formData.cost >= 0)
    },

    quantitySoldParams() {
      return (this.formData.quantity_sold >= 0)
    },

    requestParams() {
      return {
        ...this.formData,
        quantity: Number(this.formData.quantity),
        cost: Number(this.formData.cost),
        quantity_sold: Number(this.formData.quantity_sold),
        updated_at: new Date(),
      }
    },
  },

  watch: {
    product(newValue) {
      if (newValue) {
        const { product_name, product_line, quantity, cost, quantity_sold, updated_at } = newValue

        this.formData = { product_name, product_line, quantity, cost, quantity_sold, updated_at }
      }
    }
  },
}
</script>