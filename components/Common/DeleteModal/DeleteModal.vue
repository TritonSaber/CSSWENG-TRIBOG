<template>
  <b-modal id="delete-modal" centered model-class="generic-modal">
    <div class="text-center">
      <div class="warning-icon d-flex align-items-center justify-content-center">
        <em class="fas fa-exclamation fa-3x" style="background: #fef0f0; color: #f47070"></em>
      </div>
      <h5>Confirm Action</h5>
      <div>Are you sure you want to delete this {{ type }}?</div>
    </div>

    <!-- delete modal buttons -->
    <template #modal-footer="{ cancel }">
      <b-button @click="$event => cancel()">Cancel</b-button>
      <b-button
        type="submit"
        class="btn-danger"
        @click="handleClick"
        :disabled="isDeleting"
      >
        Delete
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'resource',
    },

    isDeleting: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.warning-icon {
  border-radius: 50%;
  padding: 20px;
  background-color: #fef0f0;
  width: 100px;
  height: 100px;
  margin: 10px auto 20px;

  em {
    color: #f47070;
  }
}

h5 {
  font-weight: 600;
}
</style>