<template>
  <b-modal
    id="edit-transaction-modal"
    centered
    title="Edit Transaction"
    modal-class="generic-modal"
  >
    <b-form class="generic-form">
      <b-form-group>
        <b-row>
          <b-col>
            <label for="product-name">Product Name <span>*</span></label>
            <b-form-input
              id="product-name"
              type="text"
              disabled
              v-model="productName"
            ></b-form-input>
          </b-col>
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
        </b-row>
      </b-form-group>

      <b-form-group>
        <b-row>
          <b-col>
            <label for="total_cost">Total Cost <span>*</span></label>
            <b-form-input
              id="total_cost"
              type="text"
              placeholder="0.00"
              required
              disabled
              v-model="totalCostTextBox"
            ></b-form-input>
          </b-col>
        </b-row>
      </b-form-group>
    </b-form>

    <template #modal-footer="{ cancel }">
      <b-button @click="cancel()"> Cancel </b-button>
      <b-button
        type="submit"
        class="btn-info"
        @click="submit"
        :disabled="submitting || !enableSubmit"
        >Update</b-button
      >
    </template>
  </b-modal>
</template>

<script>
import Helpers from '~/mixins/Helpers'

export default {
  mixins: [Helpers],

  props: {
    transaction: {
      type: Object | null,
      required: true,
    }
  },

  data() {
    return {
      submitting: false,

      formData: {
        quantity: 0,
        total_cost: 0,
      },
    }
  },

  methods: {
    async submit() {
      this.submitting = true

      try {
        await this.$axios.$put(`${process.env.baseUrl}/transactions-update/${this.transaction.id}`, this.requestParams)
      } catch (e) {
        console.log(e)
      } finally {
        this.submitting = false

        this.$bvModal.hide('edit-transaction-modal')

        this.$nuxt.$emit('editedTransaction', true)

        this.resetFormData()
      }
    },

    setProduct(product) {
      this.formData.product_id = product;
    },

    setQuantityToZero() {
      if (!this.formData.quantity) {
        this.formData.quantity = 0;
      }
    },

    setTotalCostToZero() {
      if (!this.formData.total_cost) {
        this.formData.total_cost = this.numberFormat(0);
      }
    },

    resetFormData() {
      this.formData = {
        quantity: 0,
        total_cost: this.numberFormat(0),
      }
    }
  },

  computed: {
    enableSubmit() {
      return (
        this.quantityParams &&
        this.totalCostParams
      )
    },

    productName() {
      if (this.transaction) {
        return this.transaction.product_name
      }
    },

    quantityParams() {
      return (this.formData.quantity >= 0)
    },

    totalCostParams() {
      return (this.formData.total_cost >= 0
        && this.formData.total_cost !== null
      )
    },

    totalCost() {
      if (this.transaction?.product_id) {
        return (parseFloat(this.transaction.cost) * this.formData.quantity)
      }
      
      return 0
    },

    totalCostTextBox() {
      return this.numberFormat(this.totalCost)
    },

    requestParams() {
      return {
        ...this.formData,
        quantity: Number(this.formData.quantity),
        total_cost: this.totalCost,
        updated_at: new Date(),
      }
    },
  },

  watch: {
    transaction(newValue) {
      if (newValue) {
        const { product_id, quantity, total_cost} = newValue

        this.formData = { product_id, quantity, total_cost }
      }
    }
  }
}
</script>