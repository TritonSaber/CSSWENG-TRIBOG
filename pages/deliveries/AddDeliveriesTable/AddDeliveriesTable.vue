<template>
  <b-modal
    id="add-delivery-modal"
    centered
    title="Add Delivery"
    modal-class="generic-modal"
  >
    <b-form class="generic-form">
      <b-form-group>
        <b-row>
          <b-col>
            <!-- delivery date -->
            <label for="delivery-date">Delivery Date <span>*</span></label>
            <b-form-datepicker 
              id="delivery-date" 
              v-model="formData.deliveryDate"
              required
            ></b-form-datepicker>
          </b-col>
          <b-col>
            <!-- product select -->
            <CommonProductSelect
              type="product"
              v-on:productChanges="$event => setProduct($event)"
            />
          </b-col>
        </b-row>
      </b-form-group>
      <b-form-group>
        <b-row>
          <b-col>
            <!-- expected quantity -->
            <label for="exp-quantity">Expected Quantity <span>*</span></label>
            <b-form-input 
              id="exp-quantity"
              type="number"
              min="0"
              placeholder="Enter Expected Quantity"
              required
              v-model="formData.expQuantity"
              @keydown="preventDecimal"
              @blur="setExpQuantityToZero"
            ></b-form-input>
          </b-col>
          <b-col>
            <!-- status -->
            <CommonStatusSelect
              type="status"
              v-on:statusChanges="$event => setStatus($event)"
            />
            
          </b-col>
          <b-col>
            <!-- current quantity -->
            <label for="exp-quantity">Current Quantity <span>*</span></label>
            <b-form-input 
              id="curr-quantity"
              type="number"
              min="0"
              placeholder="Enter Current Quantity"
              required
              v-model="formData.expQuantity"
              @keydown="preventDecimal"
              @blur="setCurrQuantityToZero"
            ></b-form-input>
          </b-col>
        </b-row>
      </b-form-group>
    </b-form>
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
        deliveryDate: '',
        expQuantity: 0,
        status: '',
        currQuantity: 0,
      }
    }
  },

  methods: {
    async submit(){
      this.submitting = true
      
      try{
        await this.$axios.$post(`${process.env.baseUrl}/deliveries-create/`, this.requestParams)
      } catch(e) {
        console.log(e)
      } finally {
        this.submitting = false

        this.$bvModal.hide('add-delivery-modal')

        this.$nuxt.$emit('addedDelivey', true)

        this.resetFormData()
      }
    },

    setExpQuantityToZero() {
      if(!this.formData.expQuantity) {
        this.formData.expQuantity = 0;
      }
    },

    setCategory(category) {
      this.formData.status = category ? category.name : '';
    },
    
    setCurrQuantityToZero(){
      if(!this.formData.currQuantity) {
        this.formData.currQuantity = 0;
      }
    },

    resetFormData() {
      this.formData = {
        expQuantity: 0,
      }
    }
  },
}
</script>