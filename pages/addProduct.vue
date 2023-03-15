<template>
    <div>
        <b-container class="header__container">
            <b-row class="mb-2">
                <b-col class="d-flex align-items-center" cols=4><span>Add Product</span></b-col>
                <b-col cols="4">
                    <div class="logo">
                        <img src="../assets/images/SRIXON.png" alt="SRIXON">
                    </div>
                </b-col>
            </b-row>
        </b-container>
        <b-form>
            <b-container class="shadow">
                <b-row class="px-5 pt-5">
                    <b-col>
                        <b-form-group id="input-group-1" label="Product ID" label-for="input-1">  
                            <b-form-input id="input-1" required size="sm"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group id="input-group-2" label="Product Name" label-for="input-2">
                            <b-form-input id="input-2" required size="sm"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group id="input-group-3" label="Category" label-for="input-3">
                            <b-form-select id="input-3" v-model="selected" :options="options" size="sm"></b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group id="input-group-4" label="Quantity" label-for="input-4">
                            <b-form-input id="input-4" required size="sm"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row class="px-5 py-3">
                    <b-col cols="3">
                        <b-form-group id="input-group-5" label="Sold Items" label-for="input-5">
                            <b-form-input id="input-5" required size="sm"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="3">
                        <b-form-group id="input-group-6" label="Price" label-for="input-6">
                            <b-form-input id="input-6" required size="sm"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row class="px-5 pb-5">
                    <b-col md="auto"><b-button type="submit" class="submit__button" size="lg">Submit</b-button></b-col>
                    <b-col md="auto"><b-button type="cancel" class="cancel__button" size="lg">Cancel</b-button></b-col>
                </b-row>
            </b-container>
        </b-form>
    </div>
</template>


<script>
    export default{
        data(){
            return{
                selected: null,
                options: [
                    {value: null, text: ""},
                    {value: {A: 'Cap'}, text: "Cap"},
                    {value: {B: 'Golf Bag'}, text: "Golf Bag"},
                    {value: {C: 'Golf Balls'}, text: "Golf Balls"},
                    {value: {D: 'Golf Clubs'}, text: "Golf Clubs"},
                    {value: {E: 'Golf Shoes'}, text: "Golf Shoes"},
                    {value: {F: 'Polo Shirt'}, text: "Polo Shirt"},
                ]
            }
        }
    }
</script>