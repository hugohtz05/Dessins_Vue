<template>
    <div class="page-checkout">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Finaliser ma commande</h1>
            </div>

            <div class="column is-12 box">
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Produit</th>
                            <th>Prix</th>
                            <th>Quantité</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="item in cart.items"
                        v-bind:key="item.product.id"
                        >
                            <td>{{ item.product.name }}</td>
                            <td>{{ item.product.price }}€</td>
                            <td>{{ item.quantity }}</td>
                            <td>{{ getItemTotal(item).toFixed(2) }}€</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="2">Total</td>
                            <td>{{ cartTotalLength }}</td>
                            <td>{{ cartTotalPrice.toFixed(2) }}€</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div class="column is-12 box">
                <h2 class="subtitle">Livraison</h2>

                <p class="has-text-grey mb-4">Champs obligatoires *</p>
                <div class="columns is-multiline">
                    <div class="column is-6">
                        <div class="field">
                            <label>Prénom*</label>
                            <div class="control">
                                <input type="text" class="input has-background-white has-text-dark" v-model="first_name">
                            </div>
                        </div>
                        <div class="field">
                            <label>Nom*</label>
                            <div class="control">
                                <input type="text" class="input has-background-white has-text-dark" v-model="last_name">
                            </div>
                        </div>
                        <div class="field">
                            <label>E-mail*</label>
                            <div class="control">
                                <input type="email" class="input has-background-white has-text-dark" v-model="email">
                            </div>
                        </div>
                        <div class="field">
                            <label>Numéro de téléphone*</label>
                            <div class="control">
                                <input type="text" class="input has-background-white has-text-dark" v-model="phone">
                            </div>
                        </div>
                    </div>
                    <div class="column is-6">
                        <div class="field">
                            <label>Addresse*</label>
                            <div class="control">
                                <input type="text" class="input has-background-white has-text-dark" v-model="address">
                            </div>
                        </div>

                        <div class="field">
                            <label>Code postal*</label>
                            <div class="control">
                                <input type="text" class="input has-background-white has-text-dark" v-model="zipcode">
                            </div>
                        </div>
                        <div class="field">
                            <label>Ville*</label>
                            <div class="control">
                                <input type="text" class="input has-background-white has-text-dark" v-model="place">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="notification is-danger mt-4" v-if="errors.length">
                    <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                </div>

                <hr>

                <div id="card-element" class="mb-5"></div>

                <template v-if="cartTotalLength">
                    <hr>

                    <button class="button is-white" @click="submitForm">Payer avec Stripe</button>
                    <router-link to='/success' v-if="submitForm"></router-link>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Checkout',
    data() {
        return {
            cart: {
                items: [],
            },
            stipe: {},
            card: {},
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address: '',
            zipcode: '',
            place: '',
            errors: []
        };
    },
    mounted() {
        document.title = "Commande | Dessins d'ici et d'ailleurs";

        this.cart = this.$store.state.cart;
    },
    methods: {
        getItemTotal(item) {
            return item.quantity * item.product.price;
        },
        submitForm() {
            this.errors = [];

            if (this.first_name === '') {
                this.errors.push("Vous n'avez pas renseigné votre prénom");
            }

            if (this.last_name === '') {
                this.errors.push("Vous n'avez pas renseigné votre nom");
            }

            if (!/\S+@\S+\.\S+/.test(this.email)) {
                this.errors.push("Vous n'avez pas renseigné un mail valide");
            }

            if ( isNaN(Number(this.phone)) || this.phone.length != 10 ) {
                this.errors.push("Vous n'avez pas renseigné numéro de téléphone valide");
            }

            if (this.address === '') {
                this.errors.push("Vous n'avez pas renseigné votre adresse");
            }

            if (this.zipcode === '') {
                this.errors.push("Vous n'avez pas renseigné votre code postal");
            }

            if (this.place === '') {
                this.errors.push("Vous n'avez pas renseigné votre ville");
            }

        }
    },
    computed: {
        cartTotalPrice() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.product.price * curVal.quantity
            }, 0);
        },
        cartTotalLength() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0);
        }
    }
};
</script>