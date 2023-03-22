<template>
  <div>
    <label for="category">{{ label }} <span>*</span></label>

    <multiselect
      v-model="selectedCategory"
      :options="categoryOptions"
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
      ref="categorySelect"
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
      default: 'Product Category',
    },

    placeholder: {
      type: String,
      default: 'Select Product Category',
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
      selectedCategory: null,
      
      categoryOptions: [
        {
          id: 'cap',
          name: 'Cap',
        },
        {
          id: 'golf_ball',
          name: 'Golf Ball',
        },
        {
          id: 'golf_bag',
          name: 'Golf Bag',
        },
      ],

      fetchingResource: false,
    }
  },

  watch: {
    selectedCategory(newValue) {
      this.$emit('categoryChanges', newValue)
    }
  }
}
</script>