<template>
    <div class="d-flex flex-column align-items-center">
        <b-container class="header__container">
            <b-row class="mb-2">
                <b-col class="d-flex align-items-center"><span>Delivery List</span></b-col>
                <b-col>
                    <div class="logo">
                        <img src="../assets/images/SRIXON.png" alt="SRIXON">
                    </div>
                </b-col>
                <b-col class="d-flex justify-content-end align-items-center">
                    <nuxt-link to="/addDelivery"><b-button squared size="sm" class="d-flex align-items-center additem__button">Add New Delivery<img class="ml-2" src="../assets/images/add.png" alt="add"></b-button></nuxt-link>
                </b-col>
            </b-row>
        </b-container>
        
        <b-container class="body__container shadow">
            <b-row class="table-bg">
                <b-col md="auto" class="m-2">
                    <b-form-input size="sm" v-model="text" placeholder="Search"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="table-bg">
                <b-table 
                    :items="items"
                    :fields="fields"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    sort-icon-left
                    class="btable__container"
                >
                    <template #cell(actions)="row">
                        <span class="d-flex flex-inline justify-content-center bg-white">
                            <nuxt-link to="/editDelivery"><b-button squared class="p-0 bg-white border-white" @click="Item(item)"><img class="bg-white" src="../assets/images/update.png" alt="update"></b-button></nuxt-link>
                            <b-button squared class="p-0 ml-2 bg-white border-white" @click="deleteItem(item)" v-b-modal="'delete-warn'"><img class="bg-white" src="../assets/images/delete.png" alt="delete"></b-button>
                        </span>
                    </template>
                </b-table>
            </b-row>
        </b-container>
        <b-modal id="delete-warn" title="Deleting a product">
            Are you sure that you want to delete this item?
        </b-modal>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                fields: [
                    {key: 'id', label: 'Delivery ID', sortable: true},
                    {key: 'deliveryDate', sortable: true},
                    {key: 'productID', sortable: true},
                    {key: 'productName', sortable: true},
                    {key: 'quantity', sortable: true},
                    {key: 'status', sortable: true},
                    {key: 'missingItems', sortable: true},
                    {key: 'actions', label: 'Actions'},
                ],
                items: [
                    {
                        id: 'abcdef', 
                        deliveryDate: '2023-01-01', 
                        productID: 12345, 
                        productName: 'BANANA', 
                        quantity: 5000, 
                        status: 'To Be Delivered',
                        missingItems: 0,
                    },
                    {
                        id: 'ghijkl', 
                        deliveryDate: '2023-02-02', 
                        productID: 67890, 
                        productName: 'APPLE', 
                        quantity: 2000, 
                        status: 'Delivered',
                        missingItems: 0,
                    },
                    {
                        id: 'lmnopq', 
                        deliveryDate: '2023-03-03', 
                        productID: 11121, 
                        productName: 'ORANGE', 
                        quantity: 1000, 
                        status: 'Incomplete',
                        missingItems: 0,
                    },
                ],
            }
        },
        methods: {
            updateItem(item){console.log(item);},
            deleteItem(item){console.log(item);},
        },
    }
</script>