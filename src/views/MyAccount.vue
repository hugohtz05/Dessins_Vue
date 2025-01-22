<template>
    <div class="page-my-account">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Mon espace</h1>
            </div>
            <div class="column is-12">
                <button @click="logout()" class="button is-danger">Déconnexion</button>
            </div>

            <hr>

            <div class="column is-12">
                <h2 class="subtitle">Mes commandes</h2>

                <OrderSummary
                    v-for="order in orders"
                    v-bind:key="order.order_id"
                    v-bind:order="order" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import OrderSummary from '@/components/OrderSummary.vue';

export default {
    name: 'MyAccount',
    components: { 
        OrderSummary 
    },
    data() {
        return {
            orders: []
        }
    },
    mounted() {
        document.title = "Mon espace | Dessins d'ici et d'ailleurs";

        this.getMyOrders();
    },
    methods: {
        async logout() {
            await axios.post('/logout/')

            this.$router.push('/');
        },
        async getMyOrders() {
            this.$store.commit('setIsLoading', true);

            await axios
                .get('/orders/')
                .then(response => {
                    this.orders = response.data
                    console.log(response.data)
                })
            this.$store.commit('setIsLoading', false);
        }
    }
};
</script>