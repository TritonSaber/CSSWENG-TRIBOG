<template>
  <div class="mb-4">
    <b-carousel
      v-model="slide"
      controls
      id="landing-carousel"
      class="shadow mb-3"
      :interval="4000"
      no-animation
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide img-src="../../../assets/images/item1.png">
        <div class="carousel-caption">
          {{ slideNumber + "/5" }}
        </div>
      </b-carousel-slide>
      <b-carousel-slide img-src="../../../assets/images/item2.png">
        <div class="carousel-caption">
          {{ slideNumber + "/5" }}
        </div>
      </b-carousel-slide>
      <b-carousel-slide img-src="../../../assets/images/item3.png">
        <div class="carousel-caption">
          {{ slideNumber + "/5" }}
        </div>
      </b-carousel-slide>
      <b-carousel-slide img-src="../../../assets/images/item4.png">
        <div class="carousel-caption">
          {{ slideNumber + "/5" }}
        </div>
      </b-carousel-slide>
      <b-carousel-slide img-src="../../../assets/images/item5.png">
        <div class="carousel-caption">
          {{ slideNumber + "/5" }}
        </div>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null,
    }
  },

  methods: {
    onSlideStart() {
      this.sliding = true
    },

    onSlideEnd() {
      this.sliding = false
    }
  },

  computed: {
    slideNumber() {
      return this.slide + 1
    }
  }
}
</script>

<style lang="scss">
.carousel-caption {
  text-align: right;
  position: absolute;
  background: none;
  color: black;
  font-weight: 800;
  font-size: 1.05rem;
  font-style: italic;
  bottom: 0;
  left: 0;
  right: 5px;
}
</style>