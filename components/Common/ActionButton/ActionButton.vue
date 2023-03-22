<template>
  <div 
    class="action-button bg-white"
    :class="childClass"
    @click="clicked"
  >
    <em class="fas mr-1" :class="customIcon"></em>
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
    },

    icon: {
      type: String,
    },

    childClass: {
      type: String,
    }
  },

  methods: {
    clicked() {
      this.$emit('click')
    },  
  },

  computed: {
    customIcon() {
      return 'fa-' + this.icon
    },
  },
}
</script>

<style lang="scss" scoped>
.action-button {
  font-weight: 500;
  cursor: pointer;

  em {
    color: #043b66;
  }

  &.danger em {
    color: #f47070 !important;
  }
}
</style>