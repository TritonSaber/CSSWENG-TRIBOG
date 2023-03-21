<template>
    <div>
        <b-container class="header__container">
            <b-row class="mb-2">
                <b-col class="d-flex align-items-center" cols=4><span>Add Transaction</span></b-col>
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
                        <b-form-group id="input-group-1" label="Transaction ID" label-for="input-1">  
                            <b-form-input id="input-1" required size="sm"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group id="input-group-2" label="Product ID" label-for="input-2">
                            <b-form-input id="input-2" required size="sm"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group id="input-group-3" label="Product Name" label-for="input-3">
                            <!-- <b-form-select id="input-3" v-model="selected" :options="options" size="sm"></b-form-select> -->
                            <b-form-input id="input-3" required size="sm"></b-form-input>
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
                        <b-form-group id="input-group-5" label="Price" label-for="input-5">
                            <b-form-input id="input-5" required size="sm"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="3">
                        <b-form-group id="input-group-6" label="Total Cost" label-for="input-6">
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
            
            }
        }
    }
</script>