<template>
    <div>
        <b-table
            responsive
            class="btable__container mb-0"
            :fields="fields"
            :items="deliveries"
            :show-empty="!loading"
            :busy="isBusy"
            empty-text="There are no deliveries found!"
            sort-icon-left
            ref="paginatedTable"
        >
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

            <template #cell(created_at)="row">
                {{ row.item.created_at | formatDate }}
            </template>

            <template #cell(actions)="row">
                <div class="d-flex align-items-center justify-content-center bg-white">
                    <CommonActionButton
                        icon="edit bg-white"
                        v-on:click="$event => showEditDeliveriesModal(row.item)"
                    />
                    <CommonActionButton
                        icon="trash bg-white"
                        childClass="danger ml-3"
                        v-on:click="$event => showDeleteDeliveriesModal(row.item)"
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

        <EditDeliveriesModal :delivery="selectedDelivery"/>

        <CommonDeleteModal
            type="Delivery"
            :isDeleting="isDeleting"
            v-on:click="deleteDelivery"
        />
    </div>
</template>

<script>
import EditDeliveriesModal from '../EditDeliveriesModal'
import _ from 'lodash'
import Helpers from '~/mixins/Helpers'


export default {
    components: { EditDeliveriesModal },

    mixins: [Helpers],

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
                    label: "Delivery ID",
                    key: "id",
                    sortable: true,
                    thClass: "thead",
                    tdClass: "tbody",
                },
                {
                    label: "Delivery Date",
                    key: "created_at",
                    sortable: true,
                    thClass: "thead",
                    tdClass: "tbody",
                },
                {
                    label: "Product ID",
                    key: "product_id",
                    sortable: true,
                    thClass: "thead",
                    tdClass: "tbody",
                },
                {
                    label: "Product Name",
                    key: "product_name",
                    sortable: true,
                    thClass: "thead",
                    tdClass: "tbody text-center",
                },
                {
                    label: "Expected Quantity",
                    key: "expected_quantity",
                    sortable: true,
                    thClass: "thead",
                    tdClass: "tbody text-right",
                },
                {
                    label: "Status",
                    key: "status",
                    sortable: true,
                    thClass: "thead",
                    tdClass: "tbody text-center",
                },
                {
                    label: "Current Quantity",
                    key: "current_quantity",
                    sortable: true,
                    thClass: "thead",
                    tdClass: "tbody text-right",
                },
                {
                    label: "Actions",
                    key: "actions",
                    thClass: "thead",
                    tdClass: "tbody",
                },
            ],

            selectedDelivery: null,
            isDeleting: false,
            isAdding: false,
            isEditing: false,
        }
    },

    methods: {
        async toggleBusy() {
            this.isBusy = !this.isBusy;
        },

        async getDeliveries() {
            this.toggleBusy()

            try {
                const response = await this.$axios.$get(`${process.env.baseUrl}/deliveries-collection`, {
                    params: {
                        keyword: this.searchParams,
                        page: this.currentPage,
                    }
                });
                this.currentPageCount = response.meta.to
                this.totalRows = response.meta.total

                this.data = response.data
                this.loading = false
            }
            catch (e) {
                console.log(e);

                this.loading = false
                this.hasError = true
            }
            finally {
                this.toggleBusy()
                this.loading = false
            }
        },
        async fetchPage(page) {
            this.currentPage = page
            await this.getDeliveries()
        },

        showEditDeliveriesModal(delivery) {
            this.selectedDelivery = delivery

            this.$bvModal.show("edit-delivery-modal")
        },

        showDeleteDeliveriesModal(delivery) {
            this.selectedDelivery = delivery
            
            this.$bvModal.show("delete-modal")
        },

        async deleteDelivery() {
            this.isDeleting = true;

            try {
                await this.$axios.$delete(`${process.env.baseUrl}/deliveries-delete/${this.selectedDelivery?.id}`);

                this.selectedDelivery = null;
            }
            catch (e) {
                console.log(e);
            }
            finally {
                this.$bvModal.hide("delete-modal");
                this.isDeleting = false;

                this.getDeliveries();
            }
        }
    },
    computed: {
        deliveries() {
            const deliveries = this.data.map((delivery) => ({
                ...delivery,
                isNew: this.isNew(delivery.created_at),
            }));
            return _.sortBy(deliveries, ['delivery_date']);
        },
        searchParams() {
            return this.search;
        },
    },
    created() {
        this.$nuxt.$on("addedDelivery", (isAdding) => {
            this.isAdding = isAdding;
        })

        this.$nuxt.$on("editedDelivery", (isEditing) => {
            this.isEditing = isEditing;
        })
    },

    watch: {
        search() {
            this.getDeliveries();
        },

        isAdding() {
            this.getDeliveries();
            this.isAdding = false;
        },

        isEditing() {
            this.getDeliveries();
            this.isEditing = false;
        }
    },
    mounted() {
        this.getDeliveries();
    },
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
</style>