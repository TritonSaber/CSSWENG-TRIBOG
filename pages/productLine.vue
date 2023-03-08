<template>
    <div class="d-flex flex-column align-items-center">
        <b-container class="header__container">
            <b-row>
                <b-col><span>Product List</span></b-col>
                <b-col>
                    <div class="logo">
                        <img src="../assets/images/SRIXON.png" alt="SRIXON">
                    </div>
                </b-col>
                <b-col>
                    <b-button squared size="sm" class="float-right">Add New Product</b-button>
                </b-col>
            </b-row>
        </b-container>
        <b-container class="table__container">
            <b-row>
                Filter Button 
                <b-form-input v-model="text" placeholder="Search"></b-form-input>
            </b-row>
            <b-row>
                <b-table striped hover :items="items"></b-table>
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
                items: [
                    {productID: 'abcdef', productName: 'nameHere', category: 'categoryHere', quantity: 69, price: 69000.00, soldItems: 13, createdAt: 'YYYY-MM-DD', updatedAt: 'YYYY-MM-DD', action: 'stuff'}
                ]
            }
        },
    }
</script>