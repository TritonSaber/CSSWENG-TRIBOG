<template>
  <div 
    class="
      bg-white 
      mb-2
      d-flex
      align-items-center
      justify-content-between
      "
    v-if="currentPageCount"
  >
    <strong class="bg-white">
      Showing {{ currentPageCount }} of {{ totalRows }}
    </strong>

    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      size="sm"
      class="my-0"
      @input="changePage"
    ></b-pagination>
  </div>
</template>

<script>
export default {
  props: {
    currentPageCount: {
      type: Number | null,
      required: true,
    },

    totalRows: {
      type: Number | null,
      required: true,
    },

    perPage: {
      type: Number | null,
      default: 1,
      required: true,
    },
  },

  data() {
    return {
      currentPage: 1,
    }
  },

  methods: {
    async changePage() {
      this.$emit('pageChange', this.currentPage)
    },
  },
}
</script>