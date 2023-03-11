<template>
    <div class="d-flex flex-column align-items-center">
        <b-container class="header__container">
            <b-row>
                <b-col align-v="end"><span>Product List</span></b-col>
                <b-col>
                    <div class="logo">
                        <img src="../assets/images/SRIXON.png" alt="SRIXON">
                    </div>
                </b-col>
                <b-col>
                    <b-button squared size="sm" class="float-right" align-v="center">Add New Product</b-button>
                </b-col>
            </b-row>
        </b-container>
        <b-container>
            <b-row>
                <b-col md="auto" class="mb-3">
                    <b-form-input size="sm" v-model="text" placeholder="Search"></b-form-input>
                </b-col>
                <b-col></b-col>
            </b-row>
            <b-row>
                <b-table 
                    :items="items"
                    :fields="fields"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    sort-icon-left
                    class="main__table"
                >
                    <template #cell(actions)="row">
                        <span>
                            <b-button @click="updateItem(item)">Update</b-button>
                            <b-button @click="deleteItem(item)">Delete</b-button>
                        </span>
                    </template>
                </b-table>
            </b-row>
        </b-container>
    </div>
</template>

<style lang="scss">
    @import "../assets/scss/pages/_productLine.scss";
</style>

<script>
    export default{
        data(){
            return{
                fields: [
                    {key: 'id', label: 'Product ID', sortable: true},
                    {key: 'productName', sortable: true},
                    {key: 'category', sortable: true},
                    {key: 'quantity', sortable: true},
                    {key: 'price', sortable: true},
                    {key: 'soldItems', sortable: true},
                    {key: 'createdAt', sortable: true},
                    {key: 'updatedAt', sortable: true},
                    {key: 'actions', label: 'Actions'},
                ],
                items: [
                    {
                        id: 'abcdef', 
                        productName: 'MARVIN', 
                        category: 'POGI', 
                        quantity: 23456, 
                        price: 69000.00, 
                        soldItems: 20000, 
                        createdAt: 'YYYY-MM-DD', 
                        updatedAt: 'YYYY-MM-DD', 
                    },
                    {
                        id: 'ghijkl', 
                        productName: 'EUGENE', 
                        category: 'PANGET', 
                        quantity: 5000, 
                        price: 10.00, 
                        soldItems: 1, 
                        createdAt: 'YYYY-MM-DD', 
                        updatedAt: 'YYYY-MM-DD', 
                    }
                ],
            }
        },
        methods: {
            updateItem(item){console.log(item);},
            deleteItem(item){console.log(item);},
        },
    }
</script>