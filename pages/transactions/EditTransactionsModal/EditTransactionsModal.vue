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
            <CommonProductSelect
              type="product"
              v-on:productChanges="$event => setProduct($event)"
            />
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
              id="price"
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
      this.formData.product_id = product.id;
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

    quantityParams() {
      return (this.formData.quantity >= 0)
    },

    totalCostParams() {
      return (this.formData.total_cost >= 0)
    },

    requestParams() {
      return {
        ...this.formData,
        quantity: Number(this.formData.quantity),
        total_cost: Number(this.formData.total_cost),
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