<template>
  <CommonContainer>
    <CommonHeadingDetails
      :title="title"
    >
      <b-button
        squared size="sm" 
        class="d-flex align-items-center additem__button"
        @click="showAddTransactionModal"
      >
        Add New Transaction <em class="fas fa-plus-square ml-2"></em>
      </b-button>
    </CommonHeadingDetails>

    <b-container class="body__container shadow">
      <b-row class="table-bg">
        <b-col md="auto" class="my-2">
          <CommonSearchInput
            placeholder="Search Transaction"
            v-on:changed="search = $event"
          />
        </b-col>
      </b-row>

      <TransactionsTable :search="searchParam" />
      
      <AddTransactionsModal />
    </b-container>
  </CommonContainer>
</template>

<script>
import TransactionsTable from './TransactionsTable'
import AddTransactionsModal from './AddTransactionsModal'

export default {
  components: { TransactionsTable, AddTransactionsModal },

  data() {
    return {
      title: 'Transaction History',

      search: '',
    }
  },

  methods: {
    showAddTransactionModal() {
      this.$bvModal.show('add-transaction-modal')
    },
  },

  computed: {
    searchParam() {
      return this.search
    },
  },
}
</script>
