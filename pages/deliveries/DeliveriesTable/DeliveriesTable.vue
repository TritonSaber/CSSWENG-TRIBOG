<template>
  <div>
    <b-table
      responsive
      class="btable__container mb-0"
      :fields="fields"
      :items="deliveries"
      empty-text="There are no deliveries found!"
      sort-icon-left
      ref="paginatedTable"
    >

    </b-table>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    search: {
      type: String,
      default: '',
    }
  },

  data() {
    return {
      data: [],

      fields: [
        {
          label: 'Delivery ID',
          key: 'id',
          sortable: true,
          thClass: 'thead',
          tdClass: 'tbody',
        },
        {
          label: 'Delivery Date',
          key: 'created_at',
          sortable: true,
          thClass: 'thead',
          tdClass: 'tbody',
        },
        {
          label: 'Product ID',
          key: 'product_id',
          sortable: true,
          thClass: 'thead',
          tdClass: 'tbody',
        },
        {
          label: 'Product Name',
          key: 'product_name',
          sortable: true,
          thClass: 'thead',
          tdClass: 'tbody text-center',
        },
        {
          label: 'Expected Quantity',
          key: 'expected_quantity',
          sortable: true,
          thClass: 'thead',
          tdClass: 'tbody text-right',
        },
        {
          label: 'Status',
          key: 'status',
          sortable: true,
          thClass: 'thead',
          tdClass: 'tbody text-center',
        },
        {
          label: 'Current Quantity',
          key: 'current_quantity',
          sortable: true,
          thClass: 'thead',
          tdClass: 'tbody text-right',
        },
        {
          label: 'Actions',
          key: 'actions',
          thClass: 'thead',
          tdClass: 'tbody',
        },
      ],
    }
  },

  computed: {
    deliveries() {
      return []
    }
  }
}
</script>