<template>
    <div class="d-flex flex-column align-items-center">
        <b-container class="header__container">
            <b-row class="mb-2">
                <b-col class="d-flex align-items-center"><span>Product List</span></b-col>
                <b-col>
                    <div class="logo">
                        <img src="../assets/images/SRIXON.png" alt="SRIXON">
                    </div>
                </b-col>
                <b-col class="d-flex justify-content-end align-items-center">
                    <NuxtLink to="/addProduct"><b-button squared size="sm" class="d-flex align-items-center additem__button">Add New Product<img class="ml-2" src="../assets/images/add.png" alt="add"></b-button></NuxtLink>
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
                            <b-button squared class="p-0 bg-white border-white" @click="updateItem(item)"><img class="bg-white" src="../assets/images/update.png" alt="update"></b-button>
                            <b-button squared class="p-0 ml-2 bg-white border-white" @click="deleteItem(item)"><img class="bg-white" src="../assets/images/delete.png" alt="delete"></b-button>
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
                        createdAt: 'YYYY-MM-DD HH:MM:SS', 
                        updatedAt: 'YYYY-MM-DD HH:MM:SS', 
                    },
                    {
                        id: 'ghijkl', 
                        productName: 'EUGENE', 
                        category: 'PANGET', 
                        quantity: 5000, 
                        price: 10.00, 
                        soldItems: 1, 
                        createdAt: 'YYYY-MM-DD HH:MM:SS', 
                        updatedAt: 'YYYY-MM-DD HH:MM:SS', 
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