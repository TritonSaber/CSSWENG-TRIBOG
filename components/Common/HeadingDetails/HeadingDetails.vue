<template>
  <b-container class="header__container">
    <b-row class="mb-2">
      <b-col class="d-flex align-items-center"><span>{{ title }}</span></b-col>
      <b-col>
        <div class="logo">
          <img src="~/assets/images/SRIXON.png" alt="SRIXON">
        </div>
      </b-col>
      <b-col class="d-flex justify-content-end align-items-center">
        <nuxt-link :to="route">
          <b-button squared size="sm" class="d-flex align-items-center additem__button">
            {{ details }}
            <img class="ml-2" src="~/assets/images/add.png" alt="add">
          </b-button>
        </nuxt-link>
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

    details: {
      type: String,
      default: '',
    },

    route: {
      type: String,
      default: '/',
    }
  }
}
</script>