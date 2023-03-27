<template>
  <CommonContainer>
    <CommonHeadingDetails
      :title="title"
    >
      <b-button
        squared size="sm"
        class="d-flex align-items-center additem__button"
        @click="showAddDeliveryModal"
      >
        Add New Delivery <em class="fas fa-plus-square ml-2"></em>
      </b-button>
    </CommonHeadingDetails>

    <b-container class="body__continer shadow">
      <b-row class="table-bg">
        <b-col md="auto" class="my-2">
          <CommonSearchInput
            placeholder="Search Deliveries"
            v-on:changed=" search = $event"
          />
        </b-col>
      </b-row>

      <DeliveriesTable :search="searchParam" />

      <AddDeliveriesTable />
    </b-container>
  </CommonContainer>
</template>

<script>
import AddDeliveriesTable from './AddDeliveriesTable';
import DeliveriesTable from './DeliveriesTable';

export default {
  components: { DeliveriesTable, AddDeliveriesTable },

  data() {
    return {
      title: 'Delivery List',

      search: '',
    }
  },

  methods: {
    showAddDeliveryModal() {
      this.$bvModal.show('add-delivery-modal')
    }
  },

  computed: {
    searchParam() {
      return this.search
    },
  },
}
</script>