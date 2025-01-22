<template>
    <div class="page-cart">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Panier</h1>
            </div>
            <div class="column is-12 box">
                <table class="table is-fullwidth" v-if="cartTotalLength">
                    <thead>
                        <tr>
                            <th>Produit</th>
                            <th>Prix</th>
                            <th>Quantité</th>
                            <th>Sous-total</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <CartItem
                            v-for="item in cart.items"
                            v-bind:key="item.product_name"
                            v-bind:initialItem="item"
                            v-on:removeFromCart="removeFromCart" />
                    </tbody>
                </table>

                <p v-else>Vous n'avez rien ajouté au panier...</p>
            </div>
            <div class="column is-12 box">
                <h2 class="subtitle">Total</h2>
                <strong>{{ cartTotalPrice.toFixed(2) }}€</strong>

                <hr>

                <button @click="createOrder" class="button is-dark" :disabled="loading">{{ loading ? "En cours de traitement..." : "Commander"}}</button>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import CartItem from '@/components/CartItem.vue';

export default {
    name: 'Cart',
    components: {
        CartItem,
    },
    data() {
        return {
            cart: {
                items: []
            },
            loading: false,
        };
    },
    mounted() {
        this.cart = this.$store.state.cart;

        document.title = "Panier | Dessins d'ici et d'ailleurs"
    },
    methods: {
        removeFromCart(item) {
            this.cart.items = this.cart.items.filter(i => i.product.id !== item.product.id);
        },
        async createOrder() {
            if (!this.cart.items.length) {
                return;
            }

            this.loading = true;

            try {
                const orderData = {
                    items: this.cart.items.map(item => ({
                        product: item.product.id,
                        quantity: item.quantity
                    }))
                };
                await axios
                .post('/orders/', orderData)
                .then(response =>
                    localStorage.setItem('order_id', response.data.order_id)
                )

                this.$router.push('/checkout');
            } catch (error) {
                alert("Une erreur est survenue. Veuillez réessayer");
            } finally {
                this.loading = false;
            }
        }
    },
    computed: {
        cartTotalLength() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        },
        cartTotalPrice() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.product.price * curVal.quantity
            }, 0)
        },
    }
};
</script>