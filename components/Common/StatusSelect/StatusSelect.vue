<template>
  <div>
    <label for="status">{{ label }} <span>*</span></label>

    <multiselect
      id="status"
      v-model="selectedStatus"
      :options="statusOptions"
      :placeholder="placeholder"
      :searchable="false"
      :show-labels="false"
      ref="statusSelect"
    ></multiselect>
  </div>
</template>
  
<script>
import Multiselect from 'vue-multiselect'

export default {
  components: { Multiselect },

  props: {
    label: {
      type: String,
      default: 'Status',
    },

    placeholder: {
      type: String,
      default: 'Select Status',
    },

    defaultValue: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      selectedStatus: this.defaultValue[0],
      
      statusOptions: [
        'To Be Delivered',
        'Delivered',
        'Complete',
        'Incomplete',
      ],

      fetchingResource: false,
    }
  },

  watch: {
    selectedStatus(newValue) {
      this.$emit('statusChanges', newValue)
    }
  },

  mounted() {
    this.$emit('statusChanges', this.selectedStatus)
  }
}
</script>