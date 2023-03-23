<template>
  <b-container class="header__container">
    <b-row class="mb-2">
      <b-col class="d-flex align-items-center"><span>{{ title }}</span></b-col>
      <b-col>
        <div class="logo">
          <img src="~/assets/images/SRIXON.png" alt="SRIXON">
        </div>
      </b-col>
      <b-col 
        class="d-flex justify-content-end align-items-center"
      >
        <slot />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  }
}
</script>