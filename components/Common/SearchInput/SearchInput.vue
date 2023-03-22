<template>
  <div>
    <b-form-input
      :placeholder="placeholder"
      type="search"
      v-model="search"
      @input="handleChanged"
    ></b-form-input>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  data() {
    return {
      search: null,
    }
  },

  props: {
    placeholder: {
      type: String,
      default: 'Search',
    },

    debounce: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    handleChanged() {
      if (this.debounce) {
        this.debounceChanged()
      } else {
        this.$emit('changed', this.search)
      }
    },

    debounceChanged: _.debounce(function () {
      this.$emit('changed', this.search)
    }, 1000),
  },
}
</script>
