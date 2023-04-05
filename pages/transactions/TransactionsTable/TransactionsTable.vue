<template>
  <div>
    <b-table
      responsive
      class="btable__container mb-0"
      :fields="fields"
      :items="products"
      :show-empty="!loading"
      :busy="isBusy"
      empty-text="There are no transactions found!"
      sort-icon-left
      ref="paginatedTable"
    >
    <!-- add new tag in id -->
    <template #cell(id)="row">
      <div 
        class="d-flex align-items-center"
        :class="[
          row.item.isNew
            ? 'justify-content-between'
            : 'justify-content-end',
        ]"
      >
        <div v-if="row.item.isNew" class="tag new mr-2">NEW</div>
        {{ row.item.id }}
      </div>
    </template>

    <!-- format cost -->
    <template #cell(total_cost)="row">
      PHP {{ numberFormat(row.item.total_cost) }}
    </template>

    <!-- format date -->
    <template #cell(created_at)="row">
      {{ row.item.created_at | formatDate }}
    </template>
    <template #cell(updated_at)="row">
      {{ row.item.updated_at | formatDate }}
    </template>

    <!-- actions button -->
    <template #cell(actions)="row">
      <div class="d-flex align-items-center justify-content-center bg-white">
        <CommonActionButton
          icon="edit bg-white"
          v-on:click="$event => showEditTransactionsModal(row.item)"
        />
        <CommonActionButton
          icon="trash bg-white"
          childClass="danger ml-3"
          v-on:click="$event => showDeleteTransactionsModal(row.item)"
        />
      </div>
    </template>
  </b-table>

  <CommonPagination 
    :currentPageCount="currentPageCount"
    :totalRows="totalRows"
    :perPage="limitPerPage"
    @pageChange="fetchPage"
  />

  <EditTransactionsTable :transaction="selectedTransaction" />

  <CommonDeleteModal 
    type="Transaction"
    :isDeleting="isDeleting"
    v-on:click="deleteTransaction"
  />
  </div>
  
</template>

<script>
import EditTransactionsTable from '../EditTransactionsTable/EditTransactionsTable'
import _ from 'lodash'
import Helpers from '~/mixins/Helpers'

export default {
  components: { EditTransactionsTable },

  mixins: [Helpers],

  props: {
    search: {
      type: String,
      default: '',
    }
  },

  data() {
    return {
      data: [],

      isBusy: false,
      loading: true,
      hasError: false,
      hasMore: true,

      limitPerPage: 25,
      currentPageCount: 0,
      currentPage: 1,
      totalRows: 0,

      fields: [
        { 
          label: 'Transaction ID',
          key: 'id', 
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
          label: 'Quantity',
          key: 'quantity', 
          sortable: true,
          thClass: 'thead',
          tdClass: 'tbody text-right',
        },
        {
          label: 'Total Cost',
          key: 'total_cost', 
          sortable: true,
          thClass: 'thead',
          tdClass: 'tbody text-right',
        },
        {
          label: 'Created At',
          key: 'created_at', 
          sortable: true,
          thClass: 'thead',
          tdClass: 'tbody',
        },
        {
          label: 'Updated At',
          key: 'updated_at', 
          sortable: true,
          thClass: 'thead',
          tdClass: 'tbody',
        },
        {
          label: 'Actions',
          key: 'actions', 
          thClass: 'thead',
          tdClass: 'tbody',
        },
      ],

      selectedTransaction: null,
      isDeleting: false,
      isAdding: false,
      isEditing: false,
    }
  },

  methods: {
    async toggleBusy() {
      this.isBusy = !this.isBusy
    },

    async getTransactions() {
      this.toggleBusy()

      try {
        const response = await this.$axios.$get(`${process.env.baseUrl}/transactions-collection`, {
          params: {
            keyword: this.searchParams,
            page: this.currentPage,
          }
        })

        this.currentPageCount = response.meta.to
        this.totalRows = response.meta.total

        this.data = response.data
        this.loading = false
      } catch (e) {
        console.log(e)

        this.loading = false
        this.hasError = true
      } finally {
        this.toggleBusy()
        this.loading = false
      }
    },

    async fetchPage(page) {
      this.currentPage = page
      await this.getTransactions()
    },

    showEditTransactionsModal(transaction) {
      this.selectedTransaction= transaction

      this.$bvModal.show('edit-transaction-modal')
    },

    showDeleteTransactionsModal(transaction) {
      this.selectedTransaction = transaction

      this.$bvModal.show('delete-modal')
    },

    async deleteTransaction() {
      this.isDeleting = true

      try {
        await this.$axios.$delete(`${process.env.baseUrl}/transactions-delete/${this.selectedTransaction?.id}`)

        this.selectedTransaction = null
      } catch (e) {
        console.log(e)
      } finally {
        this.$bvModal.hide('delete-modal')
        this.isDeleting = false

        this.getTransactions()
      }
    }
  },

  computed: {
    products() {
      const transactions = this.data.map((transaction) => ({
        ...transaction,
        isNew: this.isNew(transaction.created_at),
      }))

      return _.sortBy(transactions, ['product_name'])
    },

    searchParams() {
      return this.search
    },
  },

  created() {
    this.$nuxt.$on('addedTransaction', (isAdding) => {
      this.isAdding = isAdding
    })

    this.$nuxt.$on('editedTransaction', (isEditing) => {
      this.isEditing = isEditing
    })
  },

  watch: {
    search() {
      this.getTransactions()
    },

    isAdding() {
      this.getTransactions()
      this.isAdding = false
    },

    isEditing() {
      this.getTransactions()
      this.isEditing = false
    }
  },

  mounted() {
    this.getTransactions()
  }
}
</script>

<style lang="scss" scoped>
.tag.new {
  color: white;
  background-color: green;
  padding: 4px 10px;
  font-size: 8px;
  border-radius: 5px;
  letter-spacing: 1px;
  font-weight: 500;
}

.product-description {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>