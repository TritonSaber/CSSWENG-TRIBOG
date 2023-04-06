<template>
  <b-modal
    id="add-transaction-modal"
    centered
    title="Add Transaction"
    modal-class="generic-modal"
  >
    <b-form class="generic-form">
      {{ requestParams }}
      <b-form-group>
        <b-row>
          <b-col>
            <CommonProductSelect
              type="product"
              refName="productSelect"
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
            <label for="total_cost">Total Cost <span>*</span></label>
            <b-form-input
              id="total_cost"
              type="number"
              step="0.01"
              min="0"
              placeholder="Enter Total Cost"
              required
              v-model="formData.total_cost"
              @blur="setTotalCostToZero"
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
        >Add</b-button
      >
    </template>
  </b-modal>
</template>

<script>
import Helpers from '~/mixins/Helpers'

export default {
  mixins: [Helpers],

  data() {
    return {
      submitting: false,

      formData: {
        product_id: null,
        quantity: 0,
        total_cost: this.numberFormat(0),
      },
    }
  },

  methods: {
    async submit() {
      this.submitting = true

      try {
        await this.$axios.$post(`${process.env.baseUrl}/transactions-create/`, this.requestParams)
      } catch (e) {
        console.log(e)
      } finally {
        this.submitting = false

        this.$bvModal.hide('add-transaction-modal')

        this.$nuxt.$emit('addedTransaction', true)

        this.resetFormData()
      }
    },

    setProduct(product) {
      this.formData.product_id = product?.id;
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
        product_id: null,
        quantity: 0,
        total_cost: this.numberFormat(0),
      }
    }
  },

  computed: {
    enableSubmit() {
      return (
        this.productIdParams &&
        this.quantityParams &&
        this.totalCostParams
      )
    },

    productIdParams() {
      return(this.formData.product_id >= 0 && this.formData.product_id !== null)
    },

    quantityParams() {
      return (this.formData.quantity >= 0)
    },

    totalCostParams() {
      return (this.formData.total_cost >= 0)
    },

    requestParams() {
      return {
        ...this.formData,
        product_id: Number(this.formData.product_id),
        quantity: Number(this.formData.quantity),
        total_cost: Number(this.numberFormat(this.formData.total_cost)),
      }
    },
  },

  created() {
    this.$nuxt.$on('productChanges-productSelect', (product_id) => {
      this.setProduct(product_id)
    })
  }
}
</script>