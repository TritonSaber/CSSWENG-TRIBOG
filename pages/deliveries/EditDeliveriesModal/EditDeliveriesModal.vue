<template>
  <b-modal
    id="edit-delivery-modal"
    centered
    title="Edit Delivery"
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
            <!-- status -->
            <CommonStatusSelect
              type="status"
              :defaultValue="currentStatus"
              v-on:statusChanges="$event => setStatus($event)"
            />
          </b-col>
        </b-row>
      </b-form-group>
      <b-form-group>
        <b-row>
          <b-col>
            <!-- expected quantity -->
            <label for="expected-quantity">Expected Quantity <span>*</span></label>
            <b-form-input 
              id="expected-quantity"
              type="number"
              min="0"
              placeholder="Enter Expected Quantity"
              required
              v-model="formData.expected_quantity"
              @keydown="preventDecimal"
              @blur="setExpQuantityToZero"
            ></b-form-input>
          </b-col>
          <b-col>
            <!-- current quantity -->
            <label for="current-quantity">Current Quantity <span>*</span></label>
            <b-form-input 
              id="current-quantity"
              type="number"
              min="0"
              placeholder="Enter Current Quantity"
              required
              v-model="formData.current_quantity"
              @keydown="preventDecimal"
              @blur="setCurrQuantityToZero"
            ></b-form-input>
          </b-col>
        </b-row>
      </b-form-group>
    </b-form>

    <template #modal-footer="{cancel}">
      <b-button @click="cancel()">Cancel</b-button>
      <b-button
        type="submit"
        class="btn-info"
        :disabled="submitting || !enableSubmit"
        @click="submit"
      >
        Update</b-button>
    </template>
  </b-modal>
</template>

<script>
import Helpers from '~/mixins/Helpers'

export default{
  mixins: [Helpers],

  props: {
    delivery: {
      type: Object | null,
      required: true,
    }
  },

  data() {
    return {
      submitting: false,

      formData: {
        product_id: 0,
        expected_quantity: 0,
        status: null,
        current_quantity: 0,
      }
    }
  },

  methods: {
    async submit() {
      this.submitting = true

      try {
        await this.$axios.$put(`${process.env.baseUrl}/deliveries-update/${this.delivery.id}`, this.requestParams)
      } catch (e) {
        console.log(e)
      } finally {
        this.submitting = false

        this.$bvModal.hide('edit-delivery-modal')

        this.$nuxt.$emit('editedDelivery', true)

        this.resetFormData()
      }
    },

    setExpQuantityToZero() {
      if (!this.formData.expected_quantity) {
        this.formData.expected_quantity = 0;
      }
    },

    setProduct(product) {
      this.formData.product_id = product.id;
    },

    setStatus(status) {
      this.formData.status = status
    },
        
    setCurrQuantityToZero(){
      if(!this.formData.current_quantity) {
        this.formData.current_quantity = 0;
      }
    },

    resetFormData() {
      this.formData = {
        product_id: 0,
        expected_quantity: 0,
        status: null,
        current_quantity: 0,
      }
    }
  },

  computed: {
    enableSubmit() {
      return (
        this.productIdParams &&
        this.expQuantityParams &&
        this.formData.status &&
        this.currQuantityParams
      )
    },

    productName() {
      if (this.delivery) {
        return this.delivery.product_name
      }
    },

    currentStatus() {
      return [this.delivery?.status]
    },

    productIdParams() {
      return(this.formData.product_id >= 0)
    },

    expQuantityParams() {
      return(this.formData.expected_quantity >= 0)
    },

    currQuantityParams() {
      return(this.formData.current_quantity >= 0)
    },

    requestParams() {
      return {
        product_id: Number(this.formData.product_id),
        expected_quantity: Number(this.formData.expected_quantity),
        status: this.formData.status,
        current_quantity: Number(this.formData.current_quantity),
      }
    },
  },

  watch: {
    delivery(newValue) {
      if (newValue) {
        const {product_id, expected_quantity, status, current_quantity} = newValue

        this.formData = {product_id, expected_quantity, status, current_quantity}
      }
    }
  },
}
</script>