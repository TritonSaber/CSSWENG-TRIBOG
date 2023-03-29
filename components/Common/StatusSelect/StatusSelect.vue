<template>
    <div>
      <label for="status">{{ label }} <span>*</span></label>
  
      <multiselect
        v-model="selectedStatus"
        :options="statusOptions"
        :multiple="multiple"
        :close-on-select="!multiple"
        :clear-on-select="false"
        :preserve-search="true"
        :placeholder="placeholder"
        track-by="name"
        label="name"
        :searchable="true"
        :showLabels="false"
        :disabled="disabled"
        :loading="fetchingResource"
        ref="statusSelect"
      >
        <template slot="noOptions">
          <div v-if="fetchingResource">Loading {{ type }}</div>
          <div v-else>No {{ type }} found</div>
        </template>
      </multiselect>
    </div>
  </template>
  
  <script>
  import Multiselect from 'vue-multiselect'
  
  export default {
    components: {
      Multiselect,
    },
  
    props: {
      type: {
        type: String,
        default: 'type',
      },
  
      label: {
        type: String,
        default: 'Status',
      },
  
      placeholder: {
        type: String,
        default: 'Select Status',
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
        selectedStatus: null,
        
        statusOptions: [
          {
            id: 'tbd',
            name: 'To Be Delivered',
          },
          {
            id: 'delivered',
            name: 'Delivered',
          },
          {
            id: 'complete',
            name: 'Complete',
          },
          {
            id: 'incomplete',
            name: 'Incomplete',
          },
        ],
  
        fetchingResource: false,
      }
    },
  
    watch: {
      selectedStatus(newValue) {
        this.$emit('statusChanges', newValue)
      }
    }
  }
  </script>